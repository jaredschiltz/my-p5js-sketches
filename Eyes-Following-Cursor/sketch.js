let eye1
let eye2
let eye1Mouse
let eye2Mouse
let pupilRadius = 30

function setup() {
  createCanvas(400, 400);
  eye1 = createVector(width/3, height/2)
  eye2 = createVector(width * 2/3 , height/2)
  eye1Mouse = createVector(0,0)
  eye2Mouse = createVector(0,0)
}

function draw() {
  background(100);
  eye1Mouse.x = mouseX - eye1.x
  eye1Mouse.y = mouseY - eye1.y
  eye1Mouse.normalize()
  eye1Mouse.mult(pupilRadius)
  
  eye2Mouse.x = mouseX - eye2.x
  eye2Mouse.y = mouseY - eye2.y
  eye2Mouse.normalize()
  eye2Mouse.mult(pupilRadius)
  
  fill(255)
  noStroke()
  circle(eye1.x,eye1.y,100)
  circle(eye2.x,eye2.y,100)
  //stroke(0)
  //line(eye1.x, eye1.y,eye1.x + eye1Mouse.x, eye1.y + eye1Mouse.y)
  //line(eye2.x, eye2.y,eye2.x + eye2Mouse.x, eye2.y + eye2Mouse.y)
  fill(0)
  circle(eye1.x + eye1Mouse.x, eye1.y + eye1Mouse.y,30)
  circle(eye2.x + eye2Mouse.x, eye2.y + eye2Mouse.y,30)
  fill(255)
  circle(eye1.x + eye1Mouse.x + 5, eye1.y + eye1Mouse.y - 5,5)
  circle(eye2.x + eye2Mouse.x + 5, eye2.y + eye2Mouse.y -5 ,5)
  
  //circle(0,30,30)

}