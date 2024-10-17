let pointA;
let pointB;

function setup() {
  createCanvas(400, 400);
  pointA = createVector(random(0, width), random(0, height));
  pointB = createVector(random(0, width), random(0, height));
  noLoop();
}

function draw() {
  background(220);
  fill(0);
  stroke(0);
  strokeWeight(3);
  circle(pointA.x, pointA.y, 5);
  circle(pointB.x, pointB.y, 5);
  line(pointA.x, pointA.y, pointB.x, pointB.y);
  let midX = (max(pointA.x, pointB.x) - min(pointA.x, pointB.x)) / 2;
  let midY = (max(pointA.y, pointB.y) - min(pointA.y, pointB.y)) / 2;
  let oneThirdX = (max(pointA.x, pointB.x) - min(pointA.x, pointB.x)) / 3;
  let oneThirdY = (max(pointA.y, pointB.y) - min(pointA.y, pointB.y)) / 3;

  if (pointA.x <= pointB.x && pointA.y <= pointB.y) {
    fill(255, 0, 0);
    circle(pointA.x + midX, pointA.y + midY, 10);
    fill(0, 255, 0);
    circle(pointA.x + oneThirdX, pointA.y + oneThirdY, 10);
    console.log("one");
  }
  if (pointA.x <= pointB.x && pointA.y > pointB.y) {
    fill(255, 0, 0);
    circle(pointA.x + midX, pointB.y + midY, 10);
    fill(0, 255, 0);
    circle(pointA.x + oneThirdX, pointA.y - oneThirdY, 10);
    console.log("two");
  }
  if (pointA.x > pointB.x && pointA.y <= pointB.y) {
    fill(255, 0, 0);
    circle(pointB.x + midX, pointA.y + midY, 10);
    fill(0, 255, 0);
    circle(pointB.x + oneThirdX, pointB.y - oneThirdY, 10);
    console.log("three");
  }
  if (pointA.x > pointB.x && pointA.y > pointB.y) {
    fill(255, 0, 0);
    circle(pointB.x + midX, pointB.y + midY, 10);
    fill(0, 255, 0);
    circle(pointB.x + oneThirdX, pointB.y + oneThirdY, 10);
    console.log("four");
  }
}
