
import time
import json
import websocket
import os
from dotenv import load_dotenv
from datetime import datetime
import uuid
import requests

'''
from gps3 import gps3
def get_gps_coordinates():
    gps_socket = gps3.GPSDSocket()
    data_stream = gps3.DataStream()

    while True:
        try:
            gps_socket.connect(host='127.0.0.1', port=2947)
            gps_socket.watch()
            for new_data in gps_socket:
                if new_data:
                    data_stream.unpack(new_data)
                    latitude = data_stream.TPV['lat']
                    longitude = data_stream.TPV['lon']
                    if latitude != 'n/a' and longitude != 'n/a':
                        return latitude, longitude
                time.sleep(1)
        except Exception as e:
            print(f'Failed to connect to GPSD: {e}')
            time.sleep(5)  # Wait before retrying
'''


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

def send_coordinates():
    # Load environment variables from .env file
    load_dotenv()

    # Get the WebSocket URL from the environment variable
    ws_url = os.getenv('WEBSOCKET_URL')

    if ws_url is None:
        raise ValueError("The WEBSOCKET_URL environment variable is not set")
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
        message =json.dumps( {
            'id': uuid.uuid4().int,
            'latitude': latitude,
            'longitude': longitude,
            'city': city,
            'state': state,
            'createdAt': datetime.utcnow().isoformat()  # Use UTC time in ISO format
        })
        ws.send(message)
        print('Coordinates sent:', message)
        time.sleep(5)  # Adjust the frequency as needed

    ws.close()

if __name__ == '__main__':
    send_coordinates()

