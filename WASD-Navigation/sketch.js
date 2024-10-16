let tileSheet;
let roger = {
  right: [],
  left: [],
  down: [],
  up: [],
  xPos: 0,
  yPos: 0,
  rightIndex: 0,
  leftIndex: 0,
  upIndex: 0,
  downIndex: 0,
  currentDirection: "right",
  currentIndex: 0,
};
const tileWidth = 16;
const tileHeight = 34;

function preload() {
  tileSheet = loadImage("roger_tilesheet.png");
}
function setup() {
  createCanvas(400, 400);
  // Initialize object with image arrays
  roger.right = new Array(8);
  roger.left = new Array(8);
  roger.down = new Array(6);
  roger.up = new Array(6);
  for (let i = 0; i < roger.right.length; i++) {
    roger.right[i] = new p5.Image(tileWidth, tileHeight);
  }
  for (let i = 0; i < roger.left.length; i++) {
    roger.left[i] = new p5.Image(tileWidth, tileHeight);
  }
  for (let i = 0; i < roger.down.length; i++) {
    roger.down[i] = new p5.Image(tileWidth, tileHeight);
  }
  for (let i = 0; i < roger.up.length; i++) {
    roger.up[i] = new p5.Image(tileWidth, tileHeight);
  }

  // Copy tilesheet tiles into image arrays
  for (let i = 0; i < roger.right.length; i++) {
    roger.right[i].copy(
      tileSheet,
      i * tileWidth,
      0,
      tileWidth,
      tileHeight,
      0,
      0,
      tileWidth,
      tileHeight
    );
  }

  for (let i = 0; i < roger.left.length; i++) {
    roger.left[i].copy(
      tileSheet,
      i * tileWidth,
      tileHeight + 2,
      tileWidth,
      tileHeight,
      0,
      0,
      tileWidth,
      tileHeight
    );
  }

  for (let i = 0; i < roger.down.length; i++) {
    roger.down[i].copy(
      tileSheet,
      i * tileWidth,
      tileHeight * 2 + 4,
      tileWidth,
      tileHeight,
      0,
      0,
      tileWidth,
      tileHeight
    );
  }

  for (let i = 0; i < roger.up.length; i++) {
    roger.up[i].copy(
      tileSheet,
      i * tileWidth,
      tileHeight * 3 + 6,
      tileWidth,
      tileHeight,
      0,
      0,
      tileWidth,
      tileHeight
    );
  }

  noSmooth();
  frameRate(15);
}

function draw() {
  background(220);
  image(
    roger[roger.currentDirection][roger.currentIndex],
    roger.xPos,
    roger.yPos
  );

  copy(0, 0, 200, 200, 0, 0, 400, 400);
  if (keyIsDown(68)) {
    roger.currentDirection = "right";
    roger.rightIndex += 1;
    if (roger.rightIndex === roger.right.length) {
      roger.rightIndex = 0;
    }
    roger.currentIndex = roger.rightIndex;
    roger.xPos += 2;
    if (roger.xPos >= 200 - tileWidth) {
      roger.xPos = 200 - tileWidth;
    }
  } else if (keyIsDown(87)) {
    // W Key
    roger.currentDirection = "up";
    roger.upIndex += 1;
    if (roger.upIndex === roger.up.length) {
      roger.upIndex = 0;
    }
    roger.currentIndex = roger.upIndex;
    roger.yPos -= 2;
    if (roger.yPos <= 0) {
      roger.yPos = 0;
    }
  } else if (keyIsDown(83)) {
    // S Key
    roger.currentDirection = "down";
    roger.downIndex += 1;
    if (roger.downIndex === roger.down.length) {
      roger.downIndex = 0;
    }
    roger.currentIndex = roger.downIndex;
    roger.yPos += 2;
    if (roger.yPos >= 200 - tileHeight) {
      roger.yPos = 200 - tileHeight;
    }
  } else if (keyIsDown(65)) {
    // A Key
    roger.currentDirection = "left";
    roger.leftIndex += 1;
    if (roger.leftIndex === roger.left.length) {
      roger.leftIndex = 0;
    }
    roger.currentIndex = roger.leftIndex;
    roger.xPos -= 2;
  }
  if (roger.xPos <= 0) {
    roger.xPos = 0;
  }
}
