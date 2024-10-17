let sliderN1;
let sliderN2;
let sliderN3;
let sliderM;
let sliderA;
let sliderB;
let scaler = 70;

function setup() {
  createCanvas(800, 800);
  sliderN1 = createSlider(0, 10, 1);
  sliderN1.position(10, 10);
  sliderN2 = createSlider(0, 10, 1);
  sliderN2.position(10, 30);
  sliderN3 = createSlider(0, 10, 1);
  sliderN3.position(10, 50);
  sliderM = createSlider(0, 20, 0);
  sliderM.position(10, 70);
  sliderA = createSlider(0, 10, 1);
  sliderA.position(10, 90);
  sliderB = createSlider(0, 10, 1);
  sliderB.position(10, 110);
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  stroke(255, 0, 0);
  noFill();
  beginShape();
  for (let theta = 0; theta < TWO_PI; theta += 0.001) {
    let radius = superShape(theta);
    let x = scaler * radius * cos(theta);
    let y = scaler * radius * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function superShape(theta)
{
  let part1 = (1 / sliderA.value()) * cos(theta * sliderM.value() / 4);
  part1 = abs(part1);
  part1 = pow(part1, sliderN2.value());
  let part2 = (1 / sliderB.value()) * sin(theta * sliderM.value() / 4);
  part2 = abs(part2);
  part2 = pow(part2, sliderN3.value());
  let sum = pow((part1 + part2),  1 / sliderN1.value());
  
  if (sum === 0)
    {
      return 0
    }
  else
    {
      return 1 / sum;
    }
  
}

