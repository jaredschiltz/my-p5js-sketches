let endPoint
let numLines = 100
function setup() {
  createCanvas(400, 400);
  endPoint = createVector(width / 2, -100)
}

function draw() {
    background(220);
  stroke(0)
  strokeWeight(2)
  for(let i = 0; i < numLines; i++) {
    line(map(i,0, numLines - 1, -1000, width + 1000), height, endPoint.x, endPoint.y)
  }
  

}