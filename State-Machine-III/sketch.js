let toggle = false;
let clickCount = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100);
  if (toggle) {
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
    clickCount++;
    if (clickCount == 3 && toggle == false) {
      toggle = true;
      clickCount = 0;
    }
    if (clickCount == 2 && toggle == true) {
      toggle = false;
      clickCount = 0;
    }
  }
}
