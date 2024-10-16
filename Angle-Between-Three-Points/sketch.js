let pointA;
let pointB;
let vectorA;
let vectorB;

function setup() {
  createCanvas(400, 400);
  pointA = createVector(random(0, width), random(0, height));
  pointB = createVector(random(0, width), random(0, height));
  vectorA = createVector(0, 0);
  vectorB = createVector(0, 0);
}

function draw() {
  background(220);

  strokeWeight(3);
  line(mouseX, mouseY, pointA.x, pointA.y);
  line(mouseX, mouseY, pointB.x, pointB.y);

  fill(0, 255, 0);
  stroke(0);
  strokeWeight(3);
  circle(pointA.x, pointA.y, 10);
  fill(0);
  strokeWeight(1);
  textFont("Courier");
  textSize(20);
  text("A", pointA.x - 10, pointA.y - 10);

  fill(255, 0, 0);
  stroke(0);
  strokeWeight(3);
  circle(pointB.x, pointB.y, 10);
  fill(0);
  strokeWeight(1);
  textFont("Courier");
  textSize(20);
  text("B", pointB.x - 10, pointB.y - 10);

  vectorA.x = mouseX - pointA.x;
  vectorA.y = mouseY - pointA.y;

  vectorB.x = mouseX - pointB.x;
  vectorB.y = mouseY - pointB.y;

  let dotProduct = p5.Vector.dot(vectorA, vectorB);
  let crossProduct = p5.Vector.cross(vectorA, vectorB);
  crossProduct.normalize().mag();
  let magnitudeA = p5.Vector.mag(vectorA);
  let magnitudeB = p5.Vector.mag(vectorB);
  let angle = acos(dotProduct / (magnitudeA * magnitudeB));
  text(
    "Angle: " +
      str(((angle * 180) / PI).toFixed(1)) +
      "°" +
      " Curvature: " +
      str(Math.sign(crossProduct.z)),
    10,
    20
  );
}
