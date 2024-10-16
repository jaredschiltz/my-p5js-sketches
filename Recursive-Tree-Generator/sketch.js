let stroke_weight = 4;
let branch_length;
let noise_increment = 0.01;
let noise_value = 0.08;
let branch_scaling_factor = 0.8;

function preload() {}

function setup() {
  createCanvas(400, 712);
  branch_length = (1 / 9) * height;
}

function draw() {
  let current_noise = noise(noise_value);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(stroke_weight);
  push();
  translate(width / 2, (2 / 3) * height);
  line(0, 0, 0, -branch_length);
  translate(0, -branch_length);
  let wind = map(current_noise, 0, 1, -PI / 16, PI / 16);
  draw_tree(stroke_weight, branch_length, PI / 9, wind, 12);
  pop();
  noise_value += noise_increment;
}

function draw_tree(stroke_weight, branch_length, branch_angle, wind, levels) {
  if (levels == 0) {
    return;
  }
  strokeWeight(stroke_weight);
  push();
  rotate(-branch_angle + wind);
  line(0, 0, 0, -branch_length * branch_scaling_factor);
  translate(0, -branch_length * branch_scaling_factor);
  draw_tree(
    stroke_weight * branch_scaling_factor,
    branch_length * branch_scaling_factor,
    branch_angle,
    wind * 1.01,
    levels - 1
  );
  pop();
  push();
  rotate(branch_angle + wind);
  line(0, 0, 0, -branch_length * branch_scaling_factor);
  translate(0, -branch_length * branch_scaling_factor);
  draw_tree(
    stroke_weight * branch_scaling_factor,
    branch_length * branch_scaling_factor,
    branch_angle,
    wind * 1.01,
    levels - 1
  );
  pop();
}
