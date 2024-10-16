let pointA;
let pointB;
let uVector;
let vVector;

function setup() {
  createCanvas(400, 400);
  pointA = createVector(random(0, width), random(0, height));
  pointB = createVector(random(0, width), random(0, height));
  distanceVector = createVector(0, 0);
  uVector = createVector(0, 0);
  vVector = createVector(0, 0);
}

function draw() {
  background(220);
  // Draw A and B Points and line connecting them
  strokeWeight(3);
  fill(0);
  stroke(0);
  circle(pointA.x, pointA.y, 10);
  strokeWeight(1);
  textFont("Courier");
  textSize(20);
  text("A", pointA.x - 10, pointA.y - 10);
  circle(pointB.x, pointB.y, 10);
  strokeWeight(1);
  textFont("Courier");
  textSize(20);
  text("B", pointB.x - 10, pointB.y - 10);
  strokeWeight(3);
  line(pointA.x, pointA.y, pointB.x, pointB.y);

  uVector.x = pointB.x - pointA.x;
  uVector.y = pointB.y - pointA.y;
  vVector.x = mouseX - pointA.x;
  vVector.y = mouseY - pointA.y;
  /*    Projection Formula    */
  /* ((v dot u) / |u|**2) * u */

  let u_dot_v = vVector.dot(uVector);
  let u_mag_sq = uVector.copy().mag() ** 2;
  let resultVector = uVector.copy().mult(u_dot_v).div(u_mag_sq);
  let linePoint = pointA.copy().add(resultVector);

  // Bound line point between point B and point A
  if (resultVector.mag() > uVector.mag()) {
    linePoint.x = pointB.x;
    linePoint.y = pointB.y;
  }
  if (abs(resultVector.angleBetween(uVector)) > 0.00001) {
    linePoint.x = pointA.x;
    linePoint.y = pointA.y;
  }

  circle(linePoint.x, linePoint.y, 10);

  distanceVector.x = mouseX - linePoint.x;
  distanceVector.y = mouseY - linePoint.y;
  strokeWeight(3);
  line(mouseX, mouseY, linePoint.x, linePoint.y);

  // Draw Mouse Point
  strokeWeight(3);
  fill(0, 255, 0);
  stroke(0);
  circle(mouseX, mouseY, 10);
  strokeWeight(1);
  stroke(0);
  fill(0);
  textFont("Courier");
  textSize(20);
  text("PT", mouseX - 10, mouseY - 10);

  /*
  push()
  translate(width/2, height/2)
  line(0,0,distanceVector.x, distanceVector.y)
  pop()
  */

  stroke(0);
  fill(0);
  strokeWeight(1);
  textFont("Courier");
  textSize(20);
  text(
    "Distance from PT to Line: " +
      str(
        distanceVector.mag().toFixed(1)),
        10,
        20
  );
}

function keyPressed() {
  pointA = createVector(random(0, width), random(0, height));
  pointB = createVector(random(0, width), random(0, height));
}
