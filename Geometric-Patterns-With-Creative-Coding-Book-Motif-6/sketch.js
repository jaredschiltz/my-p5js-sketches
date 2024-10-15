// Motif class
class Motif {
  constructor(a) {
    this.radius = a;
  }
  display() {
    for (let i = 0; i < 6; i++) {
      push();
      rotate(60 * i);
      translate(cos(30) * this.radius, -sin(30) * this.radius);
      arc(0, 0, this.radius * 2, this.radius * 2, 30, 150);
      pop();
    }
  }
}

//scale factor
let radius = 20;
let nRow;
let nCol;
let motif = new Motif(radius);
let dx, dy, doff;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop();
  dx = 4 * radius * cos(30);
  dy = 3 * radius;
  doff = 0.5 * dx; //approximate the nRow and nCol values
  nRow = ceil(height / dy);
  nCol = ceil(width / dx);
}

function draw() {
  background(255);
  stroke(255);
  for (let n = 0; n < 3; n++) {
    translate(5, 5);
    stroke(color(random(0, 255), random(0, 255), random(0, 255)));
    // Do the damn thang
    for (let r = 0; r < nRow + 1; r++) {
      for (let c = 0; c < nCol + 1; c++) {
        push();
        translate(c * dx, r * dy);
        if (r % 2) {
          //rows 0,2,4,6
          translate(doff, 0);
        }
        motif.display();
        pop();
      }
    }
    // Stop doing the damn thing
  }
}

function keyPressed() {
  if (key === "s") {
    save("motif6.jpg");
  }
}
