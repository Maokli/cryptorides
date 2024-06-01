from flask import Flask, request, jsonify
import os
import json
import time
import uuid
from datetime import datetime
from dotenv import load_dotenv
import requests
import firebase_admin
from firebase_admin import credentials, db 
from threading import Thread

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin SDK
cred = credentials.Certificate(os.getenv('FIREBASE_CREDENTIALS_JSON'))
firebase_admin.initialize_app(cred, {
    'databaseURL': os.getenv('FIREBASE_DATABASE_URL')
})

@app.route('/')
def home():
    return jsonify({'app': 'welcome to tracking app'})

@app.route('/start_tracking', methods=['GET', 'POST'])
def start_tracking():
    data = request.json
    car_id = data['car_id']

    # Start a new thread to handle sending coordinates to Firebase
    thread = Thread(target=send_coordinates, args=(car_id,))
    thread.start()

    return jsonify({'status': 'tracking started for car_id ' + car_id}), 200

def get_coordinates():
    try:
        response = requests.get('https://ipinfo.io')
        response.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
        data = response.json()
        loc = data['loc'].split(',')
        lat, long = float(loc[0]), float(loc[1])
        city = data.get('city', 'Unknown')
        state = data.get('region', 'Unknown')
        return lat, long, city, state
    except requests.exceptions.RequestException as e:
        # Print the error and return False
        print(f"Error: {e}")
        return False

def send_coordinates(car_id):
    while True:
        coordinates = get_coordinates()
        if coordinates:
            latitude, longitude, city, state = coordinates
            message = {
                'id': uuid.uuid4().int,
                'latitude': latitude,
                'longitude': longitude,
                'city': city,
                'state': state,
                'createdAt': datetime.utcnow().isoformat()
            }
            db.reference(f'cars/{car_id}/locations').push(message)
            print('Coordinates sent:', message)
        time.sleep(30)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
