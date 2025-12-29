/*
Genuary 2026 - January 7th: Boolean algebra. Get inspired by Boolean
alegebra, in any way
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
// A Border size pecentage of 96% means that for a
// cell size of 3, there will be 256 x 256 grids
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let grid;
let grid_size;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  grid_size = floor(border_size / 3);
  grid = new Grid(
    { w: grid_size, h: grid_size },
    { w: border_size, h: border_size }
  );
  noLoop();
}

function draw() {
  background(background_color);

  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);
  push();
  translate(start_pos, start_pos);
  grid.draw_rect_filled(
    createVector(0, 0),
    createVector(grid_size, grid_size),
    color("#ffffff")
  );
  for (let i = 0; i < grid_size; i = i + 1) {
    grid.draw_line_xor(
      createVector(i, 0),
      createVector(0, 239),
      color("#000000")
    );
  }
  for (let i = 0; i < grid_size; i = i + 1) {
    grid.draw_line_xor(
      createVector(i, 239),
      createVector(239, 0),
      color("#000000")
    );
  }

  grid.show();
  pop();
  /*
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.1", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
