// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    let a = this.a;
    let b, c, d;
    b = (a * sin(40)) / sin(70);
    c = b * 0.5;
    d = (c * sin(40)) / sin(30);
    let x0, y0, x1, y1, x2, y2, x3, y3;
    x0 = 0;
    y0 = 0;
    x1 = b * cos(20);
    y1 = b * sin(20);
    x2 = x1 + c * cos(60);
    y2 = y1 + c * sin(60);
    x3 = 0;
    y3 = a;
    push();
    rotate(30);
    for (let i = 0; i < 6; i++) {
      push();
      rotate(i * 60);
      translate(0, -d);
      beginShape();
      vertex(x0, -y0);
      vertex(x1, -y1);
      vertex(x2, -y2);
      vertex(x3, -y3);
      endShape(); //mirrored on y axis
      beginShape();
      vertex(-x0, -y0);
      vertex(-x1, -y1);
      vertex(-x2, -y2);
      vertex(-x3, -y3);
      endShape();
      pop();
    }
    pop();
  }
}

//scale factor
let a = 44;
let motif = new Motif(a);
let dx, dy, doff;
let nRow;
let nCol;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop();
  let b, c, d;
  b = (a * sin(40)) / sin(70);
  c = b * 0.5;
  d = (c * sin(40)) / sin(30);
  dx = 1.5 * (a + d);
  dy = 2 * (a + d) * sin(60);
  doff = 0.5 * dy; //approximate the nRow and nCol values
  nRow = 1 + ceil(height / dy);
  nCol = 1 + ceil(width / dx);
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
    save("motif7.jpg");
  }
}
