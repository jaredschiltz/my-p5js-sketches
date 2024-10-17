let radius1Slider;
let radius2Slider;
let mSlider;
let n1Slider;
let n2Slider;
let n3Slider;

function setup() {
  createCanvas(400, 400);
  radius1Slider = createSlider(1, 5, 1, 0.001);
  radius1Slider.position(10, 10);
  radius1Slider.style('width', '80px');
  
  radius2Slider = createSlider(1, 5, 1, 0.001);
  radius2Slider.position(10, 30);
  radius2Slider.style('width', '80px');
  
  mSlider = createSlider(1, 16, 1, 0.001);
  mSlider.position(10, 50);
  mSlider.style('width', '80px');
  
  n1Slider = createSlider(1, 16, 1, 0.001);
  n1Slider.position(10, 70);
  n1Slider.style('width', '80px');
  
  n2Slider = createSlider(1, 16, 1, 0.001);
  n2Slider.position(10, 90);
  n2Slider.style('width', '80px');
  
  n3Slider = createSlider(1, 16, 1, 0.001);
  n3Slider.position(10, 110);
  n3Slider.style('width', '80px');
  
}

function draw() {
  background(220);
  let radius1 = radius1Slider.value();
  let radius2 = radius2Slider.value();
  let m = mSlider.value();
  let n1 = n1Slider.value();
  let n2 = n2Slider.value();
  let n3 = n3Slider.value();
  
  drawSuperFormula(radius1, radius2, m, n1, n2, n3);
}

function drawSuperFormula(a, b, m, n1, n2, n3)
{
  fill(255,0,0)
  strokeWeight(4);
  stroke(0);
  push();
  translate(width/2,height/2)
  beginShape();
  for(let theta = 0; theta <= TWO_PI; theta = theta + 0.0001)
    { let radius = superFormula(theta, a, b, m, n1, n2, n3);
      vertex(radius * cos(theta), radius * sin(theta))
    }
  endShape(CLOSE);
  pop();
}

function superFormula(theta, a, b, m, n1, n2, n3)
{
  // This is generalization of the superellipse
  // return radius
  let cosTerm = abs(1 / a * cos(m * theta / 4)) ** n2;
  let sinTerm = abs(1 / b * sin(m * theta / 4)) ** n3;
  let radius = (cosTerm + sinTerm) ** (-1 / n1);
  return radius;
}