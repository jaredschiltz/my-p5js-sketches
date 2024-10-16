// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    let x0, y0, x1, y1, x2, y2, x3, y3;
    for (let i = 0; i < 6; i++) {
      push();
      rotate(i * 60);
      translate(cos(30) * this.a * 2, 0); //line one
      beginShape();
      x0 = this.a * cos(30);
      y0 = this.a * sin(30);
      vertex(x0, y0);
      x1 = -1 * x0;
      y1 = -1 * y0;
      vertex(x1, y1);
      endShape(); //line two
      beginShape();
      x2 = x0;
      y2 = y1;
      vertex(x2, y2);
      x3 = x1;
      y3 = y0;
      vertex(x3, y3);
      endShape();
      pop();
    }
  }
}

//scale factor
let a = 16;
let motif = new Motif(a);
let nRow;
let nCol;
let dx, dy;
let colors = ["#ff00f4", "#2aff00", "#fdff00", "#FFE82D", "#FF21FF"];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop();
  dx = 6 * a * cos(30);
  dy = 4.5 * a;
  doff = 0.5 * dx; //approximate the nRow and nCol values
  nCol = ceil(width / dx);
  nRow = ceil(height / dy);
}

function draw() {
  background(0);
  for (let n = 0; n < 2; n++) {

    translate(5,5)
    stroke(color(random(0,255),random(0,255),random(0,255)));
    for (let c = 0; c < nCol; c++) {
      for (let r = 0; r < nRow; r++) {
        push();
        if (r % 2 == 0) {
          //columns 0,2,4
          translate(doff, 0);
        }
        translate(c * dx, r * dy);
        motif.display();
        pop();
      }
    }
  }
}

function keyPressed() {
  if (key === "s") {
    save("motif1.jpg");
  }
}
