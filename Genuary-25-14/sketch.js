/*
Genuary 2025 - January 14th Prompt: Pure Black and white. No gray.
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
let start_pos;
const NUM_CELLS = 40;
const NUMBER_BOXES = 40;
let box_array = [];
let CELL_WIDTH = border_size / NUM_CELLS;
let google_font;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  for (let box = 0; box < NUMBER_BOXES; box++) {
    let new_box_x = floor(random(NUM_CELLS));
    let new_box_y = floor(random(NUM_CELLS));
    let box_width = floor(random(NUM_CELLS - new_box_x + 1));
    let box_height = floor(random(NUM_CELLS - new_box_y + 1));
    box_array.push(
      new Box(createVector(new_box_x, new_box_y), box_width, box_height)
    );
  }
  noLoop();
}

function draw() {
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  background(255);
  // Draw Border
  // stroke(0);
  // nofill();
  // rect(start_pos, start_pos, border_size, border_size);
  // Draw XOR boxes
  noStroke();
  for (let row = 0; row < NUM_CELLS; row++) {
    for (let col = 0; col < NUM_CELLS; col++) {
      //
      let xor_value = 0;
      for (b of box_array) {
        /*
        print(
          `${b.position.x}, ${b.position.x + b.w} ${b.position.h} ${
            b.position.y + b.h
          }`
        );
        */
        if (
          col >= b.position.x &&
          col < b.position.x + b.w &&
          row >= b.position.y &&
          row < b.position.y + b.h
        ) {
          //print(`cells: ${row} ${col}`);
          xor_value ^= 1;
        }
      }
      if (xor_value === 0) {
        fill(255);
      } else {
        fill(0);
      }
      rect(
        start_pos + col * CELL_WIDTH,
        start_pos + row * CELL_WIDTH,
        CELL_WIDTH,
        CELL_WIDTH
      );
      //
    }
  }
  /*
  for (b of box_array) {
    fill(color(floor(random(256)), floor(random(256)), floor(random(256))));
    rect(
      start_pos + b.position.x * CELL_WIDTH,
      start_pos + b.position.y * CELL_WIDTH,
      b.w * CELL_WIDTH,
      b.h * CELL_WIDTH
    );
  }
    */
  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(google_font);
  text(">> 25.14", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
