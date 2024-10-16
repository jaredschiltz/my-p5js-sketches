let sphere_radius = 4;
let box_size = 50;
let noiseVal;
let xoff = 0.0;

function preload() {}

function setup() {
  createCanvas(400, 711, WEBGL);
  noFill();
  strokeWeight(3);
  stroke(255);
}

function draw() {
  background(0);
  noFill();
  random_color = createVector(random(0, 256), random(0, 256), random(0, 256));
  fill(random_color.x, random_color.y, random_color.z);

  noFill();
  stroke(random_color.x, random_color.y, random_color.z);
  rotateX(frameCount * 0.05);
  rotateY(frameCount * 0.05);
  xoff = xoff + 0.05;
  let new_box_size = noise(xoff) * box_size * 6;
  box(new_box_size);

  fill(random_color.x, random_color.y, random_color.z);

  push();
  translate(new_box_size / 2, new_box_size / 2, new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(new_box_size / 2, new_box_size / 2, -new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(new_box_size / 2, -new_box_size / 2, new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(new_box_size / 2, -new_box_size / 2, -new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(-new_box_size / 2, new_box_size / 2, new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(-new_box_size / 2, new_box_size / 2, -new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(-new_box_size / 2, -new_box_size / 2, new_box_size / 2);
  sphere(sphere_radius);
  pop();
  push();
  translate(-new_box_size / 2, -new_box_size / 2, -new_box_size / 2);
  sphere(sphere_radius);
  pop();
}
