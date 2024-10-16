// Schotter by Georg Nees (1968)
let cols = 14; // 12 columns + 2 spaces for margin
let rows = 24; // 22 columns + 2 spaces for margin
const size = 30; // square size
function setup() {
  createCanvas(cols * size, rows * size);
  noFill();
  noLoop();
  stroke(0);
  strokeWeight(2);
  rectMode(CENTER);
}

function draw() {
  background(220);
  translate(size + size / 2, size + size / 2);
  for (let r = 0; r < rows - 2; r++) {
    push();
    for (let c = 0; c < cols - 2; c++) {
      push();
      rotate(map(r, 0, 21, 0.001, 0.4) * random(-PI / 2, PI / 2));
      translate(
        map(r, 0, 21, 0.001, 0.5) * random(-20, 20),
        map(r, 0, 21, 0.001, 0.5) * random(-20, 20)
      );
      rect(0, 0, size, size);
      pop();
      translate(size, 0);
    }
    pop();
    translate(0, size);
  }
}
