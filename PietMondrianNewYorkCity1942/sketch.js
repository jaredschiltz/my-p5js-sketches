let redColor;
let yellowColor;
let blueColor;
let lineWidth;
const numLines = 8;
let verticalLines;
let horizontalLines;
beginIntialization = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  redColor = color(225, 0, 0);
  yellowColor = color(244, 212, 64);
  blueColor = color(0, 0, 255);
  lineWidth = int(min(width, height) / 40);
  verticalLines = new Array(numLines);
  horizontalLines = new Array(numLines);
  noLoop();
}

function draw() {
  background(240);
  noStroke();

  for (let i = 0; i < verticalLines.length; i++) {
    if (i == 0) {
      let pos = floor(random(lineWidth, windowWidth - 2 * lineWidth + 1));
      verticalLines[0] = pos;
    } else {
      differentValue = false;
      // Loop until new random value is valid
      // (different than all previous values within tolerance range)

      while (!differentValue) {
        // Pick a random value
        let pos = floor(random(lineWidth, windowWidth - 2 * lineWidth + 1));

        // Compare against all previous values
        for (let j = 0; j < i; j++) {
          if (
            pos < verticalLines[j] - 2 * lineWidth ||
            pos > verticalLines[j] + 2 * lineWidth + 1
          ) {
            differentValue = true;
            verticalLines[i] = pos;
          } else {
            differentValue = false;
            break;
          }
        }
      }
    }
  }

  for (let i = 0; i < horizontalLines.length; i++) {
    if (i == 0) {
      let pos = floor(random(lineWidth, windowHeight - 2 * lineWidth + 1));
      horizontalLines[0] = pos;
    } else {
      differentValue = false;
      // Loop until new random value is valid
      // (different than all previous values within tolerance range)

      while (!differentValue) {
        // Pick a random value
        let pos = floor(random(lineWidth, windowHeight - 2 * lineWidth + 1));

        // Compare against all previous values
        for (let j = 0; j < i; j++) {
          if (
            pos < horizontalLines[j] - 2 * lineWidth ||
            pos > horizontalLines[j] + 2 * lineWidth + 1
          ) {
            differentValue = true;
            horizontalLines[i] = pos;
          } else {
            differentValue = false;
            break;
          }
        }
      }
    }
  }

  for (let i = 0; i < numLines; i++) {
    fill(randomColor());
    rect(verticalLines[i], 0, lineWidth, windowHeight);
    fill(randomColor());
    rect(0, horizontalLines[i], windowWidth, lineWidth);
  }
}

function randomColor() {
  let c = random();
  if (c < 0.5) {
    return yellowColor;
  } else if (c >= 0.5 && c < 0.75) {
    return redColor;
  } else {
    return blueColor;
  }
}

function mousePressed() {
  if (
    mouseX > 0 &&
    mouseX < windowWidth &&
    mouseY > 0 &&
    mouseY < windowHeight
  ) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
