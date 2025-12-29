/*
Genuary 2026 - January 24th: Perfectionist's nightmare
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
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);

  // Draw Grid
  let num_cells_across = 15;
  let cell_width = border_size / num_cells_across;
  for (let row = 0; row < num_cells_across; row++) {
    for (let col = 0; col < num_cells_across; col++) {
      stroke(foreground_color);
      strokeWeight(2);
      noFill();

      rect(
        start_pos + row * cell_width,
        start_pos + col * cell_width,
        cell_width,
        cell_width
      );

      //fill("#000000");
      circle(
        start_pos + row * cell_width + cell_width / 2,
        start_pos + col * cell_width + cell_width / 2,
        cell_width * 0.5
      );
    }
  }

  push();
  translate(start_pos + cell_width * 10, start_pos + cell_width * 12);
  for (let row = 0; row < cell_width; row = row + 2) {
    for (let col = 0; col < cell_width; col = col + 2) {
      let color_array = [color("#ff13f0"), color("#00ff00")];
      noStroke();
      stroke(color_array[floor(random(0, 2))]);
      rect(row, col, 1, 1);
    }
  }
  stroke("#000000");
  noFill();
  rect(0, 0, cell_width, cell_width);
  pop();

  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

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
  text(">> 26.24", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
