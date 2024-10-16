const canvasSize = 400;
const tileSize = 20;
let rows;
let cols;
let color1;
let color2;
let tileNum = 1;

let tileArray;

function setup() {
  createCanvas(canvasSize, canvasSize);
  rows = cols = canvasSize / tileSize;
  tileArray = new Array(rows);

  for (let i = 0; i < rows; i++) {
    tileArray[i] = new Array(cols);
  }

  tileArray[0][0] = floor(random(1, 5));

  // Generate First Row
  for (let i = 1; i < cols; i++) {
    let leftTile = tileArray[0][i - 1];
    let currentTile;
    switch (leftTile) {
      case 1:
        currentTile = [2, 3];
        tileArray[0][i] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
      case 2:
        currentTile = [1, 4];
        tileArray[0][i] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
      case 3:
        currentTile = [1, 4];
        tileArray[0][i] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
      case 4:
        currentTile = [2, 3];
        tileArray[0][i] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
    }
  }

  // Generate First Column
  for (let i = 1; i < rows; i++) {
    let upTile = tileArray[i - 1][0];
    let currentTile;
    switch (upTile) {
      case 1:
        currentTile = [2, 3];
        tileArray[i][0] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
      case 2:
        currentTile = [1, 4];
        tileArray[i][0] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
      case 3:
        currentTile = [1, 4];
        tileArray[i][0] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
      case 4:
        currentTile = [2, 3];
        tileArray[i][0] =
          currentTile[Math.floor(Math.random() * currentTile.length)];
        break;
    }
  }

  // Generate the rest
  for (let j = 1; j < cols; j++) {
    for (let i = 1; i < rows; i++) {
      let upTile = tileArray[i - 1][j];
      let currentTile;
      switch (upTile) {
        case 1:
          currentTile = [2, 3];
          tileArray[i][j] =
            currentTile[Math.floor(Math.random() * currentTile.length)];
          break;
        case 2:
          currentTile = [1, 4];
          tileArray[i][j] =
            currentTile[Math.floor(Math.random() * currentTile.length)];
          break;
        case 3:
          currentTile = [1, 4];
          tileArray[i][j] =
            currentTile[Math.floor(Math.random() * currentTile.length)];
          break;
        case 4:
          currentTile = [2, 3];
          tileArray[i][j] =
            currentTile[Math.floor(Math.random() * currentTile.length)];
          break;
      }
    }
  }

  color1 = color(255, 0, 0);
  color2 = color(0);
  noLoop();
}

function draw() {
  background(220);
  // Draw first row
  push();
  for (let i = 0; i < cols; i++) {
    drawTile(tileArray[0][i]);
    translate(tileSize, 0);
  }
  pop();

  // Draw first column
  push();
  translate(0, tileSize);
  for (let i = 1; i < rows; i++) {
    drawTile(tileArray[i][0]);
    translate(0, tileSize);
  }
  pop();

  // Draw the rest
  push();
  translate(tileSize, tileSize);
  for (let j = 1; j < cols; j++) {
    push();
    for (let i = 1; i < rows; i++) {
      drawTile(tileArray[i][j]);
      translate(0, tileSize);
    }
    pop();
    translate(tileSize, 0);
  }

  pop();
}

function drawTile(tileNum) {
  noStroke();
  switch (tileNum) {
    case 1:
      fill(color2);
      rect(0, 0, tileSize, tileSize);
      fill(color1);
      arc(0, tileSize, tileSize, tileSize, (3 / 2) * PI, TWO_PI);
      arc(tileSize, 0, tileSize, tileSize, PI / 2, PI);
      break;

    case 2:
      fill(color1);
      rect(0, 0, tileSize, tileSize);
      fill(color2);
      arc(0, tileSize, tileSize, tileSize, (3 / 2) * PI, TWO_PI);
      arc(tileSize, 0, tileSize, tileSize, PI / 2, PI);
      break;

    case 3:
      fill(color2);
      rect(0, 0, tileSize, tileSize);
      fill(color1);
      arc(0, 0, tileSize, tileSize, 0, PI / 2);
      arc(tileSize, tileSize, tileSize, tileSize, PI, (3 / 2) * PI);
      break;

    case 4:
      fill(color1);
      rect(0, 0, tileSize, tileSize);
      fill(color2);
      arc(0, 0, tileSize, tileSize, 0, PI / 2);
      arc(tileSize, tileSize, tileSize, tileSize, PI, (3 / 2) * PI);
      break;

    default:
      fill(color2);
      rect(0, 0, tileSize, tileSize);
      fill(color1);
      arc(0, tileSize, tileSize, tileSize, (3 / 2) * PI, TWO_PI);
      arc(tileSize, 0, tileSize, tileSize, PI / 2, PI);
      break;
  }
}
