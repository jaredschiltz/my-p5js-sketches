let rect1Pos;
let rect1Size;
let rect2Pos;
let rect2Size;
let click = false;
let randomPosVector1;
let randomPosVector2;

function setup() {
  createCanvas(400, 400);
  rect1Pos = createVector(0, 0);
  rect1Size = createVector(0, 0);
  rect2Pos = createVector(0, 0);
  rect2Size = createVector(0, 0);
  randomPosVector1 = randomPos();
  rect1Pos.x = randomPosVector1.x;
  rect1Pos.y = randomPosVector1.y;
  rect1Size.x = random(0, width - rect1Pos.x);
  rect1Size.y = random(0, height - rect1Pos.y);
  randomPosVector2 = randomPos();
  rect2Pos.x = randomPosVector2.x;
  rect2Pos.y = randomPosVector2.y;
  rect2Size.x = random(0, width - rect2Pos.x);
  rect2Size.y = random(0, height - rect2Pos.y);
}

function draw() {
  background(220);
  noFill();
  stroke(0);
  strokeWeight(2);

  if (click) {
    randomPosVector1 = randomPos();
    rect1Pos.x = randomPosVector1.x;
    rect1Pos.y = randomPosVector1.y;
    rect1Size.x = random(0, width - rect1Pos.x);
    rect1Size.y = random(0, height - rect1Pos.y);
    randomPosVector2 = randomPos();
    rect2Pos.x = randomPosVector2.x;
    rect2Pos.y = randomPosVector2.y;
    rect2Size.x = random(0, width - rect2Pos.x);
    rect2Size.y = random(0, height - rect2Pos.y);
    click = false;
  }

  stroke(255, 0, 0);
  rect(rect1Pos.x, rect1Pos.y, rect1Size.x, rect1Size.y);

  stroke(0, 255, 0);
  rect(rect2Pos.x, rect2Pos.y, rect2Size.x, rect2Size.y);
  isIntersecting();
}

function randomPos() {
  return createVector(random(0, width), random(0, height));
}

function isIntersecting(rect1, rect2) {
  if (
    rect1Pos.x + rect1Size.x >= rect2Pos.x &&
    rect1Pos.x <= rect2Pos.x + rect2Size.x &&
    rect1Pos.y + rect1Size.y >= rect2Pos.y &&
    rect1Pos.y <= rect2Pos.y + rect2Size.y
  ) {
    stroke(0);
    line(
      max(min(rect1Pos.x), min(rect2Pos.x)),
      max(min(rect1Pos.y), min(rect2Pos.y)),
      min(max(rect1Pos.x + rect1Size.x), max(rect2Pos.x + rect2Size.x)),
      min(max(rect1Pos.y + rect1Size.y), max(rect2Pos.y + rect2Size.y))
    );

    line(
      max(min(rect1Pos.x), min(rect2Pos.x)),
      min(max(rect1Pos.y + rect1Size.y), max(rect2Pos.y + rect2Size.y)),
      min(max(rect1Pos.x + rect1Size.x), max(rect2Pos.x + rect2Size.x)),
      max(min(rect1Pos.y), min(rect2Pos.y))
    );
  }
}

function mousePressed() {
  click = true;
}
