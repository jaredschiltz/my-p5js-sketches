let lineArray

function setup() {
  createCanvas(400, 400);
  lineArray = new Array(10)

  for (let i = 0; i < lineArray.length; i++) {
    console.log(i)
    lineArray[i] = createVector(width/11 * (i + 1), 50)
  }
  
}

function draw() {
  background(220);
  stroke(0)
  strokeWeight(2)

  for (let i = 0; i < lineArray.length; i++) {
    line(lineArray[i].x, lineArray[i].y, mouseX, mouseY)
  }
  
}