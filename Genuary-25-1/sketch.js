/*
Genuary 2025 - January 1st Prompt: Vertical or horizontal lines only
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.1;
const NOISE_THRESHOLD = 256 / 2.5;
const LINE_SPACING = 4;
let BACKGROUND_COLOR;
let FOREGROUND_COLOR;
let noise_field = [];
let border_size;
let yoff = 0;
let xoff = 0;
let zoff = 0;

let google_font;
function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  BACKGROUND_COLOR = color(0);
  FOREGROUND_COLOR = color(255);

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  noLoop();
}

function mousePressed() {
  draw();
}

function draw() {
  background(0);
  fill(BACKGROUND_COLOR);
  noStroke();
  rect(
    border_size,
    border_size,
    WIDTH_HEIGHT - 2 * border_size,
    WIDTH_HEIGHT - 2 * border_size
  );
  for (let rows = border_size; rows < WIDTH_HEIGHT - border_size; rows++) {
    let xoff = 0;
    for (let cols = border_size; cols < WIDTH_HEIGHT - border_size; cols++) {
      let index = cols + rows * (WIDTH_HEIGHT - 2 * border_size);
      noise_field[index] = floor(map(noise(xoff, yoff, zoff), 0, 1, 0, 256));
      xoff += 0.01;
    }
    yoff += 0.01;
  }

  for (let rows = border_size; rows < WIDTH_HEIGHT - border_size; rows++) {
    for (let cols = border_size; cols < WIDTH_HEIGHT - border_size; cols++) {
      if (rows % LINE_SPACING == 0) {
        let index = cols + rows * (WIDTH_HEIGHT - 2 * border_size);
        if (noise_field[index] > NOISE_THRESHOLD) {
          set(
            cols,
            rows,
            color(random(0, 255), random(0, 255), random(0, 255))
          );
        } else {
          set(cols, rows, BACKGROUND_COLOR);
        }
      }
    }
  }

  for (let rows = border_size; rows < WIDTH_HEIGHT - border_size; rows++) {
    for (let cols = border_size; cols < WIDTH_HEIGHT - border_size; cols++) {
      let index = cols + rows * (WIDTH_HEIGHT - 2 * border_size);
      noise_field[index] = floor(map(noise(xoff, yoff, zoff), 0, 1, 0, 256));
      xoff += 0.01;
    }
    yoff += 0.01;
  }

  for (let rows = border_size; rows < WIDTH_HEIGHT - border_size; rows++) {
    for (let cols = border_size; cols < WIDTH_HEIGHT - border_size; cols++) {
      if (rows % (LINE_SPACING * 2) == 0) {
        let index = cols + rows * (WIDTH_HEIGHT - 2 * border_size);
        if (noise_field[index] > NOISE_THRESHOLD) {
          set(
            cols,
            rows,
            color(random(0, 255), random(0, 255), random(0, 255))
          );
        } else {
          set(cols, rows, BACKGROUND_COLOR);
        }
      }
    }
  }

  updatePixels();
  noFill();
  stroke(0);
  rect(
    border_size,
    border_size,
    WIDTH_HEIGHT - 2 * border_size,
    WIDTH_HEIGHT - 2 * border_size
  );
  noStroke();
  fill(255);
  textSize(12);
  textFont("Playwrite CU");
  text(">> 25.1", border_size, WIDTH_HEIGHT - 40);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
