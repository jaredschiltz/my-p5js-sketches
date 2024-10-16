let multiplier = 1.3;
let radius = 10;
let weight = 0.5;

function setup() {
  createCanvas(400, 400);
  stroke(0);
  noFill();
  noLoop();
}

function draw() {
  background(220);
  for (let i = 0; i < 20; i++) {
    strokeWeight(weight);
    circle(width / 2, height, radius);
    weight *= multiplier;
    radius *= multiplier;
  }
}
