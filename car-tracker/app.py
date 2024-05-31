from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import os
import json
import time
import uuid
from datetime import datetime
from dotenv import load_dotenv
import websocket


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
    # Simulated coordinates (e.g., San Francisco coordinates)
    return 37.7749, -122.4194

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
        latitude, longitude = get_coordinates()
        message = json.dumps({
            'car_id': car_id,
            'latitude': latitude,
            'longitude': longitude,
            'timestamp': datetime.utcnow().isoformat()
        })
        ws.send(message)
        print('Coordinates sent:', message)
        time.sleep(5)

    ws.close()

if __name__ == '__main__':
    load_dotenv()
    socketio.run(app, debug=True, port=5000)
