# IoT-VirtualEnvironmentSensor
# Assignment 3

## Send telemetry messages over ***MQTT*** using ***RIOT***, ***TheThingsNetwork (TTN)*** and ***Microsoft Azure IoTHub***:

This repository contains an implementation in Python of the message exchange over the MQTT protocol between a _virtual_ IoT device implemented with RIOT-OS and a MQTT Broker.

The aim of this project is to create a stand-alone program in RIOT that represents a virtual environmental station that generates periodically a set of random values for 5 different sensors:

- temperature (-50 ... 50 °Celsius)
- humidity (0 ... 100%)
- wind direction (0 ... 360°)
- wind intensity (0 ... 100 m/s)
- rain height (0 ... 50 mm/h)

For the purpose of the project it has been used the Microsoft Azure IoT Hub platform to virtualize an IoT device and to store the messages into a database.

The Azure platform is also used as MQTT Broker, from which the data gathered from the devices are then read by a web application and shown into their specific charts.

# Requirements

- A [Microsoft Azure](https://azure.microsoft.com/en-us/) account
- An Azure IoT Hub
- Virtual devices inside the IoT Hub
- [TheThingsNetwork](https://www.thethingsnetwork.org/) Account
- [IotLab Account](https://www.iot-lab.info/)
- [NodeJS](https://nodejs.org/it/download/) 12 LTS
- [Python](https://www.python.org/downloads/) 3.6+
- [RIOT-OS GitHub](https://github.com/RIOT-OS/RIOT)
- Ubuntu 18.04 LTS (not necessarily)
- [Mosquitto MQTT broker](https://www.vultr.com/docs/how-to-install-mosquitto-mqtt-broker-server-on-ubuntu-16-04)


## Instructions

Run the web app from the terminal:

```
npm install
npm start
```
Open your favorite browser (your favorite browser should be Firefox btw...), log to ``` http://localhost:3000 ``` to view the messages coming from the virtual environment station.

Enjoy it!

Useful links and detailed guides:

- Video Tutorial:  https://youtu.be/jrL_tACy1sI 

- LinkedIn: www.linkedin.com/in/roberto-sorce-52491512a

- TheThingsNetwork: https://www.thethingsnetwork.org/

- LoRaWAN tutorial on IotLab: https://www.iot-lab.info/tutorials/riot-ttn/

- RIOT-OS webpage: https://riot-os.org/

- RIOT-OS GitHub: https://github.com/RIOT-OS/RIOT

- ST B-L072Z-LRWAN1 specs: https://www.st.com/en/evaluation-tools/b-l072z-lrwan1.html

- Hands-on Tutorial #1: https://www.linkedin.com/pulse/simulating-iot-device-exchanging-messages-over-mqtt-protocol-sorce

- Hands-on Tutorial #2: https://www.linkedin.com/pulse/building-iot-system-riot-microsoft-azure-roberto-sorce

- Hands-on Tutorial #3: https://www.linkedin.com/pulse/build-open-source-iot-system-lorawan-ttn-riot-roberto-sorce
