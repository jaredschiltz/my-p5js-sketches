// Use Sol Lewitts's Wall Procedural Instructions #33

const cellSize = 10
let horizontalCells
let verticalCells

function setup() {
  createCanvas(600, 400);
  horizontalCells = width / cellSize
  verticalCells = height / cellSize
  noLoop()
}

function draw() {
  const bgColor = color(180)
  background(20);
  const outlineColor = color(bgColor)
  const fillColor = color(bgColor)
  const lineColors = [color(0), color(255,255,0), color(255,0,255), color(0,0,255)]
  for (let i = 0; i < verticalCells; i++) {
    for (let j = 0; j < horizontalCells; j++) {
      push()
      translate(j * cellSize, i * cellSize)
      let lineColorSelection = lineColors[Math.floor(Math.random() * lineColors.length)]
      drawCell(outlineColor, fillColor, lineColorSelection, cellSize, cellSize)
      pop()
    }
  }
  /*
  drawCell(outlineColor, fillColor, lineColor, 20, 20)
  translate(20, 0)
   drawCell(outlineColor, fillColor, lineColor, 20, 20)
  */
  
  
}

function drawCell(outlineColor, fillColor, lineColor, cellWidth, cellHeight)
{
  let orientation = ["vert", "horiz", "backslash", "forwardslash"]
  let orientationSelection = orientation[Math.floor(Math.random() * orientation.length)]
  /*
  stroke(outlineColor)
  strokeWeight(1)
  */
  noStroke()
  fill(fillColor)
  rect(0,0,cellWidth,cellHeight)
  strokeWeight(2)
  stroke(lineColor)
  
  
  //Draw based on selected orientation
  switch (orientationSelection) {
    case "vert":
      line(cellWidth / 2, 0, cellWidth / 2, cellHeight)
      break
    case "horiz":
      line(0, cellHeight / 2, cellWidth, cellHeight / 2)
      break
    case "backslash":
      line(0,0,cellWidth, cellHeight)
      break
    case "forwardslash":
      line(0,cellHeight,cellWidth, 0)
      break
    default:
      console.log("not a valid orientation")
      
  }
  
}