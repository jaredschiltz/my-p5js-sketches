const radius = 20;
let rows;
let cols;
let elementArray;

function setup() {
  createCanvas(400, 400);
  cols = floor(width / (radius * 2));
  rows = floor(height / (radius * 2));
  elementArray = new Array(rows);
  for (let i = 0; i < elementArray.length; i++) {
    elementArray[i] = new Array(cols);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      elementArray[i][j] = new Element(radius);
    }
  }

  noFill();
  strokeWeight(4);
}

function draw() {
  background(220);
  translate(radius, radius)
  for (let i = 0; i < rows; i++) {
    push()
    translate(0, 2*radius*i)
    for (let j = 0; j < cols; j++) {
      push()
      translate(2*radius*j, 0)
      elementArray[i][j].update(mouseX);
      elementArray[i][j].draw();
      pop()
    }
    pop()
  }
}
