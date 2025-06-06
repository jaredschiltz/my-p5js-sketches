// Motif class
class Motif {
  constructor(a) {
    this.a = a;
  }
  display() {
    let a, b, c, d, e, f, g, h;
    a = this.a;
    b = (a * sin(75)) / sin(15);
    c = (b * cos(45)) / cos(15);
    d = b + c;
    e = 2 * d;
    f = 2 * e * cos(45);
    g = f * (sin(22.5) / sin(112, 5));
    h = g * (sin(45) / sin(67, 5));
    let x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7;
    x0 = 0;
    y0 = a;
    x1 = (2.0 * e - (a + b + c)) * (sin(45) / sin(75)) * cos(30);
    y1 = (2.0 * e - (a + b + c)) * (sin(45) / sin(75)) * sin(30) + a;
    x2 = 0;
    y2 = d;
    x3 = tan(30) * y2;
    y3 = 0;
    x4 = b + c;
    y4 = 0;
    x5 = x4;
    y5 = (e - g) / 2 + y2;
    x6 = 0;
    y6 = 3 * d - g;
    x7 = h * cos(22.5);
    y7 = h * sin(22.5) + 3 * d - g;
    push();
    rotate(45);
    for (let j = 0; j < 4; j++) {
      push();
      rotate(j * 90);
      push();
      translate(0, -d);
      let mirror = 1;
      for (let i = 0; i < 2; i++) {
        push();
        scale(mirror, 1);
        beginShape();
        vertex(x0, -y0);
        vertex(x1, -y1);
        endShape();
        beginShape();
        vertex(x2, -y2);
        vertex(x3, -y3);
        vertex(x4, -y4);
        vertex(x5, -y5);
        vertex(x6, -y6);
        vertex(x7, -y7);
        endShape();
        pop();
        mirror = mirror * -1;
      }
      pop();
      pop();
    }
    pop();
  }
}

//scale factor
let a = 4;
let motif = new Motif(a);
let nRow;
let nCol;
let xOff, yOff;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  noFill();
  stroke(0, 0, 0, 255);
  strokeWeight(2);
  noLoop();

  let b, c, d, e, f, g, h;
  b = (a * sin(75)) / sin(15);
  c = (b * cos(45)) / cos(15);
  d = b + c;
  e = 2 * d;
  f = 2 * e * cos(45);
  xOff = 2 * f;
  yOff = 2 * f;

  //approximate the nRow and nCol values
  nRow = ceil(height / xOff);
  nCol = ceil(width / yOff);
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
    push();
    for (let c = 0; c < nCol; c++) {
      for (let r = 0; r < nRow; r++) {
        push();
        translate(xOff * c, yOff * r);
        motif.display();
        pop();
      }
    }
    pop();
    // Stop doing the damn thing
  }
}

function keyPressed() {
  if (key === "s") {
    save("motif15.jpg");
  }
}
