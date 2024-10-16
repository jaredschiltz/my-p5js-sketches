let angle_speed = 0.001
let angle=0
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  ellipseMode(CENTER)
  rectMode(CENTER)
  translate(width/2,height/2)
  noStroke()
  fill(255,196,70)
  circle(0,0,50)
  rotate(angle)
  translate(125,0)

  push()
    fill(69,52,198)
  rotate(angle*2)
  rect(0,0,20,20)
  pop()
    rotate(angle*1.5)
    translate(40,0)
  push()
  fill(100)
  rotate(angle*4)
  rect(0,0,10,10)
  pop()
  angle += angle_speed * deltaTime
  /*
  rotate(frameCount/5)
  translate(40,0)
  fill(100)
  circle(0,0,10)
  */
}