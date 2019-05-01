var express = require('express');
var app = express();
var server = require('http').createServer(app);
var sock = null;
var osc = require('node-osc');


// Creates Server 
var Server = function(browserPort) {
  this.io = require('socket.io')(server); //Creates my http server
  app.use(express.static(__dirname));
  server.listen(browserPort, function () {   
      console.log('Server listening at port %d', browserPort);
  }); 
}

Server.prototype.handleConnection = function(socket){
  sock = socket;
  console.log(sock);
}

Server.prototype.init = function(){
  console.log("Server initialized!")
  this.io.on('connection', this.handleConnection)
}

Server.prototype.sendClientMsg = function(id, msg) {
  if(sock) {
    console.log("sending msg")
    sock.emit(id, {msg:msg});
  }
} 


// Handles OSC Data
var oscServer = new osc.Server(12345, '127.0.0.1');

// FFT -> [ChannelD, 1hz - 125hz]
oscServer.on("/openbci", function (data, rinfo) {
     console.log(data)
	 switch (data[1]) {
        case 1:
          server.sendClientMsg("channel1", data)
          //console.log("Channel 1: ", data[11]);
          break; /*
        case 2:
          console.log("Channel 2: " + data[11]);
          break;
        case 3:
          console.log("Channel 3: " + data[11]);
          break;
        case 4:
            console.log("Channel 4: " + data[11]);
            break;*/
        default:
      }
});


server = new Server("8080");
server.init();



// var oneAlpha = 0.01;
// var twoAlpha = 0.04;
// var threeAlpha = 0.08;

// var fourAlpha = 0.12;
// var fiveAlpha = 0.16;
// var sixAlpha = 0.20;

// var sevenAlpha = 0.24;
// var eightAlpha = 0.28;
// var nineAlpha = 0.32;

// var height = 10;

// function square() {
//   if (oneAlpha >= 1) { oneAlpha = 0.01;}
//   var one = document.getElementById("1");
//   height += 0.01;
//   //console.log(height);
//   //var str = height.toString + 'px';
//   //document.getElementById('svg').setAttribute("height", str);
//   oneAlpha += 0.02;
//   one.style.fill = getRgbaString(oneAlpha);

//   if (twoAlpha >= 1) { twoAlpha = 0.04;}
//   var two = document.getElementById("2");
//   twoAlpha += 0.04;
//   two.style.fill = getRgbaString(twoAlpha);

//   if (threeAlpha >= 1) { threeAlpha = 0.08;}
//   var three = document.getElementById("3");
//   threeAlpha += 0.08;
//   three.style.fill = getRgbaString(threeAlpha);

//   if (fourAlpha >= 1) { fourAlpha = 0.12;}
//   var four = document.getElementById("4");
//   fourAlpha += 0.12;
//   four.style.fill = getRgbaString(fourAlpha);

//   if (fiveAlpha >= 1) { fiveAlpha = 0.16;}
//   var five = document.getElementById("5");
//   fiveAlpha += 0.16;
//   five.style.fill = getRgbaString(fiveAlpha);

//   if (sixAlpha >= 1) { sixAlpha = 0.20;}
//   var six = document.getElementById("6");
//   sixAlpha += 0.24;
//   six.style.fill = getRgbaString(sixAlpha);

//   if (sevenAlpha >= 1) { sevenAlpha = 0.24;}
//   var seven = document.getElementById("7");
//   sevenAlpha += 0.24;
//   seven.style.fill = getRgbaString(sevenAlpha);

//   if (eightAlpha >= 1) { eightAlpha = 0.28;}
//   var eight = document.getElementById("8");
//   eightAlpha += 0.28;
//   eight.style.fill = getRgbaString(eightAlpha);

//   if (nineAlpha >= 1) { nineAlpha = 0.32;}
//   var nine = document.getElementById("9");
//   nineAlpha += 0.32;
//   nine.style.fill = getRgbaString(nineAlpha);


//   requestAnimationFrame(square)
// }