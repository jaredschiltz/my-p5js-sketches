let hover = false;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100);
  if (
    mouseX > width / 3 &&
    mouseX < (width * 2) / 3 &&
    mouseY > width / 3 &&
    mouseY < (height * 2) / 3
  ) {
    hover = true;
  } else {
    hover = false;
  }
  if (mouseIsPressed && hover == true) {
    fill(0);
  } else {
    if (hover == true) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
  }

  stroke(0);
  strokeWeight(3);
  rect(width / 3, height / 3, width / 3, height / 3);
}

function mousePressed() {}
