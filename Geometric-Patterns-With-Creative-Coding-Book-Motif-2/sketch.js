// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    let b = 2 * this.a * cos(30);
    beginShape();
    for (let i = 0; i < 12; i++) {
      let x, y;
      if (i % 2 == 0) {
        x = this.a * cos(30 * i);
        y = this.a * sin(30 * i);
      } else {
        x = b * cos(30 * i);
        y = b * sin(30 * i);
      }
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

//scale factor
let a = 27;
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
  noLoop();
  dx = 3 * a;
  dy = 4 * a * cos(30); //approximate the nRow and nCol values
  nRow = ceil(height / dy);
  nCol = ceil(width / dx);
}

function draw() {
  background(0);
  stroke(255);
  for (let n = 0; n < 3; n++) {

  translate(5,5)
  stroke(color(random(0,255),random(0,255),random(0,255)));
  for (let c = 0; c < nCol; c++) {
    for (let r = 0; r < nRow; r++) {
      push();
      translate(dx * c, dy * r);
      if (c % 2 == 0) {
        //columns 0,2,4
        translate(0, dy * 0.5);
      }
      motif.display();
      pop();
    }
  }
   }
}

function keyPressed() {
  if (key === "s") {
    save("motif2.jpg");
  }
}
