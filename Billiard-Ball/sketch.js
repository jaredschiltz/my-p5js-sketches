const ballSize = 30;
const speed = 0.1;
let ballDirection;
let ballPosition;

function setup() {
  createCanvas(400, 400);
  ballDirection = createVector(random(0, width), random(0, height));
  ballDirection.normalize();
  ballPosition = createVector(width / 2, height / 2);
}

function draw() {
  background(0, 255, 0);
  fill(255);
  noStroke();
  circle(ballPosition.x, ballPosition.y, ballSize);
  ballPosition.x += ballDirection.x * deltaTime * speed;
  ballPosition.y += ballDirection.y * deltaTime * speed;
  if (ballPosition.x - ballSize / 2 <= 0) {
    ballPosition.x = ballSize / 2;
    ballDirection.x *= -1;
  }
  if (ballPosition.x + ballSize / 2 >= width) {
    ballPosition.x = width - ballSize / 2;
    ballDirection.x *= -1;
  }

  if (ballPosition.y - ballSize / 2 <= 0) {
    ballPosition.y = ballSize / 2;
    ballDirection.y *= -1;
  }

  if (ballPosition.y + ballSize / 2 >= height) {
    ballPosition.y = height - ballSize / 2;
    ballDirection.y *= -1;
  }
}
