/*
 Based on formula found here:
 http://werner.yellowcouch.org/Papers/fastenv12/
 Werner Van Belle1 - werner@yellowcouch.org, werner.van.belle@gmail.com
*/

let pointColor;
let node0;
let controlPointPos;
let node1;
let envelope;

let deltaX; // X distance between node1 and node0
let deltaY; // Y distance between node1 and node0
let deltaYM; // Y distance between control point and node0

function setup() {
  createCanvas(400, 400);
  pointColor = color(255, 204, 0);
  node0 = createVector(50, 300);
  node1 = createVector(300, 50);
  let controlX = (node1.x - node0.x) / 2 + node0.x;
  let controlY = (node1.y - node0.y) / 2 + node0.y;
  controlPointPos = createVector(controlX, controlY);
  envelope = new FastExponentialEnvelope();
  deltaX = node1.x - node0.x;
  deltaY = node1.y - node0.y;
  deltaYM = controlPointPos.y - node0.y;
  envelope.setCoordinates(deltaX, deltaYM, deltaY);

  //noLoop()
}

function draw() {
  background(0);
  textSize(12);
  fill(pointColor);
  stroke(pointColor);
  strokeWeight(1);
  circle(node0.x, height - node0.y, 5);
  text("(" + node0.x + "," + node0.y + ")", node0.x + 10, height - node0.y);
  circle(node1.x, height - node1.y, 5);
  text(
    "(" + node1.x + "," + node1.y + ")",
    node1.x - 50,
    height - node1.y + 20
  );
  circle(controlPointPos.x, height - controlPointPos.y, 5);
  text(
    "(" + controlPointPos.x + "," + controlPointPos.y + ")",
    controlPointPos.x + 10,
    height - controlPointPos.y
  );
  //console.log(envelope.multiplier + " / " + envelope.delta)
  
  let yold = 0;
  let xold = 0;

  for (let x = 0; x < deltaX; x = x + 1) {
    y = yold * envelope.multiplier + envelope.delta;
    line(node0.x + xold, height - yold - node0.y, node0.x + x, height - y - node0.y);
    yold = y;
    xold = x;

  }
}

function mouseDragged() {
  controlPointPos.x = mouseX;
  controlPointPos.y = height - mouseY;

  let controlX = (node1.x - node0.x) / 2 + node0.x;
  let controlY = (node1.y - node0.y) / 2 + node0.y;

  if (controlPointPos.x < controlX) {
    controlPointPos.x = controlX;
  }

  if (controlPointPos.x > controlX) {
    controlPointPos.x = controlX;
  }
  
  if (controlPointPos.y < Math.min(node0.y, node1.y)) {
    controlPointPos.y = Math.min(node0.y, node1.y);
  }

  if (controlPointPos.y > Math.max(node0.y, node1.y)) {
    controlPointPos.y = Math.max(node0.y, node1.y);
  }
  
  deltaX = node1.x - node0.x;
  deltaY = node1.y - node0.y;
  deltaYM = controlPointPos.y - node0.y;
  
  envelope.setCoordinates(deltaX, deltaYM, deltaY);
}

function keyPressed() {
  if (keyCode == ESCAPE) {
    let controlX = (node1.x - node0.x) / 2 + node0.x;
    let controlY = (node1.y - node0.y) / 2 + node0.y;
    controlPointPos.x = controlX;
    controlPointPos.y = controlY;
    deltaX = node1.x - node0.x;
    deltaY = node1.y - node0.y;
    deltaYM = controlPointPos.y - node0.y;
    envelope.setCoordinates(deltaX, deltaYM, deltaY);
  }
}
