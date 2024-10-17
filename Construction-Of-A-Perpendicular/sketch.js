let centerPoint;
let unitVector;
let unitVectorPerp;

function setup() {
  createCanvas(400, 400);
  centerPoint = createVector(width / 2, height / 2);
  unitVector = createVector(0, 0);
  unitVectorPerp = createVector(0, 0);
}

function draw() {
  background(220);
  unitVector.x = mouseX - centerPoint.x;
  unitVector.y = mouseY - centerPoint.y;
  unitVector.normalize();
  unitVector.mult(50);
  unitVectorPerp.x = unitVector.y * -1;
  unitVectorPerp.y = unitVector.x;
  stroke(0);
  line(centerPoint.x, centerPoint.y, mouseX, mouseY);
  stroke(255, 0, 0);
  line(mouseX, mouseY, mouseX + unitVectorPerp.x, mouseY + unitVectorPerp.y);
}
