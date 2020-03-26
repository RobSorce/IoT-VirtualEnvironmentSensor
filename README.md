# IoT-VirtualEnvironmentSensor 

## Send telemetry messages over ***MQTT*** using ***Microsoft Azure IoTHub***:

This repository contains an implementation in Python of the message exchange over the MQTT protocol between a _virtual_ IoT device and a MQTT Broker.

The aim of this project is to create a stand-alone program that represents a virtual environmental station that generates periodically a set of random values for 5 different sensors: 

- temperature (-50 ... 50 °Celsius)
- humidity (0 ... 100%)
- wind direction (0 ... 360°)
- wind intensity (0 ... 100 m/s)
- rain height (0 ... 50 mm/h) 

For the purpose of the project it has been used the Microsoft Azure IoT Hub platform to virtualize an IoT device and to store the messages into a database.

The Azure platform is also used as MQTT Broker, from which the data gathered from the devices are then read by a web application and shown into their specific charts. 

#Requirements for this project

- A Microsoft Azure account
- An Azure IoT Hub
- Virtual devices inside the IoT Hub
- An Azure CosmosDB database



