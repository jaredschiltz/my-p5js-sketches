const ROWS = 9;
const COLS = 9;
const BOXES = 9;
let cellArray;
let start_puzzle = [
  [6, 0, 0, 5, 7, 0, 0, 0, 0],
  [8, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 4],
  [0, 3, 0, 6, 0, 0, 0, 7, 0],
  [0, 0, 0, 0, 0, 1, 8, 0, 0],
  [0, 0, 7, 0, 9, 8, 0, 5, 0],
  [0, 1, 0, 0, 0, 0, 6, 0, 0],
  [0, 8, 6, 9, 1, 2, 0, 0, 0],
  [0, 2, 0, 0, 0, 4, 0, 0, 1],
];

function setup() {
  createCanvas(540, 540);
  cellArray = [];
  // Box 0
  cellArray.push(new Cell(0, 0, 0));
  cellArray.push(new Cell(1, 0, 0));
  cellArray.push(new Cell(2, 0, 0));
  cellArray.push(new Cell(0, 1, 0));
  cellArray.push(new Cell(1, 1, 0));
  cellArray.push(new Cell(2, 1, 0));
  cellArray.push(new Cell(0, 2, 0));
  cellArray.push(new Cell(1, 2, 0));
  cellArray.push(new Cell(2, 2, 0));
  // Box 1
  cellArray.push(new Cell(3, 0, 1));
  cellArray.push(new Cell(4, 0, 1));
  cellArray.push(new Cell(5, 0, 1));
  cellArray.push(new Cell(3, 1, 1));
  cellArray.push(new Cell(4, 1, 1));
  cellArray.push(new Cell(5, 1, 1));
  cellArray.push(new Cell(3, 2, 1));
  cellArray.push(new Cell(4, 2, 1));
  cellArray.push(new Cell(5, 2, 1));
  // Box 2
  cellArray.push(new Cell(6, 0, 2));
  cellArray.push(new Cell(7, 0, 2));
  cellArray.push(new Cell(8, 0, 2));
  cellArray.push(new Cell(6, 1, 2));
  cellArray.push(new Cell(7, 1, 2));
  cellArray.push(new Cell(8, 1, 2));
  cellArray.push(new Cell(6, 2, 2));
  cellArray.push(new Cell(7, 2, 2));
  cellArray.push(new Cell(8, 2, 2));

  // Box 3
  cellArray.push(new Cell(0, 3, 3));
  cellArray.push(new Cell(1, 3, 3));
  cellArray.push(new Cell(2, 3, 3));
  cellArray.push(new Cell(0, 4, 3));
  cellArray.push(new Cell(1, 4, 3));
  cellArray.push(new Cell(2, 4, 3));
  cellArray.push(new Cell(0, 5, 3));
  cellArray.push(new Cell(1, 5, 3));
  cellArray.push(new Cell(2, 5, 3));
  // Box 4
  cellArray.push(new Cell(3, 3, 4));
  cellArray.push(new Cell(4, 3, 4));
  cellArray.push(new Cell(5, 3, 4));
  cellArray.push(new Cell(3, 4, 4));
  cellArray.push(new Cell(4, 4, 4));
  cellArray.push(new Cell(5, 4, 4));
  cellArray.push(new Cell(3, 5, 4));
  cellArray.push(new Cell(4, 5, 4));
  cellArray.push(new Cell(5, 5, 4));
  // Box 5
  cellArray.push(new Cell(6, 3, 5));
  cellArray.push(new Cell(7, 3, 5));
  cellArray.push(new Cell(8, 3, 5));
  cellArray.push(new Cell(6, 4, 5));
  cellArray.push(new Cell(7, 4, 5));
  cellArray.push(new Cell(8, 4, 5));
  cellArray.push(new Cell(6, 5, 5));
  cellArray.push(new Cell(7, 5, 5));
  cellArray.push(new Cell(8, 5, 5));

  // Box 6
  cellArray.push(new Cell(0, 6, 6));
  cellArray.push(new Cell(1, 6, 6));
  cellArray.push(new Cell(2, 6, 6));
  cellArray.push(new Cell(0, 7, 6));
  cellArray.push(new Cell(1, 7, 6));
  cellArray.push(new Cell(2, 7, 6));
  cellArray.push(new Cell(0, 8, 6));
  cellArray.push(new Cell(1, 8, 6));
  cellArray.push(new Cell(2, 8, 6));
  // Box 7
  cellArray.push(new Cell(3, 6, 7));
  cellArray.push(new Cell(4, 6, 7));
  cellArray.push(new Cell(5, 6, 7));
  cellArray.push(new Cell(3, 7, 7));
  cellArray.push(new Cell(4, 7, 7));
  cellArray.push(new Cell(5, 7, 7));
  cellArray.push(new Cell(3, 8, 7));
  cellArray.push(new Cell(4, 8, 7));
  cellArray.push(new Cell(5, 8, 7));
  // Box 8
  cellArray.push(new Cell(6, 6, 8));
  cellArray.push(new Cell(7, 6, 8));
  cellArray.push(new Cell(8, 6, 8));
  cellArray.push(new Cell(6, 7, 8));
  cellArray.push(new Cell(7, 7, 8));
  cellArray.push(new Cell(8, 7, 8));
  cellArray.push(new Cell(6, 8, 8));
  cellArray.push(new Cell(7, 8, 8));
  cellArray.push(new Cell(8, 8, 8));
  initializeBoard();
  noLoop();
}

function compareArrays(firstArray, secondArray) {
  for (let c = 0; c < firstArray.length; c++) {
    for (let i = 1; i < 10; i++) {
      if (firstArray[c].values[i] != secondArray[c].values[i]) {
        return false;
      }
    }
  }
  return true;
}

function copyArray(cellArray) {
  let newArray = [];
  // Box 0
  newArray.push(new Cell(0, 0, 0));
  newArray.push(new Cell(1, 0, 0));
  newArray.push(new Cell(2, 0, 0));
  newArray.push(new Cell(0, 1, 0));
  newArray.push(new Cell(1, 1, 0));
  newArray.push(new Cell(2, 1, 0));
  newArray.push(new Cell(0, 2, 0));
  newArray.push(new Cell(1, 2, 0));
  newArray.push(new Cell(2, 2, 0));
  // Box 1
  newArray.push(new Cell(3, 0, 1));
  newArray.push(new Cell(4, 0, 1));
  newArray.push(new Cell(5, 0, 1));
  newArray.push(new Cell(3, 1, 1));
  newArray.push(new Cell(4, 1, 1));
  newArray.push(new Cell(5, 1, 1));
  newArray.push(new Cell(3, 2, 1));
  newArray.push(new Cell(4, 2, 1));
  newArray.push(new Cell(5, 2, 1));
  // Box 2
  newArray.push(new Cell(6, 0, 2));
  newArray.push(new Cell(7, 0, 2));
  newArray.push(new Cell(8, 0, 2));
  newArray.push(new Cell(6, 1, 2));
  newArray.push(new Cell(7, 1, 2));
  newArray.push(new Cell(8, 1, 2));
  newArray.push(new Cell(6, 2, 2));
  newArray.push(new Cell(7, 2, 2));
  newArray.push(new Cell(8, 2, 2));

  // Box 3
  newArray.push(new Cell(0, 3, 3));
  newArray.push(new Cell(1, 3, 3));
  newArray.push(new Cell(2, 3, 3));
  newArray.push(new Cell(0, 4, 3));
  newArray.push(new Cell(1, 4, 3));
  newArray.push(new Cell(2, 4, 3));
  newArray.push(new Cell(0, 5, 3));
  newArray.push(new Cell(1, 5, 3));
  newArray.push(new Cell(2, 5, 3));
  // Box 4
  newArray.push(new Cell(3, 3, 4));
  newArray.push(new Cell(4, 3, 4));
  newArray.push(new Cell(5, 3, 4));
  newArray.push(new Cell(3, 4, 4));
  newArray.push(new Cell(4, 4, 4));
  newArray.push(new Cell(5, 4, 4));
  newArray.push(new Cell(3, 5, 4));
  newArray.push(new Cell(4, 5, 4));
  newArray.push(new Cell(5, 5, 4));
  // Box 5
  newArray.push(new Cell(6, 3, 5));
  newArray.push(new Cell(7, 3, 5));
  newArray.push(new Cell(8, 3, 5));
  newArray.push(new Cell(6, 4, 5));
  newArray.push(new Cell(7, 4, 5));
  newArray.push(new Cell(8, 4, 5));
  newArray.push(new Cell(6, 5, 5));
  newArray.push(new Cell(7, 5, 5));
  newArray.push(new Cell(8, 5, 5));

  // Box 6
  newArray.push(new Cell(0, 6, 6));
  newArray.push(new Cell(1, 6, 6));
  newArray.push(new Cell(2, 6, 6));
  newArray.push(new Cell(0, 7, 6));
  newArray.push(new Cell(1, 7, 6));
  newArray.push(new Cell(2, 7, 6));
  newArray.push(new Cell(0, 8, 6));
  newArray.push(new Cell(1, 8, 6));
  newArray.push(new Cell(2, 8, 6));
  // Box 7
  newArray.push(new Cell(3, 6, 7));
  newArray.push(new Cell(4, 6, 7));
  newArray.push(new Cell(5, 6, 7));
  newArray.push(new Cell(3, 7, 7));
  newArray.push(new Cell(4, 7, 7));
  newArray.push(new Cell(5, 7, 7));
  newArray.push(new Cell(3, 8, 7));
  newArray.push(new Cell(4, 8, 7));
  newArray.push(new Cell(5, 8, 7));
  // Box 8
  newArray.push(new Cell(6, 6, 8));
  newArray.push(new Cell(7, 6, 8));
  newArray.push(new Cell(8, 6, 8));
  newArray.push(new Cell(6, 7, 8));
  newArray.push(new Cell(7, 7, 8));
  newArray.push(new Cell(8, 7, 8));
  newArray.push(new Cell(6, 8, 8));
  newArray.push(new Cell(7, 8, 8));
  newArray.push(new Cell(8, 8, 8));

  for (let c = 0; c < cellArray.length; c++) {
    for (let i = 1; i < 10; i++) {
      newArray[c].values[i] = cellArray[c].values[i];
    }
  }
  return newArray;
}

function draw() {
  background(220);
  solver();
  solver();
  solver();
  cellArray[31].values[5] = false;
  solver();
  solver();
  cellArray[11].values[3] = false;
  solver();
  cellArray[16].values[2] = false;
  cellArray[16].values[3] = false;
  cellArray[16].values[6] = false;
  solver();
  cellArray[39].values[2] = false;
  cellArray[39].values[3] = false;
  cellArray[39].values[4] = false;
  solver();
  cellArray[40].values[4] = false;
  cellArray[40].values[2] = false;
  solver();
  solver();
  cellArray[65].values[3] = false;
  solver();
  
  // Guess 5 middle of box 0
  cellArray[4].values[7] = false;
  solver()
  solver()
  // Guess 4 top middle of box 4
  cellArray[37].values[2] = false;
  solver()
  solver()
  solver()
  
  // Guess 8 top left corner of box 7
  cellArray[63].values[3] = false;
  solver()
  solver()
  solver()
  // Guess 9 in bottom left corner of box 6
  cellArray[60].values[7] = false;
  solver()
  solver()
  //Guess 4 in left box 8
  cellArray[75].values[3] = false;
  solver()
  solver()
  solver()
  let newArray = copyArray(cellArray);
  solver()
  print(compareArrays(newArray, cellArray));


  drawBoard();
}

function initializeBoard() {
  for (let cell of cellArray) {
    if (start_puzzle[cell.row][cell.col] != 0) {
      for (i = 1; i < 10; i++) {
        cell.values[i] = false;
      }
      cell.values[start_puzzle[cell.row][cell.col]] = true;
      cell.num_values = 1;
    }
  }
}

function drawBoard() {
  strokeWeight(1);
  fill(220);
  let boxWidth = floor(width / 9);
  let boxHeight = floor(height / 9);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      rect(boxWidth * row, boxHeight * col, boxWidth, boxHeight);
    }
  }
  // Draw Dividers
  strokeWeight(3);
  line(boxWidth * 3, 0, boxWidth * 3, height);
  line(boxWidth * 6, 0, boxWidth * 6, height);
  line(0, boxHeight * 3, width, boxHeight * 3);
  line(0, boxHeight * 6, width, boxHeight * 6);
  // Draw Possibilities
  textSize(15);
  fill(0);
  strokeWeight(1);
  textAlign(LEFT);

  for (let cell of cellArray) {
    let valueString = "";
    for (let i = 1; i < 10; i++) {
      if (cell.values[i] == true) {
        valueString += str(i) + " ";
      } else {
        valueString += " " + " ";
      }
    }
    let stringLine1 = valueString.slice(0, 5);
    let stringLine2 = valueString.slice(6, 11);
    let stringLine3 = valueString.slice(12, 17);

    text(stringLine1, 10 + boxWidth * cell.col, 15 + boxHeight * cell.row);

    text(stringLine2, 10 + boxWidth * cell.col, 35 + boxHeight * cell.row);

    text(stringLine3, 10 + boxWidth * cell.col, 55 + boxHeight * cell.row);
  }
}

// Recalculate the number of valid values in each cell
function updateNumValues() {
  for (let cell of cellArray) {
    let trueCount = 0;
    for (i = 1; i < 10; i++) {
      if (cell.values[i] == true) {
        trueCount++;
      }
    }
    cell.num_values = trueCount;
  }
}

function solver() {
  // Box elimination
  for (let b = 0; b < BOXES; b++) {
    // Get all numbers with entropy of 0
    let numbers = [];
    for (let cell of cellArray) {
      if (cell.box == b && cell.num_values == 1) {
        for (let i = 1; i < 10; i++) {
          if (cell.values[i] == true) {
            numbers.push(i);
          }
        }
      }
    }
    // Eliminate all numbers in box using numbers that have been solved
    for (let cell of cellArray) {
      if (cell.box == b && cell.num_values != 1) {
        for (let i = 1; i < 10; i++) {
          for (let n of numbers) {
            if (i == n) {
              cell.values[i] = false;
            }
          }
        }
      }
    }
  }

  updateNumValues();

  // Row elimination
  for (let r = 0; r < ROWS; r++) {
    // Get all numbers with entropy of 0
    let numbers = [];
    for (let cell of cellArray) {
      if (cell.row == r && cell.num_values == 1) {
        for (let i = 1; i < 10; i++) {
          if (cell.values[i] == true) {
            numbers.push(i);
          }
        }
      }
    }
    // Eliminate all numbers in row using numbers that have been solved
    for (let cell of cellArray) {
      if (cell.row == r && cell.num_values != 1) {
        for (let i = 1; i < 10; i++) {
          for (let n of numbers) {
            if (i == n) {
              cell.values[i] = false;
            }
          }
        }
      }
    }
  }

  updateNumValues();

  // Column elimination
  for (let c = 0; c < COLS; c++) {
    // Get all numbers with entropy of 0
    let numbers = [];
    for (let cell of cellArray) {
      if (cell.col == c && cell.num_values == 1) {
        for (let i = 1; i < 10; i++) {
          if (cell.values[i] == true) {
            numbers.push(i);
          }
        }
      }
    }

    // Eliminate all numbers in column using numbers that have been solved
    for (let cell of cellArray) {
      if (cell.col == c && cell.num_values != 1) {
        for (let i = 1; i < 10; i++) {
          for (let n of numbers) {
            if (i == n) {
              cell.values[i] = false;
            }
          }
        }
      }
    }
  }

  updateNumValues();
}
