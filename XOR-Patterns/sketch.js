const WIDTH_HEIGHT = 800;
const BORDER_WIDTH = 80;
let picture_size = WIDTH_HEIGHT - 2 * BORDER_WIDTH;
const NUM_CELLS_ACROSS = 100;
let cell_size = picture_size / NUM_CELLS_ACROSS;
function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  let zero_color = color("#0c0000");
  let one_color = color("#f5f5f5");
  background(zero_color);
  noStroke();

  for (let row = 0; row < NUM_CELLS_ACROSS; row++) {
    for (let col = 0; col < NUM_CELLS_ACROSS; col++) {
      if ((row ^ col) % 3) {
        fill(zero_color);
        stroke(zero_color);
      } else {
        fill(one_color);
        stroke(one_color);
      }
      rect(
        BORDER_WIDTH + col * cell_size,
        BORDER_WIDTH + row * cell_size,
        cell_size,
        cell_size,
      );
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
