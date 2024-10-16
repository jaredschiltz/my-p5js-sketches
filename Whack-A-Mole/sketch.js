function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  drawBackground();
  push()
  translate(80,60 + 30)
  drawMole();
  pop()
  push()
  translate(70,60 + 70)
  drawMask();
  drawRim()
  pop()
  
}

function drawBackground() {
  strokeCap(ROUND);
  strokeJoin(ROUND);
  stroke("rgba0000");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill("#a0a0a0");
  stroke("#000000");
  strokeWeight(2);

  beginShape();
  vertex(300, 125);
  bezierVertex(317, 125, 330, 127, 330, 130);
  bezierVertex(330, 133, 317, 135, 300, 135);
  bezierVertex(283, 135, 270, 133, 270, 130);
  bezierVertex(270, 127, 283, 125, 300, 125);
  endShape();

  beginShape();
  vertex(300, 215);
  bezierVertex(317, 215, 330, 217, 330, 220);
  bezierVertex(330, 223, 317, 225, 300, 225);
  bezierVertex(283, 225, 270, 223, 270, 220);
  bezierVertex(270, 217, 283, 215, 300, 215);
  endShape();

  beginShape();
  vertex(300, 305);
  bezierVertex(317, 305, 330, 307, 330, 310);
  bezierVertex(330, 313, 317, 315, 300, 315);
  bezierVertex(283, 315, 270, 313, 270, 310);
  bezierVertex(270, 307, 283, 305, 300, 305);
  endShape();

  beginShape();
  vertex(200, 125);
  bezierVertex(217, 125, 230, 127, 230, 130);
  bezierVertex(230, 133, 217, 135, 200, 135);
  bezierVertex(183, 135, 170, 133, 170, 130);
  bezierVertex(170, 127, 183, 125, 200, 125);
  endShape();

  beginShape();
  vertex(200, 215);
  bezierVertex(217, 215, 230, 217, 230, 220);
  bezierVertex(230, 223, 217, 225, 200, 225);
  bezierVertex(183, 225, 170, 223, 170, 220);
  bezierVertex(170, 217, 183, 215, 200, 215);
  endShape();

  beginShape();
  vertex(200, 305);
  bezierVertex(217, 305, 230, 307, 230, 310);
  bezierVertex(230, 313, 217, 315, 200, 315);
  bezierVertex(183, 315, 170, 313, 170, 310);
  bezierVertex(170, 307, 183, 305, 200, 305);
  endShape();

  beginShape();
  vertex(100, 125);
  bezierVertex(117, 125, 130, 127, 130, 130);
  bezierVertex(130, 133, 117, 135, 100, 135);
  bezierVertex(83, 135, 70, 133, 70, 130);
  bezierVertex(70, 127, 83, 125, 100, 125);
  endShape();

  beginShape();
  vertex(100, 215);
  bezierVertex(117, 215, 130, 217, 130, 220);
  bezierVertex(130, 223, 117, 225, 100, 225);
  bezierVertex(83, 225, 70, 223, 70, 220);
  bezierVertex(70, 217, 83, 215, 100, 215);
  endShape();

  beginShape();
  vertex(100, 305);
  bezierVertex(117, 305, 130, 307, 130, 310);
  bezierVertex(130, 313, 117, 315, 100, 315);
  bezierVertex(83, 315, 70, 313, 70, 310);
  bezierVertex(70, 307, 83, 305, 100, 305);
  endShape();
}

function drawMole() {
  strokeCap(ROUND);
  strokeJoin(ROUND);
  stroke("rgba0000");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill("#ffc6c8");
  stroke("#000000");
  strokeWeight(2);
  beginShape();
  vertex(0, 14);
  bezierVertex(0, 6, 9, 0, 20, 0);
  bezierVertex(31, 0, 40, 7, 40, 15);
  vertex(40, 50);
  vertex(0, 50);
  vertex(0, 15);
  vertex(0, 14);
  endShape();
}

function drawMask() {
  noStroke();
  fill("#ffff00");
  beginShape();
  vertex(60, 70);
  vertex(0, 70);
  vertex(0, 0);
  vertex(0, 0);
  bezierVertex(0, 3, 13, 6, 30, 6);
  bezierVertex(47, 6, 60, 3, 60, 0);
  vertex(60, 70);
  endShape();
}

function drawRim() {
  strokeCap(ROUND);
  strokeJoin(ROUND);
  stroke("rgba0000");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  noFill();
  stroke("#000000");
  strokeWeight(2);
  beginShape();
  vertex(60, 0);
  bezierVertex(60, 3, 47, 5, 30, 5);
  bezierVertex(13, 5, 0, 3, 0, 0);
  endShape();
}
