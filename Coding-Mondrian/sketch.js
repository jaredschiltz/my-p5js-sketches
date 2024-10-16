// Composition No. III, with Red, Blue, Yellow and Black (1929)
let red;
let yellow;
let blue;

const redHeight = 0.4;
const yellowHeight = 0.55;

function setup() {
  createCanvas(400, 400);
  red = color(231, 6, 4);
  yellow = color(253, 212, 4);
  blue = color(12, 43, 97);
  noLoop();
}

function draw() {
  background(255);
  fill(red);
  noStroke();
  rect(0, 0, width * 0.45, height * redHeight);

  fill(yellow);
  noStroke();
  rect(0, height * yellowHeight, 0.1 * width, height);

  fill(blue);
  noStroke();
  rect(width * 0.45, height * yellowHeight, 0.3 * width, 0.4 * height);

  stroke(0);
  strokeWeight(7);
  line(0, height * redHeight, width, height * redHeight);
  line(0, height * yellowHeight, width, height * yellowHeight);

  strokeWeight(5);
  line(width * 0.45, 0, width * 0.45, height);
  line(0.1 * width, height * yellowHeight, 0.1 * width, height)
  line(width * 0.45 + 0.3 * width, height* yellowHeight, width * 0.45 + 0.3 * width, height )
  line(width * 0.45, height * yellowHeight + 0.4 * height, width * 0.45 + 0.3 * width, height * yellowHeight + 0.4 * height)
}
