let sliderN;
let sliderA;
let sliderB;

function setup() {
  createCanvas(400, 400);
  sliderN = createSlider(0, 10, 2, 0.01);
  sliderN.position(10, 10);
  sliderA = createSlider(1, 255, 70);
  sliderA.position(10, 30);
  sliderB = createSlider(1, 255, 70);
  sliderB.position(10, 50);
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  stroke(255, 0, 0);
  noFill();
  beginShape();
  let radius = 30;
  for (let theta = 0; theta < TWO_PI; theta += 0.1) {
    let x = pow(abs(cos(theta)), 2 / sliderN.value()) *
        sliderA.value() * sgn(cos(theta));
    let y = pow(abs(sin(theta)), 2 / sliderN.value()) * 
        sliderB.value() * sgn(sin(theta));
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(t) {
  if (t < 0) {
    return -1;
  } else if (t > 0) {
    return 1;
  } else {
    return 0;
  }
}
