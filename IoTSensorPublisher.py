import threading
import time
import random
import datetime
import json
import os
from azure.iot.device import IoTHubDeviceClient, MethodResponse

if __name__ == "__main__":
    # Fetch the connection string from an enviornment variable
    conn_str = os.getenv("IOTHUB_DEVICE_CONNECTION_STRING")

    # Create instance of the device client using the connection string
    device_client = IoTHubDeviceClient.create_from_connection_string(conn_str)

    # Connect the device client.
    device_client.connect()
    
    while(True):
        envData = {'temperature': random.randrange(-50, 50),
                'humidity': random.randrange(0, 100),
                'windIntensity':random.randrange(0, 100),
                'windDirection':random.randrange(0, 360),
                'rainHeight':random.randrange(0, 50)
                }
        print((json.dumps(envData)))
        # Send a single message
        print("Sending message...")
        device_client.send_message(json.dumps(envData))
        print("Message successfully sent!")
        time.sleep(2)
    # finally, disconnect
    device_client.disconnect()
