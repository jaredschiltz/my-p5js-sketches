const xOffset = 150
const yOffset = 30

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  stroke(0)
  strokeWeight(6)
  noFill()
  // J Character
  line(xOffset - 40, yOffset, xOffset + 40, yOffset)
  line(xOffset,yOffset,xOffset,300 + yOffset)
  arc(xOffset - 40,300 + yOffset,80,80,0, PI)
  // S Character
  arc(xOffset + 150 - 40,300 + yOffset,80,80,0, PI)
  arc(xOffset + 150 - 40,40 + yOffset,80,80,PI, 2*PI)
  line(xOffset + 150 - 80, 40 + yOffset, xOffset + 150, 300 + yOffset)
}