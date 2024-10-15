// Motif class
class Motif {
  constructor(r) {
    this.a = r; //inner Radius
    this.b = r * (sin(135) / sin(15)); //outer Radius
  }
  display() {
    let angle = 30;
    beginShape();
    for (let i = 0; i < 12; i++) {
      let sx, sy;
      if (i % 2 == 0) {
        sx = cos(i * angle) * this.b;
        sy = sin(i * angle) * this.b;
      } else {
        sx = cos(i * angle) * this.a;
        sy = sin(i * angle) * this.a;
      }
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

//scale factor
let a = 10; //inner Radius, scale factor
let b; //outer Radius
let dx, dy;
let nRow;
let nCol;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop();
  b = a * (sin(135) / sin(15));
  dx = 2 * b;
  dy = 2 * b * cos(30); //approximate the nRow and nCol values
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
    let motif = new Motif(a);
    for (let r = 0; r < nRow + 1; r++) {
      for (let c = 0; c < nCol + 1; c++) {
        push();
        if (r % 2 == 0) {
          //rows 0,2,4,6
          translate(c * dx, r * dy);
        } else {
          //rows 1,3,5,7
          translate(c * dx + b, r * dy);
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
    save("motif4.jpg");
  }
}
