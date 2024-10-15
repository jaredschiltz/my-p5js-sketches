let ball = [];
let balls = 1000;

function setup() {
  createCanvas(400, 400, WEBGL);
  for(let b = 0; b < balls; b++)
  {
   ball[b] = new Ball(random(-100,100),random(-100,100),random(-100,100),color(random(0,255),random(0,255),random(0,255),255));
  }
}

function draw() {
  background(0);
  stroke(10,10,10);
  noFill();
  rotateX(frameCount*0.01);
  rotateY(frameCount*0.01);
  box(200);
  for(let b = 0; b < balls; b++)
  {
    ball[b].update();
    ball[b].show();
  }
  
}