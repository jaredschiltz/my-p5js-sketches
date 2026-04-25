let vertex_vector;
let chua;
let amplitude;

let t = 0;
let slider_m0;
let slider_m1;

function setup() {
  createCanvas(1000, 400);
  slider_m0 = createSlider(0, 1000, 500);
  slider_m0.position(0, 0);
  slider_m0.size(80);
  slider_m1 = createSlider(0, 1000, 500);
  slider_m1.position(0, 20);
  slider_m1.size(80);

  amplitude = height / 8;
  chua = new Chua();
  vertex_vector = new Array(width);
  for (let i = 0; i < vertex_vector.length; i++) {
    vertex_vector[i] = 0;
  }
  frameRate(1000);
}

function draw() {
  background("#111111");
  strokeWeight(2.5);
  noFill();
  stroke("#00ff00");
  let m0 = map(slider_m0.value(), 0, 1000, -1.4, -1.0);
  let m1 = map(slider_m1.value(), 0, 1000, -0.85, -0.3);
  chua.set_m0(m0);
  chua.set_m1(m1);
  //print(m0);
  //print(m1);
  translate(0, height / 2);
  for (let i = 0; i < vertex_vector.length - 1; i++) {
    line(i, vertex_vector[i], i + 1, vertex_vector[i + 1]);
  }
  vertex_vector.shift();
  let chua_value = amplitude * chua.process();
  vertex_vector.push(chua_value);
  t++;
}
