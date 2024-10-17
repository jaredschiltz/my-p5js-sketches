let posVector
let xoff = 0.0
let yoff = 0.1
let roff = 0.7

function setup() {
  createCanvas(400, 400);
  posVector = createVector(width/2,height/2)
  background(220);
  fill(255,0,0,5)
  noStroke()
}

function draw() {

  xoff = xoff + 0.001
  yoff = yoff + 0.002
  roff = roff + 0.01
  let x = map(noise(xoff), 0, 1, -1, 1)
  let y = map(noise(yoff), 0, 1, -1, 1)
  let r = map(noise(roff), 0, 1, 1, 50)
  posVector.x += x
  posVector.y += y
  circle(posVector.x, posVector.y,r)

}
