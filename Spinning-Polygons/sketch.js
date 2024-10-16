function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(HSB)
}

function draw() {
  background(0);
  strokeWeight(0.1)
  //lights();
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);
  scale(width / 2, height / 2);
  let color0 = color(0,255,255);
  let color1 = color(255,255,255);
  let numSteps = 50;
  for (let i = 0; i < numSteps; i++) {
    let a = map(i, 0, numSteps - 1, 0, 1);
    fill(lerpColor(color0, color1, a));
    push();
    translate(
      0,
      0,
      map(i, 0, numSteps - 1, (-numSteps / 2) * 10, (numSteps / 2) * 10)
    );

    drawPolygon();
    pop();
  }
  //noLoop()
}

function drawPicture() {
  fill(241, 100, 95);
  drawPolygon();
}
function drawPolygon() {
  beginShape();
  vertex(-0.2, -0.4, 0);
  vertex(0.2, -0.4, 0);
  vertex(0.2, 0.4, 0);
  vertex(-0.2, 0.4, 0);
  endShape(CLOSE);
}
