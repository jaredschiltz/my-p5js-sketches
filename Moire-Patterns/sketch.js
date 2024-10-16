function setup() {
  createCanvas(400, 400);
  stroke(0);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(220);
  for (let i = 0; i < 60; i++) {
    circle(width / 2, height / 2, 10 * i);
  }
  push();
  translate(map(mouseX, 0, width, -width, width * 2), 0);
  for (let i = 0; i < 60; i++) {
    circle(0, height / 2, 10 * i);
  }
  pop();
}
