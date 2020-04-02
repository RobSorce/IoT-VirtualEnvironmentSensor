import time
import random
import json
import os
from azure.iot.device import IoTHubDeviceClient, MethodResponse

"""
# This code generates random values for 5 different environmental sensors,
# grouped into a virtual device on the Azure IoT Hub:
# The data will be published on a MQTT channel (by default using Python),
# then the values can be read by the web app in order to plot the values on the charts.
"""


if __name__ == "__main__":
    # Fetch the connection string from an environment variable
    conn_str = os.getenv('IOTHUB_DEVICE_CONNECTION_STRING')
    conn_str2 = os.getenv('IOTHUB_DEVICE_CONNECTION_STRING2')

    # Create instance of the device client using the connection string
    device_client1 = IoTHubDeviceClient.create_from_connection_string(conn_str, websockets=True)
    device_client2 = IoTHubDeviceClient.create_from_connection_string(conn_str2, websockets=True)

    # Connect the device clients.
    device_client1.connect()
    device_client2.connect()

    # Generate the random data for the devices (between the given range)
    while True:
        env_data1 = dict(temperature=random.randrange(-50, 50), humidity=random.randrange(0, 100),
                        windDirection=random.randrange(0, 360), windIntensity=random.randrange(0, 100),
                        rainHeight=random.randrange(0, 50))
        env_data2 = dict(temperature=random.randrange(-50, 50), humidity=random.randrange(0, 100),
                        windDirection=random.randrange(0, 360), windIntensity=random.randrange(0, 100),
                        rainHeight=random.randrange(0, 50))
        print((json.dumps(env_data1)))
        print((json.dumps(env_data2)))
        # Send a single message
        print("Sending message...")
        device_client1.send_message(json.dumps(envData1))
        print("Message from device 1 successfully sent!")
        time.sleep(2)
        device_client2.send_message(json.dumps(envData2))
        print("Message from device 2 successfully sent!")
        #time.sleep(2)
    # finally, disconnect
    device_client1.disconnect()
    device_client2.disconnect()
