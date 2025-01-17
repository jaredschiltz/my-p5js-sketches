/*
Genuary 2025 - January 18th Prompt: Op Art.
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let color_one;
let color_two;

const NUM_CELL_PER_ROW = 31; // Must be odd if you want checkerboard

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  color_one = color("#faf0ca");
  color_two = color("#0d3b66");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  noLoop();
}

function draw() {
  background(color_one);
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noFill();
  // Make horizontal sinusoid
  let amplitude = 65;
  let horizontal_sinusoid = Array(NUM_CELL_PER_ROW);
  for (let i = 0; i < horizontal_sinusoid.length; i++) {
    horizontal_sinusoid[i] = map(
      sin(map(i, 0, horizontal_sinusoid.length, -TWO_PI, TWO_PI)),
      -1.0,
      1.0,
      0,
      amplitude
    );
  }
  // find where zero crossings are
  let zero_crossings = [];
  for (let i = 0; i < horizontal_sinusoid.length; i++) {
    if (horizontal_sinusoid[i] < 1) {
      zero_crossings.push(i);
    }
  }
  // pad up to first zero crossing with zero
  for (let i = 0; i < zero_crossings[0]; i++) {
    horizontal_sinusoid[i] = 0;
  }
  // pad last zero crossing to end with zero
  for (let i = zero_crossings[1]; i < horizontal_sinusoid.length; i++) {
    horizontal_sinusoid[i] = 0;
  }

  let horizontal_cell_size;
  let vertical_cell_size;

  noStroke();
  push();
  translate(start_pos, start_pos);
  push();
  for (let row = 0; row < NUM_CELL_PER_ROW; row++) {
    push();
    for (let col = 0; col < NUM_CELL_PER_ROW; col++) {
      if ((row + col) % 2 == 0) {
        fill(color_one);
      } else {
        fill(color_two);
      }

      horizontal_cell_size = map(
        horizontal_sinusoid[col],
        0,
        amplitude,
        (border_size / NUM_CELL_PER_ROW) * 1.51,
        (border_size / NUM_CELL_PER_ROW) * 0.25
      );
      //vertical_cell_size = border_size / NUM_CELL_PER_ROW;
      vertical_cell_size = map(
        horizontal_sinusoid[row],
        0,
        amplitude,
        (border_size / NUM_CELL_PER_ROW) * 1.44,
        (border_size / NUM_CELL_PER_ROW) * 0.25
      );

      rect(0, 0, horizontal_cell_size, vertical_cell_size);
      translate(horizontal_cell_size, 0);
    }
    pop();
    translate(0, vertical_cell_size);
  }
  pop();
  pop();

  // Draw Sinusoid
  /*
  noFill();
  stroke(255, 0, 0);
  beginShape();

  for (let i = 0; i < horizontal_sinusoid.length; i++) {
    vertex(
      start_pos + (i * border_size) / NUM_CELL_PER_ROW,
      WIDTH_HEIGHT / 2 + horizontal_sinusoid[i]
    );
  }
  endShape();
  */
  // Draw Border
  /*
  noFill();
  stroke(color_two);
  rect(start_pos, start_pos, border_size, border_size);
  */

  noStroke();
  fill(color_one);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill(color_two);
  textSize(12);
  textFont(google_font);
  text(">> 25.19", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
