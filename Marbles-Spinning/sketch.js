let rotate_speed;
let circle_distance;
let number_balls = 25;
function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
  circle_distance = height / number_balls;
  rotate_speed = 0.01;
}

function preload() {}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  noFill();
  for (let i = 1; i <= number_balls; i++) {
    ellipse(0, 0, circle_distance * i);
  }

  fill(255, 0, 0);
  for (let i = 1; i < number_balls; i++) {
    push();
    rotate(frameCount * rotate_speed * (i + 1));
    translate(0, -circle_distance / 4 - (circle_distance / 2) * i);
    ellipse(0, 0, circle_distance / 2);
    pop();
  }
  fill(0, 255, 0);
  push();
  rotate(PI);
  for (let i = 1; i < number_balls; i++) {
    push();
    rotate(frameCount * rotate_speed * (i + 1));
    translate(0, -circle_distance / 4 - (circle_distance / 2) * i);
    ellipse(0, 0, circle_distance / 2);
    pop();
  }
  pop();

  fill(0, 0, 255);
  push();
  rotate(PI / 2);
  for (let i = 1; i < number_balls; i++) {
    push();
    rotate(frameCount * rotate_speed * (i + 1));
    translate(0, -circle_distance / 4 - (circle_distance / 2) * i);
    ellipse(0, 0, circle_distance / 2);
    pop();
  }
  pop();

  fill(255, 255, 0);
  push();
  rotate(-PI / 2);
  for (let i = 1; i < number_balls; i++) {
    push();
    rotate(frameCount * rotate_speed * (i + 1));
    translate(0, -circle_distance / 4 - (circle_distance / 2) * i);
    ellipse(0, 0, circle_distance / 2);
    pop();
  }
  pop();
}
