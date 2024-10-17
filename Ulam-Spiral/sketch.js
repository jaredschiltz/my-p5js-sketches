let vertCells;
let horizCells;
const cellSize = 2;
let diameter = cellSize * 0.5;
let totalCells;
let state = 3;
let jumpSize = 0;
let numOfJumps = 0;
let currentJumpCount = 0;
let xpos;
let ypos;
let previous_xpos
let previous_ypos

function setup() {
  createCanvas(1000, 1000);
  vertCells = height / cellSize - 1;
  horizCells = width / cellSize - 1;
  totalCells = vertCells * horizCells;
  xpos = width / 2;
  ypos = height / 2;
  previous_xpos = width / 2;
  previous_ypos = height / 2;
  noLoop();
}

function draw() {
  background(0);
  fill(255);
  //stroke(255)
  noStroke() // Hide Spiral Line

  for (let i = 0; i < totalCells; i++) {
    if (isPrime(i + 1) == true) {
      circle(xpos, ypos, diameter);
    }
    // line(previous_xpos, previous_ypos, xpos, ypos);

    if (currentJumpCount == numOfJumps) {
      jumpSize++;
      numOfJumps = 2 * jumpSize;
      currentJumpCount = 1;
      if (state == 3) {
        state = 0;
      } else {
        state++;
      }
    } else if (currentJumpCount == jumpSize) {
      currentJumpCount++;
      if (state == 3) {
        state = 0;
      } else {
        state++;
      }
    } else {
      currentJumpCount++;
    }

    previous_xpos = xpos;
    previous_ypos = ypos;

    switch (state) {
      case 0: // move right
        xpos += cellSize;
        break;

      case 1: // move up
        ypos -= cellSize;
        break;

      case 2: // move left
        xpos -= cellSize;
        break;

      case 3: //move down
        ypos += cellSize;
        break;
    }
  }
}

function isPrime(integer) {
  if (integer == 1) {
    return false;
  } else {
    for (let i = 2; i <= sqrt(integer); i++) {
      if (integer % i == 0) {
        return false;
      }
    }
  }
  return true;
}
