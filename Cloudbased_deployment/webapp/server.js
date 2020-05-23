/*****************************************************
 * Human activity recognition
 *
 * web application
 *
 * This module gathers values from the
 * Microsoft Azure cloud backend and visualize the
 * sensor data acquired from the devices connected
 * to the app
 *****************************************************/

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./scripts/event-hub-reader.js');

/******************************************************
 * Microsoft Azure IoT Hub connection
 *
 * Modify the iotHubConnectionString variable:
 *
 * Copy and paste your personal IoT Hub
 * connection string from Azure portal,
 * in order to start the connection.
 *
 * IoT Hub connection string can be found in IoT Hub->
 * shared access policy->iothubowner->
 * Primary Connection String
 *
 * The event hub consumer group can be found under->
 * built-in endpoints->consumer groups
 ******************************************************/

const iotHubConnectionString = ""; // replace with you IoThub connection string
const eventHubConsumerGroup = ""; // replace with your consumer group, or use default

// Redirect requests to the public subdirectory to the root
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res /* , next */) => {
  res.redirect('/');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);


//the new message is composed of the previous message, date and deviceId that sent it
(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      };

      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error('Error broadcasting: [%s] from [%s].', err, message);
    }
  });
})().catch();
