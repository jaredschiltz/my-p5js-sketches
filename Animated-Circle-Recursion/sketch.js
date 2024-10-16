let circle_size;
let scaling_factor;
let fill_color_one;
let fill_color_two;
let rotate_speed;
let levels;

function preload() {}

function setup() {
  createCanvas(400, 400);
  noSmooth();
  circle_size = width;
  scaling_factor = 3 / (3 + 2 * sqrt(3));
  fill_color_one = color(0, 0, 255);
  fill_color_two = color(255, 255, 0);
  rotate_speed = 0.01;
  levels = 6;
}

function draw() {
  ellipseMode(CENTER);
  //stroke(255)
  //strokeWeight(1)
  // noFill()
  noStroke();
  if (levels % 2 == 0) {
    background(fill_color_two);
  } else {
    background(fill_color_one);
  }
  push();
  translate(circle_size / 2, circle_size / 2);
  draw_circle(circle_size, levels);
  pop();
}

function draw_circle(circle_size, level) {
  if (level == 0) {
    return;
  }
  if (level % 2 == 0) {
    fill(fill_color_one);
  } else {
    fill(fill_color_two);
  }
  rotate(rotate_speed * frameCount);
  circle(0, 0, circle_size);
  circle_size = circle_size * scaling_factor;

  for (let i = 0; i < 3; i++) {
    push();
    rotate((2 * PI * i) / 3);
    translate(0, circle_size * 0.58);
    rotate(rotate_speed * frameCount);
    draw_circle(circle_size * 0.9, level - 1);
    pop();
  }
}
