const ROWS = 60
const COLS = 60
let horizontalSpacing
let verticalSpacing
let horizontalRandomArray = []
let verticalRandomArray = []
let backgroundColor
let lineColor 

function setup() {
  createCanvas(600, 600);
  noLoop();
  strokeCap(SQUARE)
  horizontalSpacing = width / (COLS - 1);
  verticalSpacing = height / (ROWS - 1);
  for (let i = 0; i < COLS; i++){
    horizontalRandomArray[i] = round(random())
  }
  for (let i = 0; i < ROWS; i++){
    verticalRandomArray[i] = round(random())
  }
  backgroundColor = color(220, 220, 220)
  lineColor = color(0, 0, 0)
}

function draw() {
  background(backgroundColor);
  strokeWeight(1)
  
  // Draw Columns
  for (let col = 0; col < COLS; col++) {
    let currentColor = horizontalRandomArray[col]
    //let currentColor = 1
    stroke(getColor(currentColor));
    for (let row = 0; row < ROWS; row++) {
      line(horizontalSpacing * col, 
           verticalSpacing * row, 
           horizontalSpacing * col, 
           verticalSpacing * (row + 1))
      if (currentColor == 1) {
        currentColor = 0
      }
      else {
        currentColor = 1
      }
      stroke(getColor(currentColor));
    }
  }
  
  // Draw Rows
  for (let row = 0; row < ROWS; row++) {
    let currentColor = verticalRandomArray[row]
    //let currentColor = 1
    stroke(getColor(currentColor));
    for (let col = 0; col < COLS; col++) {
      line(horizontalSpacing * col,
           verticalSpacing * row, 
           horizontalSpacing * (col + 1), 
           verticalSpacing * row 
           )
      if (currentColor == 1) {
        currentColor = 0
      }
      else {
        currentColor = 1
      }
      stroke(getColor(currentColor));
    }
  }
  
}

function getColor(select) {
  if (select == 0) {
    return backgroundColor;
  }
  else {
    return lineColor;
  }
}