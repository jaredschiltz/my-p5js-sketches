// Observe that BezierPoint does not return evenly spaced points.
// Have to do some math to do this (see Andrew Glasser's papers)
let x1 = 85,
  x2 = 10,
  x3 = 90,
  x4 = 15;
let y1 = 20,
  y2 = 10,
  y3 = 90,
  y4 = 80;

let first_anchor;
let second_anchor;
let first_control;
let second_control;

function setup() {
  createCanvas(400, 400);
  first_anchor = createVector(0, 0);
  second_anchor = createVector(width, height);
  first_control = createVector(300, 20);
  second_control = createVector(width - 300, height - 20);
  noLoop();
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  strokeWeight(2);
  bezier(
    first_anchor.x,
    first_anchor.y,
    first_control.x,
    first_control.y,
    second_control.x,
    second_control.y,
    second_anchor.x,
    second_anchor.y
  );
  /*
  fill(255,0,0)
  ellipse(first_anchor.x, first_anchor.y,10)
  fill(0,255,0)
  ellipse(second_anchor.x, second_anchor.y,10)
  
    fill(0,255,255)
  ellipse(first_control.x, first_control.y,10)
    
    fill(0,0,255)
  ellipse(second_control.x, second_control.y,10)
  */

  // Find all points along curve
  noStroke();
  fill(255, 0, 0);
  let steps = 30;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = bezierPoint(
      first_anchor.x,
      first_control.x,
      second_control.x,
      second_anchor.x,
      t
    );
    
        let y = bezierPoint(
      first_anchor.y,
      first_control.y,
      second_control.y,
      second_anchor.y,
      t
    );
    ellipse(x,y,5)
  }
}
