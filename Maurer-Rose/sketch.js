let n = 6;
let d = 71;
let dslider;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  dSlider = createSlider(1, 180, 1);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  stroke(255,255,0);
  d = dSlider.value();
  
  noFill();
  beginShape();
  for(let i = 0; i < 361; i++)
  {
      let k = i * d;
      let r = 150*sin(n*k);
      let x = r * cos(k);
      let y = r * sin(k);
      vertex(x,y);
  }
  endShape();
}