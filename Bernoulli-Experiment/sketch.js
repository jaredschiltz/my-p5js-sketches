const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.8;
let border_size;
let start_pos;
let background_color;
let foreground_color;

const CELLS_PER_WIDTH = 500;
let cell_length;

function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = [
    color("#ff6b6b"),
    color("#348aa7"),
    color("#fdcb58"),
    color("#47cacc"),
  ];
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  cell_length = border_size / CELLS_PER_WIDTH;
  background(background_color);
  noStroke();
  noLoop();
}

function draw() {
  // Draw Cells
  fill(background_color);
  for (let rows = 0; rows < CELLS_PER_WIDTH; rows++) {
    for (let cols = 0; cols < CELLS_PER_WIDTH; cols++) {
      let p = map(
        dist(cols, rows, CELLS_PER_WIDTH / 2, CELLS_PER_WIDTH / 2),
        0,
        CELLS_PER_WIDTH / 2.1,
        0.0,
        1.0,
      );
      if (bernoulli(p) == 0) {
        fill(foreground_color[floor(random(0, foreground_color.length))]);
      } else {
        fill(background_color);
      }
      rect(
        start_pos + cols * cell_length,
        start_pos + rows * cell_length,
        cell_length,
        cell_length,
      );
    }
  }
  // Draw Border
  // fill(background_color);
  // rect(0, 0, start_pos, WIDTH_HEIGHT);
  // rect(0, 0, WIDTH_HEIGHT, start_pos);
  // rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  // rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  // noStroke();
  // fill(foreground_color);
  // textSize(12);
  // textFont(google_font);
  // text(">> 26.29", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function bernoulli(threshold) {
  return random(0, 1) < threshold ? 1 : 0;
}
