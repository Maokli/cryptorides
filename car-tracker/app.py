from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import os
import json
import time
import uuid
from datetime import datetime
from dotenv import load_dotenv
import websocket
import requests

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
@app.route('/')
def home():
    return jsonify({'app':'welcome to tracking app'})

@app.route('/start_tracking', methods=['GET','POST'])
def start_tracking():
    data = request.json
    car_id = data['car_id']

    # Load environment variables from .env file
    load_dotenv()

    # Get the WebSocket URL from the environment variable
    ws_url = os.getenv('WEBSOCKET_URL')
    
    # Start a new thread to handle WebSocket connection and sending coordinates
    socketio.start_background_task(target=send_coordinates, car_id=car_id, ws_url=ws_url)

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

def send_coordinates(car_id, ws_url):
    ws = websocket.WebSocket()
    try:
        print(f"Connecting to {ws_url}")
        ws.connect(ws_url)
        print("Connected successfully")
    except Exception as e:
        print(f"Failed to connect: {e}")
        return

    while True:
        latitude, longitude, city, state = get_coordinates()
        message = json.dumps({
            'id': uuid.uuid4().int,
            'latitude': latitude,
            'longitude': longitude,
            'city': city,
            'state': state,
            'createdAt': datetime.utcnow().isoformat() 
        })
        ws.send(message)
        print('Coordinates sent:', message)
        time.sleep(5)

    ws.close()

if __name__ == '__main__':
    load_dotenv()
    socketio.run(app, debug=True, port=5000)
