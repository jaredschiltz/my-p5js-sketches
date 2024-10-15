// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    let c = this.a * cos(22.5);
    let b = this.a * (sin(22.5) / sin(112.5));
    let e = this.a / (3 * cos(45) + 2);
    let d = e * cos(45);
    let x0, y0, x1, y1, x2, y2;
    x0 = (a + b) * cos(22.5);
    y0 = (a + b) * sin(22.5);
    x1 = a * cos(22.5);
    y1 = a * sin(22.5);
    x2 = (a - (e + d)) * cos(22.5);
    y2 = (a - (e + d)) * sin(22.5);
    for (let i = 0; i < 8; i++) {
      push();
      rotate(i * 45);
      translate(2 * c, 0);
      let mirror = 1;
      for (let m = 0; m < 2; m++) {
        push(); //reflect on x axis
        scale(1, mirror);
        beginShape();
        vertex(-x0, -y0); //segments 2,4,6,8
        if (i % 2 == 1) {
          vertex(x2, y2);
        } else {
          vertex(x1, y1);
        }
        endShape();
        mirror = -1;
        pop();
      }
      pop();
    }
  }
}

//scale factor
let a = 30;
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

  let c = a * cos(22.5);
  dx = 4 * c;
  dy = dx; //approximate the nRow and nCol values
  nRow = ceil(height / dy);
  nCol = ceil(width / dx);
}

function draw() {
  background(0);
  stroke(255);
  for (let n = 0; n < 4; n++) {
    translate(5, 5);
    stroke(
      color(int(random(0, 255)), int(random(0, 255)), int(random(0, 255)))
    );
    // Do the damn thang
    for (let c = 0; c < nCol; c++) {
      for (let r = 0; r < nRow; r++) {
        push();
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
    save("motif16.jpg");
  }
}
