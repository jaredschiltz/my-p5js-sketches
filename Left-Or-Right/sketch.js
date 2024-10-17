function setup() {
  createCanvas(400, 400);
  setLineDash([5, 5]); //create the dashed line pattern here
  textSize(32);
}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, width / 2, (height * 3) / 4);
  fill(0);
  noStroke();
  let position;
  if (mouseX >= width / 2) {
    position = "RIGHT";
  } else {
    position = "LEFT";
  }
  text("Cursor is on the " + position, width / 10, (height * 9) / 10);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
