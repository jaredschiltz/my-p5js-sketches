const progressBarLength = 380;
const timeOut = 5000;
const progressBarSpeed = progressBarLength / timeOut;
let currentProgress = 0;
let lightOrange;
let darkOrange;

function setup() {
  createCanvas(400, 400);
  setTimeout(timeIsUp, timeOut);
  lightOrange = color(255, 182, 0);
  darkOrange = color(255, 123, 78);
}

function draw() {
  background(255);
  fill(210);
  noStroke();
  rect(10, height / 2, progressBarLength, 10);
  fill(0);
  rect(10, height / 2, currentProgress, 10);
  drawFlame(currentProgress, 50);
  currentProgress += progressBarSpeed * deltaTime;
  if (currentProgress >= 380) {
    currentProgress = 380;
    timeIsUp();
  }
}

function drawFlame(xpos) {
  push();
  translate(-8 + xpos, height / 2 - 52);
  noStroke();
  fill(lightOrange);
  beginShape();
  vertex(8, 2);
  bezierVertex(8, 2, 4, 33, 9, 48);
  bezierVertex(10, 54, 17, 65, 26, 62);
  bezierVertex(34, 60, 36, 48, 35, 42);
  bezierVertex(30, 27, 8, 2, 8, 2);
  endShape();

  push();
  translate(13, 30);
  fill(darkOrange);
  beginShape();
  vertex(4, 1);
  bezierVertex(4, 1, 2, 17, 4, 24);
  bezierVertex(5, 27, 9, 32, 13, 31);
  bezierVertex(17, 30, 18, 24, 17, 21);
  bezierVertex(15, 14, 4, 1, 4, 1);
  endShape();
  pop();
  pop();
}

function timeIsUp() {
  background(0);
  fill(lightOrange);
  beginShape();
  vertex(0, 0);
  vertex(85, 89);
  vertex(0, 111);
  vertex(85, 178);
  vertex(0, 289);
  vertex(85, 267);
  vertex(21, 400);
  vertex(127, 333);
  vertex(255, 400);
  vertex(233, 311);
  vertex(382, 333);
  vertex(297, 222);
  vertex(400, 111);
  vertex(276, 133);
  vertex(382, 0);
  vertex(255, 44);
  vertex(212, 0);
  vertex(149, 44);
  vertex(0, 0);
  endShape();

  fill(darkOrange);
  push();
  translate(30, 30);
  beginShape();
  vertex(0, 0);
  vertex(71, 74);
  vertex(0, 93);
  vertex(71, 148);
  vertex(0, 241);
  vertex(71, 222);
  vertex(18, 333);
  vertex(106, 278);
  vertex(212, 333);
  vertex(195, 259);
  vertex(318, 278);
  vertex(248, 185);
  vertex(333, 93);
  vertex(230, 111);
  vertex(318, 0);
  vertex(212, 37);
  vertex(177, 0);
  vertex(124, 37);
  vertex(0, 0);
  endShape();
  pop();
  stroke(0);
  fill(0);
  textSize(40);
  text("BOOM!", width / 2 - 80, height / 2);
}
