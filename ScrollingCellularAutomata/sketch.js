let currentColor1
let currentColor2
let ruleSet
let cellArray
let cellArrayRows
let cellArrayCols
const cellSize = 4
let beginIntialization = false

function setup() {
  createCanvas(windowWidth, windowHeight);

  cellArrayRows = floor(windowHeight / cellSize)
  cellArrayCols = floor(windowWidth / cellSize)
  cellArray = new Array(cellArrayRows).fill(0)
  for (let rows = 0; rows < cellArrayRows; rows++) {
    cellArray[rows] = new Array(cellArrayCols).fill(0)
  }

  ruleSet = new Array(8)
  initializeCellArray()
  computeCellArray()
}

function draw() {
  background(0)
  noStroke()
  
  for (let rows = 0; rows < cellArrayRows; rows++)
  {
    for (let cols = 0; cols < cellArrayCols; cols++) {
      if (cellArray[rows][cols] == 1) {
        fill(currentColor1)

      }
      else {
        fill(currentColor2)
      }
      rect(cols * cellSize, rows * cellSize, cellSize, cellSize)
    }
  }

  // Move all the rows up by one row.
  // Instead of using expensive array shift operation, copy 2nd row to 1st row and recompute
  for (let cols = 0; cols < cellArrayCols; cols++) {
    cellArray[0][cols] = cellArray[1][cols]
  }

  if (beginIntialization == true) {
    initializeCellArray()
    beginIntialization = false
  }

  computeCellArray()

}

function computeRule(a, b, c, ruleSet)
{
  // Inputs (a, b, c) are integers representing binary value; i.e., 0 or 1
  // Ruleset is the output associated with each ruleIndex
  inputString = str(a) + str(b) + str(c)
  ruleIndex = int(inputString, 2) // Convert string to decimal representation of binary value
  return ruleSet[ruleIndex]
}

function getRandomColor(colorPalette)
{
  const keys = Object.keys(colorPalette)
  return keys[Math.floor(Math.random() * keys.length)] 
}

function initializeCellArray() {
  currentColor1 = getRandomColor(picoColorPalette)
  currentColor2 = currentColor1
  // Force 2nd color to be different from first color
  while(currentColor2 == currentColor1) {
    currentColor2 = getRandomColor(picoColorPalette)
  }

  // Create Random Rule Set
  for (let i = 0; i < ruleSet.length; i++) {
    ruleSet[i] = Math.round(Math.random()) 
  }
  // console.log(ruleSet)

  // Initialize first row with random values
  for (let cols = 0; cols < cellArrayCols; cols++){
    cellArray[0][cols] = Math.round(Math.random())
  }
}

function computeCellArray()
{
  // Compute the rest of the rows in the cellArray
  for (let rows = 0; rows < cellArrayRows - 1; rows++) { // stop one row from the bottom
    for (let cols = 0; cols < cellArrayCols; cols++) { 
      // Check for edge cases and evaluate separately
      if (cols == 0) { //Left edge, so pull wrap around cell (right-most cell)
        cellArray[rows + 1][0] = computeRule(cellArray[rows][cellArrayCols - 1], 
                                             cellArray[rows][0], cellArray[rows][1], ruleSet)
      }
      else if (cols == cellArrayCols - 1) { //Right edge, so pull wrap around cell (left-most cell)
        cellArray[rows + 1][cellArrayCols - 1] = computeRule(cellArray[rows][cellArrayCols - 2],
                                                             cellArray[rows][cellArrayCols - 1],
                                                             cellArray[rows][0], ruleSet)
      }
      else {
        cellArray[rows + 1][cols] = computeRule(cellArray[rows][cols - 1], cellArray[rows][cols], 
                                                cellArray[rows][cols + 1], ruleSet)
      }
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === 32) {
    beginIntialization = true
  }
}