/*
Genuary 2025 - January 26th Prompt: Symmetry
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
const NUM_CELLS = 40; // Must be an even number

let my_font;
let border_size;

let background_color;
let foreground_color;

let color_palette = ["#f5542e", "#f2c327", "#008b6e", "#00aede", "#0067ad"];

function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background_color = color("#000000");
  foreground_color = color("#ffffff");

  background(background_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;

  let pixel_spacing = border_size / (NUM_CELLS * 2 + 1);

  // grid to store elements that will be reflected for symmetry
  // this is 1/4 of the entire grid that will be displayed
  let pixel_grid = new Array(NUM_CELLS / 2);
  for (let i = 0; i < NUM_CELLS / 2; i++) {
    pixel_grid[i] = new Array(NUM_CELLS / 2);
  }

  // initialize grid
  for (rows = 0; rows < pixel_grid.length; rows++) {
    for (cols = 0; cols < pixel_grid[0].length; cols++) {
      pixel_grid[cols][rows] = color(
        color_palette[floor(random(color_palette.length))]
      );
    }
  }

  // draw elements
  strokeWeight(7);
  for (let row = 0; row < NUM_CELLS / 2; row++) {
    for (let col = 0; col < NUM_CELLS / 2; col++) {
      fill(pixel_grid[col][row]);
      stroke(pixel_grid[col][row]);
      circle(
        border_start + pixel_spacing + col * (pixel_spacing * 2),
        border_start + pixel_spacing + row * (pixel_spacing * 2),
        pixel_spacing,
        pixel_spacing
      );
    }
  }
  for (let row = NUM_CELLS / 2; row < NUM_CELLS; row++) {
    for (let col = 0; col < NUM_CELLS / 2; col++) {
      let row_index = NUM_CELLS / 2 - 1 - (row % (NUM_CELLS / 2));
      fill(pixel_grid[col][row_index]);
      stroke(pixel_grid[col][row_index]);
      circle(
        border_start + pixel_spacing + col * (pixel_spacing * 2),
        border_start + pixel_spacing + row * (pixel_spacing * 2),
        pixel_spacing,
        pixel_spacing
      );
    }
  }
  for (let row = 0; row < NUM_CELLS / 2; row++) {
    for (let col = NUM_CELLS / 2; col < NUM_CELLS; col++) {
      let col_index = NUM_CELLS / 2 - 1 - (col % (NUM_CELLS / 2));
      fill(pixel_grid[col_index][row]);
      stroke(pixel_grid[col_index][row]);
      circle(
        border_start + pixel_spacing + col * (pixel_spacing * 2),
        border_start + pixel_spacing + row * (pixel_spacing * 2),
        pixel_spacing,
        pixel_spacing
      );
    }
  }
  for (let row = NUM_CELLS / 2; row < NUM_CELLS; row++) {
    for (let col = NUM_CELLS / 2; col < NUM_CELLS; col++) {
      let col_index = NUM_CELLS / 2 - 1 - (col % (NUM_CELLS / 2));
      let row_index = NUM_CELLS / 2 - 1 - (row % (NUM_CELLS / 2));
      fill(pixel_grid[col_index][row_index]);
      stroke(pixel_grid[col_index][row_index]);
      circle(
        border_start + pixel_spacing + col * (pixel_spacing * 2),
        border_start + pixel_spacing + row * (pixel_spacing * 2),
        pixel_spacing,
        pixel_spacing
      );
    }
  }

  // Draw border
  // noFill();
  // stroke(foreground_color);
  // circle(border_start, border_start, border_size, border_size);

  // Draw Text
  noStroke();
  fill(color_palette[4]);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.26",
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

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0),
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}
