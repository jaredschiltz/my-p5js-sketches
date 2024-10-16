function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for(let rows = 0; rows < 8; rows++) {
    for(let cols = 0; cols < 8; cols++) {
      drawFace(1.5 * cols * 30, 1.5 * rows * 30)
    }
  }
  drawFace(0, 0);
}

function drawFace(xpos, ypos) {
  noFill();
  stroke(0);
  strokeWeight(3);
  circle(xpos + 30, ypos + 30, 30);
  circle(xpos + 25, ypos + 25, 5);
  line(xpos + 35, ypos + 22, xpos + 35, ypos + 28);
  arc(xpos + 30, ypos + 34, 10, 10, 0, PI);
}
