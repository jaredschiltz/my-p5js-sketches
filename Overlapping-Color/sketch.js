const transparency = 255;
function setup() {
  createCanvas(400, 400);
  blendMode(DARKEST);
}

function draw() {
  background(255);
  noStroke();
  fill(255, 0, 255, transparency);
  circle(width / 3, height / 3, width / 2);
  fill(0, 255, 255, transparency);
  circle((width / 3) * 2, height / 3, width / 2);
  fill(255, 255, 0, transparency);
  circle(width / 2, (height / 3) * 2, width / 2);
}
