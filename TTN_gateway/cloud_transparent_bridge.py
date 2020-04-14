import json
import base64
import configparser
import paho.mqtt.client as mqtt
from azure.iot.device import Message, IoTHubDeviceClient


def on_connect(client, userdata, flags, rc):
    print("Connected to TTN")
    client.subscribe('+/devices/+/up')


def on_message(client, userdata, message):
    payload = json.loads(message.payload.decode('utf-8'))
    dev_eui = payload['hardware_serial']
    env_data = base64.b64decode(payload['payload_raw'])
    dev_id = str(payload['dev_id'])

    env_data = {'temperature': int(env_data[0]) - 50,
                'humidity': env_data[1],
                'windDirection': env_data[2],
                'windIntensity': env_data[3],
                'rainHeight': env_data[4]
                }

    data = json.dumps(env_data)
    # print(data)
    print(dev_id + " Sending telemetry message to the IoT Hub... " + data)
    if dev_id == config['HUB']['Device1']:
        hub_client1.send_message(data)
    elif dev_id == config['HUB']['Device2']:
        hub_client2.send_message(data)
    print("Message successfully sent!")


if __name__ == "__main__":
    # load the configuration file
    config = configparser.ConfigParser()
    config.read('config.ini')

    # connect to the hub
    hub_client1 = IoTHubDeviceClient.create_from_connection_string(config['HUB']['ConnectionString1'], websockets=True)
    hub_client1.connect()
    hub_client2 = IoTHubDeviceClient.create_from_connection_string(config['HUB']['ConnectionString2'], websockets=True)
    hub_client2.connect()

    # connect to TheThingsNetwork
    ttn_client = mqtt.Client()
    ttn_client.on_connect = on_connect
    ttn_client.on_message = on_message
    ttn_client.username_pw_set(config['TTN']['AppID'], config['TTN']['AccessKey'])
    ttn_client.connect(config['TTN']['Server'], int(config['TTN']['Port']), 60)

    try:
        ttn_client.loop_forever()
    except KeyboardInterrupt:
        print('disconnect')
        ttn_client.disconnect()
        hub_client1.disconnect()
        hub_client2.disconnect()
