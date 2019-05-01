
var camera, scene, renderer;
var mesh;
// Link to OSC data
socket = new NodeSocket();
//square();
// plotBeta();
gameZone();
dropEnemy();
processData();

//Alpha Move Right(left square)
//Beta OK (right square)

function sleep (ms) {
  return new Promise (resolve => setTimeout(resolve, ms));
}

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}


async function processData () {
  var beta_array = [];
  var alpha_array = [];
  console.log("About!");
  await sleep(20000);
  console.log("Awake");
  for (var i = 0; i < 5000; i++){
   // plotBeta();
   await sleep(5);
   beta_array.push (socket.getBeta());
   alpha_array.push (socket.getAlpha());
  }

  var std_beta = standardDeviation(beta_array);
  var std_alpha = standardDeviation(alpha_array);
  console.log(std_beta);
  console.log(std_alpha);

  if (std_beta > std_alpha) {
    clickOk();
  } else {
    moveRight();
  }
  console.log(beta_array);
  console.log(alpha_array);
}

function clickOk() {
  var mainPlayer = document.getElementById("sq1");
  var enemy1 = document.getElementById("enmy1");
  var enemy2 = document.getElementById("enmy2");
  var enemy1x = enemy1.getAttribute("x");
  var enemy2x = enemy2.getAttribute("x");
  var mainPlayerx = mainPlayer.getAttribute("x");
  if ((mainPlayerx !== enemy1x) && (mainPlayerx !== enemy2x)) {
    for (var i = 0; i < 20; i++){
      dropEnemy();
    }
  }
  else {
    console.log("Wrong tile.")
    alert('GAME OVER');
  } 
}

function moveRight() {
  if (x < 300){
    x += 150;
    var sq1 = document.getElementById("sq1");
    sq1.setAttribute("x", x);
    processData();
  }
  else {
    console.log("Cannot move right.")
    alert('GAME OVER');
  }
}

var x = 0;
function gameZone () {
  document.addEventListener("keydown", function (event) {
    var code = event.keyCode;
    switch(code){
            case 37: // left
                x -= 150;
                var sq1 = document.getElementById("sq1");
                sq1.setAttribute("x", x);
                break;
            case 39: // right
                x += 150;
                var sq1 = document.getElementById("sq1");
                sq1.setAttribute("x", x);
                break;
            default:
                console.log("Undefined key!1");
        }
    });

}

var xPos1 = [0,150,300,0,150,300,0,150,300,0,150,300];
var xPos2 = [150,300,0,150,0,0,150,300,0,150,300,150];

var yPos = 0;


function dropEnemy () {
  var enemy1 = document.getElementById("enmy1");
  var enemy2 = document.getElementById("enmy2");
  //yPos += 10;
  //enemy1.setAttribute("y", yPos);
  //enemy2.setAttribute("y", yPos);
  if (yPos >= 400) {
    yPos = 0;
    enemy1.setAttribute("y", yPos);
    enemy2.setAttribute("y", yPos); 

    var random = Math.floor((Math.random() * (xPos1.length-1)) + 0);
    enemy1.setAttribute("x", xPos1[random]);
    enemy2.setAttribute("x", xPos2[random]);
    
  }
  //requestAnimationFrame(dropEnemy);
}

