let boolDoRefresh;
let bkgrd = 255;
let canvasW = 600;
let canvasH = 600;
let border = 30;
let gridSize = 56;
let baseAngle = 90; //change to 0 for horizontal orientation
let lineRadius = 9;

function setup() {
  createCanvas(canvasW, canvasH);
  boolDoRefresh = true;
  background(bkgrd);
  noFill();
  angleMode(DEGREES);
}

function draw() {
  if (boolDoRefresh) {
    drawTheThing();
    boolDoRefresh = false;
  }
}

function drawTheThing() {
  let div = (width - 2 * border) / gridSize;
  let noiseVal;
  let noiseScale = 0.01;
  for (let x = border; x < width - border; x += div) {
    for (let y = border; y < width - border; y += div) {
      noiseDetail(3, 0.7);
      noiseVal = noise(x * noiseScale, y * noiseScale);
      if (noiseVal > 0.70) stroke(255);
      else stroke(0);
      drawLineCenteredAt(x, y);
    }
  }
}

function drawLineCenteredAt(x, y) {
  let angle, dx, dy, bias;
  bias = 65;
  angle = baseAngle - random(bias);
  let half = random(2);
  let neg;
  if (half < 1) neg = -1;
  else neg = 1;

  dx = neg * lineRadius * cos(angle);
  dy = lineRadius * sin(angle);
  line(x + dx, y + dy, x - dx, y - dy);
}

function mousePressed() {
  background(bkgrd);
  noiseSeed(random(100));
  boolDoRefresh = true;
}
