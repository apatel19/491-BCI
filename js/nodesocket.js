/** Class used to manage connection with node server.
 * @class
 */

var NodeSocket = function() {
  this.socket = io();
  this.alpha = 0;
  this.beta = 0;
  this.delta = 0;

  this.getAlpha = function() {
    return this.alpha;
  };

  this.getBeta = function() {
    return this.beta;
  };
 
  this.getDelta = function() {
    return this.delta;
  };

  this.setDelta = function(val) {
    this.delta = val;
  }

  this.setBeta = function(val) {
    this.beta = val;
  };

  this.setAlpha = function(val) {
    this.alpha = val;
  };

  this.socket.on("channel1", function(packet) {
    socket.setBeta(packet.msg[5]);
    socket.setAlpha(packet.msg[4]);
    socket.setDelta(packet.msg[3]);
    //console.log("PACKage: " + packet.msg);
    //socket.setDelta(package.msg[]);
  });
};
