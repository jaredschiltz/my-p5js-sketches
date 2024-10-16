let c;
let arc_width;
let spin_speed = 0.01;
let background_color;
let foreground_color;

function preload() {}

function setup() {
  createCanvas(400, 400);
  arc_width = width / 25;
  //background_color = color(random(0,256),random(0,256),random(0,256))
  //foreground_color = color(random(0,256),random(0,256),random(0,256))
  background_color = color(255, 233, 0);
  foreground_color = color(255, 62, 165);
}

function draw() {
  background(background_color);
  strokeWeight(arc_width);
  strokeCap(SQUARE);
  // Draw Center Circle Half

  fill(foreground_color);

  noStroke(foreground_color);
  push();
  translate(width / 2, height / 2);
  rotate((spin_speed + spin_speed / 2) * 2 * frameCount);
  strokeWeight(3);
  arc(0, 0, arc_width, arc_width, -HALF_PI, HALF_PI, CHORD);
  pop();
  noFill();
  stroke(foreground_color);
  for (let i = 1; i < 13; i++) {
    push();
    translate(width / 2, height / 2);
    rotate((spin_speed + spin_speed / 2) * i * frameCount);
    arc(0, 0, 2 * arc_width * i, 2 * arc_width * i, -HALF_PI, HALF_PI);
    pop();
  }
}
