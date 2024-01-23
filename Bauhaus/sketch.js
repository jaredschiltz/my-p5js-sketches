const WIDTH_HEIGHT = 800;
const BG_COLOR = "#e6ddc5";
const CIRCLE_COLOR = "#F1A23A";
const NUM_LINES = 10;
const LINE_SPACING = 12;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background(BG_COLOR);
  noStroke();
  fill(CIRCLE_COLOR);
  ellipse(width / 2, height / 2, 750);
  fill(0);
  noStroke();
  push();
  let start_position = height / 2 - 65;
  translate(50, start_position);
  // Draw first line
  push();
  for (let x = 0; x < (width * 2) / 3; x++) {
    translate(-1, 0);
    draw_stripes();
  }
  pop();
  for (let x = 0; x < (width * 2) / 3; x++) {
    translate(1, 0);
    draw_stripes();
  }
  // Draw first arc
  for (let angle = 0; angle > -PI; angle -= 0.01) {
    push();
    rotate(angle);
    draw_stripes();
    pop();
  }
  // Draw second line
  translate(0, -LINE_SPACING * (NUM_LINES + 1));
  for (let x = 0; x < (width * 1) / 3; x++) {
    translate(-1, 0);
    draw_stripes();
  }
  // Draw second arc
  for (let angle = 0; angle < PI + PI / 2; angle += 0.01) {
    push();
    rotate(angle);
    draw_stripes();
    pop();
  }
  // Draw first vertical line
  rotate(-PI / 2);
  for (let x = 0; x < LINE_SPACING; x++) {
    translate(-1, 0);
    draw_stripes();
  }
  // Draw second vertical line
  translate(-LINE_SPACING * (NUM_LINES - 1), 0);
  for (let x = 0; x < LINE_SPACING * 2; x++) {
    translate(-1, 0);
    draw_stripes();
  }
  // Draw third vertical line
  translate(-LINE_SPACING * (NUM_LINES - 1), 0);
  for (let x = 0; x < LINE_SPACING * 2; x++) {
    translate(-1, 0);
    draw_stripes();
  }
  // draw second arc
  translate(-LINE_SPACING * NUM_LINES, 0);
  push();
  for (let x = 0; x < LINE_SPACING * 1; x++) {
    translate(1, 0);
    draw_stripes();
  }
  pop();
  for (let angle = 0; angle < PI + PI / 2; angle += 0.01) {
    push();
    rotate(angle);
    draw_stripes();
    pop();
  }
  // draw last horizontal line
  rotate(-PI / 2);
  for (let x = 0; x < width; x++) {
    translate(-1, 0);
    draw_stripes();
  }
  pop();

  stroke(BG_COLOR);
  strokeWeight(200);
  noFill();
  ellipse(width / 2, height / 2, 950);
}

function draw_stripes() {
  /*
  stroke(255, 0, 0);
  for (let i = 0; i < NUM_LINES + 2; i++) {
    //if (i > 1 || i < NUM_LINES + 1) {
    circle(0, i * LINE_SPACING, LINE_SPACING / 2.0);
    // }
  }
  */
  stroke(0);
  for (let i = 0; i < NUM_LINES + 2; i++) {
    if (i >= 1 && i <= NUM_LINES) {
      circle(0, i * LINE_SPACING, LINE_SPACING / 2.0);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
