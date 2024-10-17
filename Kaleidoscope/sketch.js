const SIZE = 200;
const numTriangles = 20;
let shapeWidth;
let shapeHeight;
let shape;
let b;

function preload() {
  img = loadImage("https://picsum.photos/" + str(SIZE));
}
function setup() {
  createCanvas(
    SIZE * numTriangles,
    numTriangles * sqrt(SIZE * SIZE - ((SIZE / 2) * SIZE) / 2)
  );
  // Draw the shape
  noStroke();
  shapeWidth = SIZE;
  shapeHeight = sqrt(SIZE * SIZE - ((SIZE / 2) * SIZE) / 2);
  //console.log(shapeWidth)
  // console.log(shapeHeight)
  b = ((shapeWidth / 2) * sin(PI / 6)) / sin(PI / 3);
  //console.log(b)
  console.log(width / SIZE);
  shape = createGraphics(int(shapeWidth), int(shapeHeight));
  maskedImage = createImage(int(shapeWidth), int(shapeHeight));
  maskedImage.loadPixels();
  for (let r = 0; r < shapeHeight; r++) {
    for (let c = 0; c < shapeWidth; c++) {
      maskedImage.set(c, r, img.get(c, r));
    }
  }
  maskedImage.updatePixels();
  shape.fill(0);
  shape.beginShape();
  shape.vertex(0, 0);
  shape.vertex(shapeWidth, 0);
  shape.vertex(shapeWidth / 2, shapeHeight);
  shape.endShape(CLOSE);
  // Use the shape as a mask
  maskedImage.mask(shape);
  //noLoop();
}

function draw() {
  background(220);
  for (let i = 0; i < numTriangles + 1; i = i + 3) {
    for (let j = 0; j < numTriangles + 1; j = j + 2) {
      drawHex(i * shapeWidth, j * shapeHeight);
    }
  }
  for (let i = 2; i < numTriangles + 1; i = i + 3) {
    for (let j = 1; j < numTriangles + 1; j = j + 2) {
      drawHex(i * shapeWidth - shapeWidth / 2, j * shapeHeight);
    }
  }
}

function drawHex(xpos, ypos) {
  push();
  translate(xpos, ypos - shapeHeight / 2 - b / 2);

  image(maskedImage, -shapeWidth / 2, -b);
  push();
  rotate((PI * 2) / 3);
  translate(shapeWidth / 2, -shapeHeight);
  image(maskedImage, -shapeWidth / 2, -b);
  pop();
  push();
  rotate((PI * 4) / 3);
  image(maskedImage, -shapeWidth, -(shapeHeight + b));
  pop();
  push();
  scale(-1, 1);
  rotate(-PI / 3);
  image(maskedImage, -shapeWidth, -(shapeHeight - b));
  pop();
  push();
  scale(-1, 1);
  rotate(-PI);
  image(maskedImage, -shapeWidth / 2, -2 * shapeHeight + b);
  pop();
  push();
  scale(-1, 1);
  rotate((-PI * 5) / 3);
  image(maskedImage, 0, -(shapeHeight - b));
  pop();
  pop();
}
