let circle1;
let circle2;
let xoff1 = 0.01;
let yoff1 = 0.4;
let xoff2 = 0.9;
let yoff2 = 4.5;
const diameter = 50;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255);
  stroke(0);
  strokeWeight(2);
  xoff1 = xoff1 + 0.01;
  yoff1 = yoff1 + 0.01;
  xoff2 = xoff2 + 0.01;
  yoff2 = yoff2 + 0.01;
  let x1 = noise(xoff1) * width;
  let y1 = noise(yoff1) * height;
  let x2 = noise(xoff2) * width;
  let y2 = noise(yoff2) * height;
  let circleDistance = dist(x1, y1, x2, y2);
  if (circleDistance >= diameter) {
    fill(255);
  } else {
    fill(255, 198, 200);
  }
  circle(x1, y1, diameter);
  circle(x2, y2, diameter);
}
