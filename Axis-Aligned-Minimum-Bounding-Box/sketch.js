let x = [
  81,
  83,
  83,
  83,
  83,
  82,
  79,
  77,
  80,
  83,
  84,
  85,
  84,
  90,
  94,
  94,
  89,
  85,
  83,
  75,
  71,
  63,
  59,
  60,
  44,
  37,
  33,
  21,
  15,
  12,
  14,
  19,
  22,
  27,
  32,
  35,
  40,
  41,
  38,
  37,
  36,
  36,
  37,
  43,
  50,
  59,
  67,
  71,
];

let y = [
  10,
  17,
  22,
  27,
  33,
  41,
  49,
  53,
  67,
  76,
  93,
  103,
  110,
  112,
  114,
  118,
  119,
  118,
  121,
  121,
  118,
  119,
  119,
  122,
  122,
  118,
  113,
  108,
  100,
  92,
  88,
  90,
  95,
  99,
  101,
  80,
  62,
  56,
  43,
  32,
  24,
  19,
  13,
  16,
  23,
  22,
  24,
  20,
];

let minX;
let maxX;
let minY;
let maxY;

function setup() {
  createCanvas(400, 400);
  minX = Math.min(...x);
  maxX = Math.max(...x);
  minY = Math.min(...y);
  maxY = Math.max(...y);
}

function draw() {
  background(255);
  stroke(0);
  if (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY) {
    fill(255, 255, 0);
  } else {
    fill(200);
  }
  beginShape();
  for (let i = 0; i < x.length; i++) {
    vertex(x[i], y[i]);
  }
  endShape(CLOSE);
  noFill();
  stroke(255, 0, 0);
  rect(minX, minY, maxX - minX, maxY - minY);
}
