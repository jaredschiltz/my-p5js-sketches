let noiseArray;
let maxHeight = 300;
let yoff = 0.007;
let y = 0.3;
let c1;
let c2;

function setup() {
  createCanvas(400, 400);

  c2 = color(204, 102, 0);
  c1 = color(0, 102, 153);

  noiseArray = new Array(width + 1);
  for (let i = 0; i < noiseArray.length; i++) {
    noiseArray[i] = maxHeight * noise(y);
    y += yoff;
  }
  noLoop();
}

function draw() {
  background(220);
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height - 1, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, i, width, i);
  }

  stroke(0);
  strokeWeight(3);
  for (let i = 0; i < noiseArray.length; i++) {
    line(i, height, i, height - noiseArray[i]);
  }
}
