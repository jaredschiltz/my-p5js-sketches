let countValue = 5
let count = 0
let lineArray

function setup() {
  createCanvas(400, 400);
  lineArray = new Array(width)
  for (let i = 0; i < lineArray.length; i++) {
    lineArray[i] = height/2
  }
    stroke(0)
  strokeWeight(2)
}

function draw() {
  background(220);
  lineArray.shift()
  count++
  if (count == countValue) { // Event happens
    countValue = int(random(5,100))
    count = 0  
    lineArray.push(height/2 - height/8)
  }
  else {
    lineArray.push(height/2)
  }
  
  for (let i = 0; i < lineArray.length - 1; i++) {
    line(i, lineArray[i], i+1, lineArray[i+1])
  }
}