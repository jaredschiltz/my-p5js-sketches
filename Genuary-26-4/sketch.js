/*
Genuary 2026 - January 4th: Lowres. An image or graphic with low resolution,
where the details are simplified or pixelated.
*/

let img;
let img_width;
let img_height;
let cell_size = 11;

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
  img = loadImage("Jared.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  img_width = img.width;
  img_height = img.height;

  foreground_color = color("#ffffff");
  background_color = color("#333333");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);
  noStroke();
  img.loadPixels();
  for (row = 0; row < img_height; row = row + cell_size) {
    for (col = 0; col < img_width; col = col + cell_size) {
      // Get Center Pixel Value
      let pixel_color = img.get(col + cell_size / 2, row + cell_size / 2);
      fill(pixel_color);
      if (pixel_color[0] == 0 && pixel_color[1] == 0 && pixel_color[2] == 0) {
        fill("#000000");
        rect(col, row, cell_size, cell_size);
        fill("#ff0000");
        rect(col + cell_size / 2, row, cell_size / 3, cell_size / 3);
        fill("#00ff00");
        rect(
          col + cell_size / 2,
          row + cell_size / 3,
          cell_size / 3,
          cell_size / 3
        );
        fill("#0000ff");
        rect(
          col + cell_size / 2,
          row + (cell_size * 2) / 3,
          cell_size / 3,
          cell_size / 3
        );
      } else {
        fill(background_color);
        rect(col, row, cell_size, cell_size);
        fill("#ff000077");
        rect(col, row, cell_size / 3, cell_size / 3);
        fill("#00ff0077");
        rect(col, row + cell_size / 3, cell_size / 3, cell_size / 3);
        fill("#0000ff77");
        rect(col, row + (cell_size * 2) / 3, cell_size / 3, cell_size / 3);
      }
    }
  }
  img.updatePixels();
  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.4", start_pos, WIDTH_HEIGHT - 100);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
