// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    push();
    rotate(22.5);
    let b = this.a * (sin(45) / sin(112.5));
    beginShape();
    for (let i = 0; i < 8; i++) {
      let sx = cos(i * 45) * b;
      let sy = sin(i * 45) * b;
      vertex(sx, sy);
      sx = this.a * cos(i * 45 + 45 * 0.5);
      sy = this.a * sin(i * 45 + 45 * 0.5);
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
}

//scale factor
let a = 20;
let motif = new Motif(a);
let nRow;
let nCol;
let dx, dy;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop()
  let b = a * (sin(45) / sin(112.5));
  dx = 2 * a;
  dy = dx; //approximate the nRow and nCol values
  nRow = ceil(height / dy);
  nCol = ceil(width / dx);
}

function draw() {
  background(0);
  stroke(255);
  for (let n = 0; n < 2; n++) {
    translate(5, 5);
    stroke(color(random(0, 255), random(0, 255), random(0, 255)));
    // Do the damn thang
    for (let c = 0; c < nCol + 1; c++) {
      for (let r = 0; r < nRow + 1; r++) {
        push();
        translate(c * dx, r * dy);
        motif.display();
        pop();
      }
    }

    // Stop doing the damn thing
  }
}

function keyPressed() {
  if (key === "s") {
    save("motif3.jpg");
  }
}
