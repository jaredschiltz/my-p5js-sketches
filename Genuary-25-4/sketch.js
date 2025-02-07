/*
Genuary 2025 - January 4th: Black on Black
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#FAF9F6");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);
  fill_color_one = color("#000000");
  let col_number = 18;
  push();
  scale(0.5);
  translate(-40, 0);
  let max_black_color_value = 80;
  for (let row = 0; row < 9; row++) {
    push();
    translate(0, row * 160);
    // Begin Draw "One Row")
    for (let col = 0; col < col_number; col++) {
      push();
      translate(col * 94 + 94 / 2, -10);

      let fill_color_two = color(random(0, max_black_color_value));
      draw_shape_two(fill_color_two);
      pop();
    }
    for (let col = 0; col < col_number; col++) {
      push();
      translate(col * 94, 70);
      let fill_color_two = color(random(0, max_black_color_value));
      draw_shape_two(fill_color_two);
      pop();
    }

    for (let col = 0; col < col_number; col++) {
      push();
      translate(col * 94, 0);
      draw_shape_one(fill_color_one);
      pop();
    }
    push();
    for (let col = 0; col < col_number; col++) {
      push();
      translate(col * 94 + 94 / 2, 80);
      draw_shape_one(fill_color_one);
      pop();
    }
    pop();
    // End Draw "One Row")
    pop();
  }
  pop();

  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill(color(80));
  textSize(12);
  textFont(google_font);
  text(">> 25.31", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function draw_shape_one(fill_color) {
  noStroke();
  fill(fill_color);
  beginShape();
  vertex(20.417, 23.257);
  vertex(47.456, 0);
  vertex(54.079, 35.045);
  vertex(87.74, 46.833);
  vertex(94.363, 81.878);
  vertex(60.701, 70.09);
  vertex(33.662, 93.347);
  vertex(0, 81.559);
  vertex(27.039, 58.302);
  vertex(20.417, 23.257);
  endShape();
}

function draw_shape_two(fill_color) {
  fill(fill_color);
  beginShape();
  vertex(6.601, 46.515);
  vertex(0, 11.545);
  vertex(33.641, 23.258);
  vertex(60.68, 0);
  vertex(94.363, 11.864);
  vertex(67.302, 35.045);
  vertex(73.923, 70.09);
  vertex(46.906, 93.422);
  vertex(40.262, 58.303);
  vertex(6.601, 46.515);
  endShape();
}
