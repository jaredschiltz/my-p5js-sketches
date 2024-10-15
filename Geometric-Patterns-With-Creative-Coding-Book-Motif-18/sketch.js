// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    let x0, y0, x1, y1;
    x0 = 0;
    y0 = 0;
    x1 = a * cos(30);
    y1 = a * sin(30);
    for (let i = 0; i < 12; i++) {
      push();
      rotate(i * 30);
      translate(0, -a);
      beginShape();
      vertex(x1, -y1);
      vertex(x0, -y0);
      vertex(-x1, -y1);
      endShape();
      pop();
    }
  }
}

//scale factor
let a = 32;
let motif = new Motif(a);
let nRow;
let nCol;
let dx, dy, doff;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop();
  dx = 2 * (a + a * sin(30));
  dy = 4 * a * cos(30);
  doff = 2 * a * cos(30);
  //approximate the nRow and nCol values
  nRow = 1+ceil(height / dy);
  nCol = 1+ceil(width / dx);
}

function draw() {
  background(0);
  stroke(255);
  for (let n = 0; n < 5; n++) {
    translate(5, 5);
    stroke(
      color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)))
    );
    // Do the damn thang
    for (let c = 0; c < nCol; c++) {
      for (let r = 0; r < nRow; r++) {
        push();
        if (c % 2 == 1) {
          //columns 1,3,5,7
          translate(0, doff);
        }
        translate(dx * c, dy * r);
        motif.display();
        pop();
      }
    }
    // Stop doing the damn thing
  }
}

function keyPressed() {
  if (key === "s") {
    save("motif18.jpg");
  }
}
