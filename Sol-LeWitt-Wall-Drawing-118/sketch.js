const numPoints = 30
let pointArray

function setup() {
  createCanvas(600, 600);
  pointArray = new Array(numPoints)
  // Create point array
  for (let i = 0; i < pointArray.length; i++) {
    pointArray[i] = createVector(random(0, width), random(0, height))
  }
  noLoop()
}

function draw() {
  background(120);
  
  // Draw lines
  // Lazy approach; will get duplicates
  stroke(0);
  for (let i = 0; i < numPoints; i++) {
    for (let j = 0; j < numPoints; j++) {
      line(pointArray[i].x, pointArray[i].y, pointArray[j].x, pointArray[j].y)
    }
  }
  
  // Draw Points
  fill(255)
  noStroke()
  for (const point in pointArray) {
    circle(pointArray[point].x, pointArray[point].y, 5)
  }
}