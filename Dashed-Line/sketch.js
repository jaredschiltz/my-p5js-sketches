let lineEndPoint
let mouseVector
let lineVector
let dashVectorCurrent
let dashVectorNext
let dashLength = 10; // Ten pixels
let dash = true

function setup() {
  createCanvas(400, 400);
  lineEndPoint = createVector(width/2, height/2)
  mouseVector = createVector(mouseX, mouseY)
  lineVector = createVector(0,0)
  dashVectorCurrent = createVector(0,0)
  dashVectorNext = createVector(0,0)
}

function draw() {
  background(220)
  stroke(0)
  strokeWeight(2)
  mouseVector.x = mouseX
  mouseVector.y = mouseY
  
  line(0, 0, lineEndPoint.x, lineEndPoint.y)
  line(0, 0, mouseVector.x, mouseVector.y)
  lineVector.x = mouseVector.x - lineEndPoint.x
  lineVector.y = mouseVector.y - lineEndPoint.y
  lineVector.normalize()
  translate(width/2,height/2)
  let distance = dist(mouseVector.x, mouseVector.y, lineEndPoint.x, lineEndPoint.y)
  
  dashVectorCurrent.x = 0
  dashVectorCurrent.y = 0

  dash  = true
  
  for (let i = 0; i < distance / dashLength - 1; i++) {

    if (dash) {
      stroke(255,0,0)
    }
    else {
      noStroke()
    }
    dash = !dash
    strokeWeight(3)
    dashVectorNext.x = dashVectorCurrent.x + lineVector.x * dashLength
    dashVectorNext.y = dashVectorCurrent.y + lineVector.y * dashLength
    line(dashVectorCurrent.x, dashVectorCurrent.y, dashVectorNext.x, dashVectorNext.y)
    dashVectorCurrent.x = dashVectorNext.x
    dashVectorCurrent.y = dashVectorNext.y
  }
  

}
