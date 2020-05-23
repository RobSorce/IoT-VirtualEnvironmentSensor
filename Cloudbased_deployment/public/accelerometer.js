/*************************************************
 * Accelerometer function: cloud deployment
 * Handle sensor data coming from the
 * smartphones (or any other device equipped with
 * accelerometer)
 ************************************************/
 //create the socket to communicate with the server
var socket = io();

$(document).ready(() => {
  if ("Accelerometer" in window){
    const xax = document.getElementById("xaxis");
    const yax = document.getElementById("yaxis");
    const zax = document.getElementById("zaxis");

    //create a new sensor instance with frequency=1Hz
    let sensor = new Accelerometer({frequency: 1});

    //start the sensor
    sensor.start();

    sensor.onreading = () => {
      //round the values of factor 3
      factor = 10**3;
      var x = Math.round(sensor.x*factor)/factor;
      var y = Math.round(sensor.y*factor)/factor;
      var z = Math.round(sensor.z*factor)/factor;

      //visualize sensor values in the file
      xax.textContent = x.toString();
      yax.textContent = y.toString();
      zax.textContent = z.toString();

      // create the message and send it to server.js using the socket
      // every 10 seconds (time expressed in ms)
      setInterval(function(){
        var message = {
          xaxis: x,
          yaxis: y,
          zaxis: z
        };

        socket.emit("lastaccelerometer", message);
      }, 10000);

      //create the message and send it to server.js using the socket
      // every 30 seconds (time expressed in ms)
      setInterval(function(){
        var message = {
          xaxis: x,
          yaxis: y,
          zaxis: z
        };

        socket.emit("accelerometer", message);
      }, 30000);
    }

  }else{
    // otherwise, if unable to get sensor data, notifies the error
    document.getElementById("errorMessage").textContent = "Browser not supported or unable to retrieve accelerometer";
  }
});
