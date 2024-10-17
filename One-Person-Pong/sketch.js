const ballSize = 30;
const wallThickness = 30;
const speed = 0.5;
let ballDirection;
let ballPosition;
let mousePos;
let paddleLength = 50;
let score = 0;

let gameOver = false;

function setup() {
  createCanvas(400, 400);
  ballDirection = createVector(-1 * random(0, width), random(0, height / 20));
  ballDirection.normalize();
  ballPosition = createVector(width / 2, height / 2);
  mousePos = height / 2;
}

function draw() {
  if (gameOver == false) {
    background(0, 0, 255);
    fill(255);
    noStroke();
    rect(0, 0, width, wallThickness);
    rect(0, 0, wallThickness, height);
    rect(0, height - wallThickness, height, wallThickness);
    circle(ballPosition.x, ballPosition.y, ballSize);
    fill(0, 0, 255);
    textSize(15);
    text("Score: " + str(score), 10, 20);
    fill(255);

    mousePos = mouseY;
    if (mousePos < wallThickness) {
      mousePos = wallThickness;
    }
    if (mousePos > height - wallThickness - paddleLength) {
      mousePos = height - wallThickness - paddleLength;
    }

    rect(width - wallThickness, mousePos, wallThickness, paddleLength);

    ballPosition.x += ballDirection.x * deltaTime * speed;
    ballPosition.y += ballDirection.y * deltaTime * speed;
    if (ballPosition.x - ballSize / 2 <= wallThickness) {
      ballPosition.x = ballSize / 2 + wallThickness;
      ballDirection.x *= -1;
    }
    if (ballPosition.x >= width + ballSize) {
      gameOver = true;
      textSize(32);
      text("Game Over", width / 3, height / 2);
      text("Hit Any Key", width / 3, (height * 2) / 3);
      text("To Restart", width / 3, (height * 5) / 6);
    }

    if (ballPosition.y - ballSize / 2 <= wallThickness) {
      ballPosition.y = ballSize / 2 + wallThickness;
      ballDirection.y *= -1;
    }

    if (ballPosition.y + ballSize / 2 >= height - wallThickness) {
      ballPosition.y = height - ballSize / 2 - wallThickness;
      ballDirection.y *= -1;
    }

    if (
      ballPosition.x + ballSize / 2 >= width - wallThickness &&
      ballPosition.x + ballSize / 2 < width - wallThickness + 10 &&
      ballPosition.y > mousePos &&
      ballPosition.y < mousePos + paddleLength
    ) {
      ballPosition.x = width - ballSize / 2 - wallThickness;
      ballDirection.x *= -1;
      score++;
    }
  }
}

function keyPressed() {
  if (gameOver == true) {
    gameOver = false;
    ballDirection = createVector(-1 * random(0, width), random(0, height));
    ballDirection.normalize();
    ballPosition = createVector(width / 2, height / 2);
    mousePos = height / 2;
    score = 0
  }
}
