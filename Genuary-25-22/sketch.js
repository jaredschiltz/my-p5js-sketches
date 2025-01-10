/*
Genuary 2025 - January 22nd Prompt: Gradients Only
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
const NUM_CELLS = 30;
let my_font;
let border_size;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  let start_color = color("#7600bc");
  let end_color = color("#ffea99");

  background(end_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let cell_size = border_size / NUM_CELLS;
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;
  // Draw border
  noFill();
  stroke(0);
  //rect(border_start, border_start, border_size, border_size);
  // Draw Gradients
  noFill();
  strokeWeight(1);
  for (let row = 0; row < NUM_CELLS; row++) {
    for (let col = 0; col < NUM_CELLS; col++) {
      // Draw cell outline
      /*
      rect(
        border_start + col * cell_size,
        border_start + row * cell_size,
        cell_size,
        cell_size
      );
      */
      if (floor(random(2)) === 0) {
        // Vertical Gradient
        for (let row_size = 0; row_size < cell_size; row_size++) {
          stroke(
            lerpColor(start_color, end_color, map(row_size, 0, cell_size, 0, 1))
          );
          line(
            border_start + col * cell_size,
            border_start + row * cell_size + row_size,
            border_start + col * cell_size + cell_size,
            border_start + row * cell_size + row_size
          );
        }
      } else {
        // Horizontal Gradient
        for (let col_size = 0; col_size < cell_size; col_size++) {
          stroke(
            lerpColor(start_color, end_color, map(col_size, 0, cell_size, 0, 1))
          );
          line(
            border_start + col * cell_size + col_size,
            border_start + row * cell_size,
            border_start + col * cell_size + col_size,
            border_start + row * cell_size + cell_size
          );
        }
      }
    }
  }
  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.22",
    (WIDTH_HEIGHT - border_size) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - border_size) / 2 + 25
  );
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
