let xoff = 0.01;
let yoff = 0.011;
let current_x = 0.2;
let current_y = 0.7;

let zoff = 0.05;
let current_z = 0.1;

const NUM_LINES = 200;
let line_array;

function setup() {
  createCanvas(700, 700);
  color_array = [
    "#e93c36",
    "#fdec3d",
    "#e51f7f",
    "#3ca64a",
    "#10a6e9",
    "#822c82",
    "ffffff",
  ];
  ellipseMode(CENTER);
  line_array = new Array(NUM_LINES);
  for (let i = 0; i < line_array.length; i++) {
    line_array[i] = {
      x: random(0, width),
      y: random(0, height),
      colour: color_array[floor(random() * color_array.length)],
    };
  }
}

function draw() {
  background(0);
  let end_point_x = map(noise(current_x), 0, 1, 0, width);
  let end_point_y = map(noise(current_y), 0, 1, 0, height);
  let current_stroke_weight = map(noise(current_z), 0, 1, 1, 100);
  strokeWeight(current_stroke_weight);
  for (let i = 0; i < line_array.length; i++) {
    stroke(line_array[i].colour);
    line(line_array[i].x, line_array[i].y, end_point_x, end_point_y);
  }

  current_x += xoff;
  current_y += yoff;
  current_z += zoff;
}
