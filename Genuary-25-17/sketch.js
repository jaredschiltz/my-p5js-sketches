/*
Genuary 2025 - January 17th Prompt: What happens if pi=4
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let color_one;
let color_two;
let color_three;
let foreground_color;
const ARC_SPACING = 90;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  color_one = color("#00f0b5");
  color_two = color("#5e239d");
  color_three = color("#f61067");
  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  noLoop();
}

function draw() {
  const ITERATIONS = 7;
  background(0);
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  // Draw Border
  noFill();
  stroke(color_two);
  //rect(start_pos, start_pos, border_size, border_size);

  push();
  translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT / 2);
  strokeWeight(7);
  push();
  let arc_start = 0;
  let arc_end = 4;
  let arc_increment_amount = 4;
  for (let i = 0; i < ITERATIONS; i++) {
    arc(0, 0, ARC_SPACING * i, ARC_SPACING * i, arc_start, arc_end);
    arc_start = arc_end;
    arc_end += arc_increment_amount;
  }
  pop();

  push();
  rotate(4);
  stroke(color_three);
  arc_start = 0;
  arc_end = 4;
  arc_increment_amount = 4;
  let ARC_SPACING_OFFSET = ARC_SPACING / 3;
  for (let i = 0; i < ITERATIONS; i++) {
    arc(
      0,
      0,
      ARC_SPACING_OFFSET + ARC_SPACING * i,
      ARC_SPACING_OFFSET + ARC_SPACING * i,
      arc_start,
      arc_end
    );
    arc_start = arc_end;
    arc_end += arc_increment_amount;
  }
  stroke(color_one);
  arc_start = arc_end + 0.1;
  arc_end = arc_end + 2.2;
  let angle = arc_end - arc_start;
  let num_divisions = 50;
  let angle_increment = angle / num_divisions;
  arc_end = arc_start + angle_increment;
  for (let i = 0; i < num_divisions; i++) {
    if (i % 2 == 0) {
      stroke(0);
    } else {
      stroke(color_one);
    }
    arc(
      0,
      0,
      ARC_SPACING_OFFSET * 2 + ARC_SPACING * (ITERATIONS - 1),
      ARC_SPACING_OFFSET * 2 + ARC_SPACING * (ITERATIONS - 1),
      arc_start,
      arc_end
    );
    arc_start = arc_end;
    arc_end += angle_increment;
  }
  pop();

  push();
  rotate(8);
  stroke(color_one);
  arc_start = 0;
  arc_end = 4;
  arc_increment_amount = 4;
  ARC_SPACING_OFFSET = (ARC_SPACING * 2) / 3;
  for (let i = 0; i < ITERATIONS; i++) {
    arc(
      0,
      0,
      ARC_SPACING_OFFSET + ARC_SPACING * i,
      ARC_SPACING_OFFSET + ARC_SPACING * i,
      arc_start,
      arc_end
    );
    arc_start = arc_end;
    arc_end += arc_increment_amount;
  }
  pop();
  pop();

  // Draw Text
  fill(color_one);
  textSize(12);
  textFont(google_font);
  text(">> 25.17", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
