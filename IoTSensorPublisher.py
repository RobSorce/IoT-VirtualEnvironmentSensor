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
    conn_str2 = os.getenv("IOTHUB_DEVICE_CONNECTION_STRING2")

    # Create instance of the device client using the connection string
    device_client1 = IoTHubDeviceClient.create_from_connection_string(conn_str)
    device_client2 = IoTHubDeviceClient.create_from_connection_string(conn_str2)

    # Connect the device clients.
    device_client1.connect()
    device_client2.connect()
    
    while(True):
        envData1 = {'temperature': random.randrange(-50, 50),
                'humidity': random.randrange(0, 100),
                'windIntensity':random.randrange(0, 100),
                'windDirection':random.randrange(0, 360),
                'rainHeight':random.randrange(0, 50)
                }
        envData2 = {'temperature': random.randrange(-50, 50),
                'humidity': random.randrange(0, 100),
                'windIntensity':random.randrange(0, 100),
                'windDirection':random.randrange(0, 360),
                'rainHeight':random.randrange(0, 50)
                }
        print((json.dumps(envData1)))
        print((json.dumps(envData2)))
        # Send a single message
        print("Sending message...")
        device_client1.send_message(json.dumps(envData1))
        print("Message from device 1 successfully sent!")
        time.sleep(2)
        device_client2.send_message(json.dumps(envData2))
        print("Message from device 2 successfully sent!")
        time.sleep(2)
    # finally, disconnect
    device_client1.disconnect()
    device_client2.disconnect()