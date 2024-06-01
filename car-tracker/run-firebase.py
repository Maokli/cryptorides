from flask import Flask, request, jsonify
import os
import json
import time
import uuid
from datetime import datetime, timezone
from dotenv import load_dotenv
import requests
import firebase_admin
from firebase_admin import credentials, firestore
from threading import Thread

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin SDK
cred_path = os.getenv('FIREBASE_CREDENTIALS_JSON')
if not cred_path:
    raise ValueError("FIREBASE_CREDENTIALS_JSON environment variable is not set or invalid")

# Ensure the file exists and has the correct structure
if not os.path.isfile(cred_path):
    raise ValueError("The specified Firebase credentials file does not exist")

try:
    cred = credentials.Certificate(cred_path)
except ValueError as e:
    raise ValueError(f"Invalid service account certificate: {e}")

firebase_admin.initialize_app(cred)

# Initialize Firestore DB
db = firestore.client()

@app.route('/')
def home():
    return jsonify({'app': 'welcome to tracking app'})

@app.route('/start_tracking', methods=['GET', 'POST'])
def start_tracking():
    data = request.json
    car_id = data['car_id']

    # Start a new thread to handle sending coordinates to Firestore
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
                'id': str(uuid.uuid4()),
                'latitude': latitude,
                'longitude': longitude,
                'city': city,
                'state': state,
                'createdAt': datetime.now(timezone.utc).isoformat()
            }
            db.collection('cars').document(car_id).collection('locations').add(message)
            print('Coordinates sent:', message)
        time.sleep(30)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
