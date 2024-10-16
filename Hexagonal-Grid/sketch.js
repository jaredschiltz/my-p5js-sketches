const circumRadius = 10;
const rows = 30;
const cols = 30;

function setup() {
  createCanvas(rows * sqrt(3) * circumRadius, cols * sqrt(3) * circumRadius);
  noLoop();
}

function draw() {
  background(220);
  for (let r = 0; r < rows + 10; r++) {
    // TODO: replace hard constant of 10 with calculated value
    push();
    if (r % 2 == 1) {
      translate((sqrt(3) / 2) * circumRadius, 0);
    }
    for (let c = 0; c < cols + 1; c++) {
      fill(random(30, 256));

      makeHex();
      translate(sqrt(3) * circumRadius, 0);
    }
    pop();
    translate(0, circumRadius + circumRadius / 2);
  }
}

function makeHex() {
  beginShape();
  vertex(0, circumRadius);
  vertex((sqrt(3) * circumRadius) / 2, circumRadius / 2);
  vertex((sqrt(3) * circumRadius) / 2, -circumRadius / 2);
  vertex(0, -circumRadius);
  vertex((-sqrt(3) * circumRadius) / 2, -circumRadius / 2);
  vertex((-sqrt(3) * circumRadius) / 2, circumRadius / 2);
  endShape(CLOSE);
}
