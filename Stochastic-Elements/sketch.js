let loopTimes;

function setup() {
  createCanvas(400, 400);
  noFill();
  stroke(255);
  noLoop();
}

function draw() {
  background(100);
  loopTimes = random(3, 20);
  for (let i = 0; i < loopTimes; i++) {
    let xpos = random(0, width);
    let ypos = random(0, height);
    let size = random(30, 70);
    stroke(255);
    circle(xpos, ypos, size);
    stroke(0);
    circle(xpos + 1, ypos + 1, size);
  }

  loopTimes = random(3, 20);
  for (let i = 0; i < loopTimes; i++) {
    let xpos = random(0, width);
    let ypos = random(0, height);
    let size = random(10, 30);
    stroke(255);
    circle(xpos, ypos, size);
    stroke(0);
    circle(xpos + 1, ypos + 1, size);
  }

  loopTimes = random(3, 20);
  for (let i = 0; i < loopTimes; i++) {
    let xpos = random(0, width);
    let ypos = random(0, height);
    let size = random(1, 10);
    stroke(255);
    circle(xpos, ypos, size);
    stroke(0);
    circle(xpos + 1, ypos + 1, size);
  }

  filter(BLUR, 2);
}
