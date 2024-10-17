let hasClicked = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100);
  if (hasClicked) {
    fill(0);
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(3);
  rect(width / 3, height / 3, width / 3, height / 3);
}

function mousePressed() {
  if (
    mouseX > width / 3 &&
    mouseX < (width * 2) / 3 &&
    mouseY > width / 3 &&
    mouseY < (height * 2) / 3
  ) {
    hasClicked = true;
  }
}
