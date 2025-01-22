/*
Genuary 2025 - January 23rd Prompt: Inspired by brutalism
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
const NUM_CELLS = 30;
let my_font;
let border_size;

let dark_grey_color;
let background_color;
let red_color;

function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  dark_grey_color = color(63, 62, 58);
  background_color = color(192, 179, 157);
  red_color = color(175, 54, 45);

  background(background_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;
  // Draw border
  fill(dark_grey_color);
  rect(border_start, border_start, border_size, border_size);
  // Draw some brutal structures
  noStroke();

  push();
  for (let i = 0; i < 3; i++) {
    push();
    translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT - border_start - 200);
    draw_long_wall(red_color);
    translate(250, 60);
    draw_short_wall(red_color);
    pop();
    translate(0, -250);
  }
  pop();

  push();
  scale(-1, 1);
  translate(-WIDTH_HEIGHT, 0);
  for (let i = 0; i < 3; i++) {
    push();
    translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT - border_start - 200);
    draw_long_wall(background_color);
    translate(250, 60);
    draw_short_wall(background_color);
    pop();
    translate(0, -250);
  }
  pop();

  push();
  for (let i = 0; i < 3; i++) {
    push();
    translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT - border_start - 575);
    draw_short_wall(red_color);
    translate(150, 40);
    draw_long_wall(red_color);
    pop();
    translate(0, 250);
  }
  pop();

  push();
  scale(-1, 1);
  translate(-WIDTH_HEIGHT, 0);
  for (let i = 0; i < 3; i++) {
    push();
    translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT - border_start - 575);
    draw_short_wall(background_color);
    translate(150, 40);
    draw_long_wall(background_color);
    pop();
    translate(0, 250);
  }
  pop();

  // Draw border
  noStroke();
  fill(background_color);
  rect(0, WIDTH_HEIGHT - border_start, WIDTH_HEIGHT, border_start);
  // Draw Text
  noStroke();
  fill(dark_grey_color);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.23",
    (WIDTH_HEIGHT - border_size) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - border_size) / 2 + 25
  );
}

function draw_long_wall(fill_color) {
  fill(fill_color);
  beginShape();
  vertex(0, 0);
  vertex(200, 50);
  vertex(200, 150);
  vertex(0, 100);
  endShape();
  fill(dark_grey_color);
  beginShape();
  vertex(10, 30);
  vertex(150, 65);
  vertex(150, 125);
  vertex(10, 90);
  endShape();
}
function draw_short_wall(fill_color) {
  fill(fill_color);
  beginShape();
  vertex(0, 0);
  vertex(100, 25);
  vertex(100, 125);
  vertex(0, 100);
  endShape();
  fill(dark_grey_color);
  beginShape();
  vertex(10, 30);
  vertex(80, 48);
  vertex(80, 108);
  vertex(10, 90);
  endShape();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
