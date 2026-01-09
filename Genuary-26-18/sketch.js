/*
Genuary 2026 - January 18th: Unexpected path. Draw a route that changes 
direction based on one very simple rule.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let x, y; // current position
let stepSize = 10; // size of each move
let counter = 1; // binary counter
let cols, rows;

const color_array = ["#d7191c", "#fdae61", "#abdda4", "#2883ba"];

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  background("#000000");
  stroke(20);
  strokeWeight(3);
  noFill();

  cols = floor(width / stepSize);
  rows = floor(height / stepSize);

  noLoop();
}

function draw() {
  //background(background_color);
  for (let loops = 0; loops < 200; loops++) {
    x = floor(random(0, cols));
    y = floor(random(0, rows));
    for (let i = 0; i < 100; i++) {
      // draw multiple steps per frame
      let prevX = x;
      let prevY = y;

      // Binary counter walk rule: turn based on position of LSB
      let lsb = counter & -counter; // isolate lowest set bit
      let turn = Math.log2(lsb); // determines turn
      let dir = turn % 4; // 4 possible directions
      // Move in the chosen direction
      if (dir === 0) {
        x += 1; // right
      } else if (dir === 1) {
        y += 1; // down
      } else if (dir === 2) {
        x -= 1; // left
      } else {
        y -= 1; // up
      }
      stroke(color_array[floor(random(color_array.length))]);

      // Wrap around edges

      //x = (x + cols) % cols;
      //y = (y + rows) % rows;

      line(prevX * stepSize, prevY * stepSize, x * stepSize, y * stepSize);
      counter++;
    }
  }
  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  stroke(background_color);
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.18", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
