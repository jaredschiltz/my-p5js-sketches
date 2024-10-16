let size;
let offset;
let squareScaling;

function setup() {
  createCanvas(400, 400);
  size = width / 8;
  squareScaling = 0.8;
  offset = (size - squareScaling * size) / 2;
  strokeWeight(2);
  noLoop();
}

function draw() {
  background(255);
  for (let rows = 0; rows < 8; rows++) {
    for (let cols = 0; cols < 8; cols++) {
      let r = random();
      if (r > 0.1) {
        rect(
          cols * size + offset,
          rows * size + offset,
          size * squareScaling,
          size * squareScaling
        );
      } else {
        circle(cols * size + size / 2, rows * size + size / 2, size * 0.4);
      }
    }
  }
}
