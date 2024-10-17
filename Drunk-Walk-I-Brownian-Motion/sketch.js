let newVector;
let oldVector;

function setup() {
  createCanvas(400, 400);
  background(220);
  newVector = createVector(width / 2, height / 2);
  oldVector = createVector(width / 2, height / 2);
  stroke(0);
}

function draw() {
  newVector.x += random(0, 10) * randomSign();
  newVector.y += random(0, 10) * randomSign();
  line(newVector.x, newVector.y, oldVector.x, oldVector.y);
  oldVector.x = newVector.x;
  oldVector.y = newVector.y;
}

function randomSign() {
  let sign = random();
  if (sign > 0.5) {
    return 1;
  } else {
    return -1;
  }
}
