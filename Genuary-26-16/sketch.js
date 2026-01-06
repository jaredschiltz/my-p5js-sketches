/*
Genuary 2026 - January 16th: Order and Disorder
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

const HEIGHT_TO_WIDTH_RATIO = 0.3;
const CELL_WIDTH = 30;
const CELL_HEIGHT = CELL_WIDTH * HEIGHT_TO_WIDTH_RATIO;
const NUMBER_OF_CELL_ACROSS = 4;
let NUMBER_OF_CELLS_DOWN = 50;

const TRANSPARENCY_AMOUNT = 200; // 0-255

let color_array = ["#D7CF07", "#D98324", "#A40606"];

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  noLoop();
}

function draw() {
  background(background_color);
  push();
  rectMode(CENTER);
  translate(start_pos, start_pos);
  let vertical_space = (border_size - CELL_HEIGHT * NUMBER_OF_CELLS_DOWN) / 2;

  for (let row = 0; row < NUMBER_OF_CELLS_DOWN; row++) {
    for (let col = 0; col < NUMBER_OF_CELL_ACROSS; col++) {
      noStroke();
      let random_color = color(color_array[floor(random(0, 3))]);
      random_color.setAlpha(TRANSPARENCY_AMOUNT);
      fill(random_color);
      rect(
        CELL_WIDTH / 2 + col * CELL_WIDTH,
        CELL_HEIGHT / 2 + vertical_space + row * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT
      );
    }
  }
  push();
  translate(4 * CELL_WIDTH + CELL_WIDTH / 2, vertical_space + CELL_HEIGHT / 2);
  for (let row = 0; row < NUMBER_OF_CELLS_DOWN; row++) {
    for (let col = 0; col < 15; col++) {
      noStroke();
      let random_color = color(color_array[floor(random(0, 3))]);
      random_color.setAlpha(TRANSPARENCY_AMOUNT);
      fill(random_color);
      push();
      translate(random(-col * 3, col * 3), random(col * -2, col * 2));
      push();
      rotate(random(-0.05 * col, 0.05 * col));
      rect(col * CELL_WIDTH, row * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      pop();
      pop();
    }
  }
  pop();

  pop();
  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  /*
  noStroke();
  fill("#ff0000");
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
  text(">> 26.16", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
