# IoT-VirtualEnvironmentSensor
IoT - Individual Assignments - M.Sc. in Engineering in Computer Science "La Sapienza University of Rome"

# Assignment 4
## Crowd sensing web app | Human Activity Recognition

## Requirements

- A [Microsoft Azure](https://azure.microsoft.com/en-us/) account
- An Azure IoT Hub
- Virtual devices inside the IoT Hub
- An Android device with an embedded accelerometer (a smartphone will be fine)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Generic Sensor API](https://www.w3.org/TR/generic-sensor/)
- [NodeJS](https://nodejs.org/it/download/) 12 LTS

## Instructions

Follow these instructions to create and set up an IoT system capable of recognizing the activity of the user that will use it, implementing a challenging and appealing Human Activity Recognition application, for more detailed instructions, read the [hands-on tutorial](https://www.linkedin.com/pulse/human-activity-recognition-roberto-sorce) on linkedin. For further reading, I also suggest to read the papers about Human Activity Recognition that you can find at the bottom of this page.

First, download this repository on your local git, or download the zip and store it on your computer.

## Create a web app resource in your Azure account
The first thing to do is to create a web app from the Azure portal. Select "new resource" from the main page and then follow the procedure.
Choose an univocal name for the web app and a runtime stack, we are using NodeJS 12 LTS. Select a free tier subscription, an operating system and the most near region to deploy your app on a cloud server, finally click on "Review and create".

## Set up the new resource
1. Set up properly the resource: go to settings in the panel at the left of the screen and look for the TLS/SSL setting, then        switch the HTTPS only button to ensure that the connection to the web app is always made through HTTPS protocol.

2. Use web sockets: in settings, go to "Configuration" tab, under "General settings" and enable web sockets selecting the "on" button

3. Repeat the same procedure to create another web application for the second deployment.

## Deploy the apps
Run Visual Studio Code from you computer. If you need the terminal to do anything, just type:

```
code .
```

If you're a normal person and you're not afraid of breaking a finger on the trackpad or the mouse, just open it from the app folder.

Move into the folders that you downloaded in the previous steps from my GitHub repository and modify the code:

1. Modify the device connection string of the server.js module under both project folders, you can find detailed intstructions in the comments of the code modules

2. Update the IoTHub connection strings inside the server.js module of the local web application and the resource group of your Azure IoTHub

3. Open the project folders in the VS Code workspace and connect to your Azure account using the [Azure extension](https://code.visualstudio.com/docs/azure/extensions) of VS Code

4. select the folder of the web app you want to upload, simply browsing your filesystem; select the right folder and choose the web app resource in which you desire to upload the code

5. Repeat this procedure to deploy both applications in the right web app resources: the cloud based deployment app and the edge based deployment app


### Useful links:


Video tutorial: https://youtu.be/WFLsK3007Ts

LinkedIn: www.linkedin.com/in/roberto-sorce-52491512a

Hands-on Tutorial #1: https://www.linkedin.com/pulse/simulating-iot-device-exchanging-messages-over-mqtt-protocol-sorce

Hands-on Tutorial #2: https://www.linkedin.com/pulse/building-iot-system-riot-microsoft-azure-roberto-sorce

Hands-on Tutorial #3: https://www.linkedin.com/pulse/build-open-source-iot-system-lorawan-ttn-riot-roberto-sorce

Hands-on Tutorial #4: https://www.linkedin.com/pulse/human-activity-recognition-roberto-sorce

Generic Sensor API: https://www.w3.org/TR/generic-sensor/

Scientific articles proposed for this project (papers):

Human Activity Recognition via an Accelerometer-Enabled-Smartphone Using Kernel Discriminant Analysis:https://www.researchgate.net/publication/224144663_Human_Activity_Recognition_via_an_Accelerometer-Enabled-Smartphone_Using_Kernel_Discriminant_Analysis

A Public Domain Dataset for Human Activity Recognition Using Smartphones: https://www.elen.ucl.ac.be/Proceedings/esann/esannpdf/es2013-84.pdf


