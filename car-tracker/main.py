
import time
import json
import websocket
import os
from dotenv import load_dotenv
from datetime import datetime
import uuid

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
    # Simulated coordinates (e.g., San Francisco coordinates)
    return 37.7749, -122.4194

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
        latitude, longitude = get_coordinates()
        message =json.dumps( {
            'id': uuid.uuid4().int,
            'latitude': latitude,
            'longitude': longitude,
            'createdAt': datetime.utcnow().isoformat()  # Use UTC time in ISO format
        })
        ws.send(message)
        print('Coordinates sent:', message)
        time.sleep(5)  # Adjust the frequency as needed

    ws.close()

if __name__ == '__main__':
    send_coordinates()

