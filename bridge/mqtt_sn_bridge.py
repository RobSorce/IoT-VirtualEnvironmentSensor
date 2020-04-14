import os
import json
import paho.mqtt.client as mqtt
from azure.iot.device import Message, IoTHubDeviceClient, MethodResponse

# Open the connection to the MQTT-SN broker to subscribe to the topics
# listed in the function: the client select which one to subscribe
def on_connect(client, user_data, flags, res_code):
    print("Gateway connected with result code: " + str(res_code))
    # Names of the topic to be subscribed by the client to gather messages:
    mqttsn_broker_client.subscribe("env/all")
    mqttsn_broker_client.subscribe("env/temperature")
    mqttsn_broker_client.subscribe("env/humidity")
    mqttsn_broker_client.subscribe("env/windDirection")
    mqttsn_broker_client.subscribe("env/windIntensity")
    mqttsn_broker_client.subscribe("env/rainHeight")

# Advertise when the MQTT-SN broker disconnects
def on_disconnect():
    print("Gateway disconnected")

# Extract the telemetries from the messages received and encapsulate them
# into a json file, then sends it to the MQTT broker (Microsoft Azure - IoT Hub)
def on_message(client, user_Data, message):
    payload = message.payload
    temperature = int(str(payload[0])) - 50
    humidity = int(str(payload[1]))
    wind_direction = int(str(payload[2]))
    wind_intensity = int(str(payload[3]))
    rain_height = int(str(payload[4]))

    env_data = {'temperature': temperature,
                'humidity': humidity,
                'windDirection': wind_direction,
                'windIntensity': wind_intensity,
                'rainHeight': rain_height
                }
    print((json.dumps(env_data)))
    print("Sending telemetry message to the IoT Hub...")
    device_client.send_message(json.dumps(env_data))
    print("Message successfully sent!")


if __name__ == "__main__":
    broker_port = 1886
    mqttsn_broker_address = "fec0:affe::1"

    # Fetch the connection string from your OS environment variable
    connection_string = os.getenv('IOTHUB_DEVICE_CONNECTION_STRING3')

    # Create instance of the device client using the connection string
    device_client = IoTHubDeviceClient.create_from_connection_string(connection_string, websockets=True)

    # initialize the gateway and connect to the hub
    print("Connecting to the Hub...")
    device_client.connect()
    print("Success! Connected to the Hub.")

    # create an instance to connect to the mqtt-sn broker
    mqttsn_broker_client = mqtt.Client("MQTT-SN Gateway", mqtt.MQTTv311)

    # initialize the gateway and connect to the mqtt-sn broker
    mqttsn_broker_client.on_connect = on_connect
    mqttsn_broker_client.on_disconnect = on_disconnect
    mqttsn_broker_client.on_message = on_message
    mqttsn_broker_client.connect(mqttsn_broker_address, broker_port)

    mqttsn_broker_client.loop_forever()

    # Finally, disconnect
    device_client.disconnect()
