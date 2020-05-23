/*****************************************************
 * Human activity recognition
 *
 * Server side of the web application
 *
 * Accelerometer handler:
 *
 * This module gathers values from the smartphone
 * accelerometer and stream the acquired data towards
 * the Microsoft Azure cloud backend;
 *****************************************************/

 //Express loads the file in public folder
const express = require('express');

//Socket to communicate with accelerometer.js
const socket = require('socket.io');
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

/******************************************************
 * Microsoft Azure IoT device connection
 *
 * Modify the connectionString variable:
 *
 * Copy and paste your personal IoT device
 * connection string from Azure portal,
 * in order to start the connection.
 *
 * IoT device connection string can be found in IoT Hub->
 * IoTDevices->your_device_name->Primary Connection String
 ******************************************************/

// Note: Device connection string required != IoTHub connection string
var connectionString = ""; //Modify this string, replace with your device_connection_string
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**************************************
 * Connecting to the port specified:
 *
 * If unable to retrieve the port,
 * default ephemeral port is 3000
 **************************************/

const app = express();
const port =process.env.PORT || '3000';

//index.html and accelerometer.js are in public folder
app.use(express.static('public'));

var server = app.listen(port, () => {
console.log('Server is running on http://localhost:${port}');
});

var io = socket(server);

/*************************************
 * Accelerometer function:
 *
 * Acquiring accelerometer data from
 * the smartphone and forwarding the
 * data received to the IoT Hub
 *************************************/

io.on('connection', function(socket){
    console.log('Socket connection... Success!');
    // values to add to the chart every 30 seconds
    socket.on('accelerometer', function(message){
        var JSONMessage = new Message(JSON.stringify({
            xaxis: message.xaxis,
            yaxis: message.yaxis,
            zaxis: message.zaxis
        }));
        console.log('Acquiring Accelerometer data: ' + message.getData());

        // Forward the messages from the accelerometer to Azure IoT Hub
        // Handle errors
        client.sendEvent(JSONMessage, function (err) {
            if (err) {
                console.error('Forward error while sending the message to the Hub: ' + err.toString());
            } else {
                console.log('Messages successfully forwarded to Azure IoT Hub: ');
            }
        });
    });

    // Forward the messages from the accelerometer to Azure IoT Hub
    // values to add in the spans every 5 seconds
    socket.on('lastaccelerometer', function(message){
        var JSONMessage = new Message(JSON.stringify({
            lastxaxis: message.xaxis,
            lastyaxis: message.yaxis,
            lastzaxis: message.zaxis
        }));
         // Handle errors
        client.sendEvent(JSONMessage, function (err) {
            if (err) {
                console.error('Forward error while sending the message to the Hub: ' + err.toString());
            } else {
                console.log('Messages successfully forwarded to Azure IoT Hub: ');
            }
        });
    });
});
