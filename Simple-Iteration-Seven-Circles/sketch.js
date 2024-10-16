const numCircles = 7;
const leftRightMarginSpacing = 30;
let circleDiameter = 28;
let circleSpacing;

function setup() {
  createCanvas(400, 400);
  let circleSpace = (width - 2 * leftRightMarginSpacing);
  circleSpacing = (circleSpace - numCircles * circleDiameter) / (numCircles - 1);
  noLoop();
}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(2)
  fill(150);
  for(let i = 0; i < numCircles; i++) {
    circle(leftRightMarginSpacing + circleDiameter / 2 + i * (circleDiameter + circleSpacing), height/ 2, circleDiameter)
  }
 // line(0,200,leftRightMarginSpacing,200)
//  line(width,200,width - leftRightMarginSpacing,200)
}