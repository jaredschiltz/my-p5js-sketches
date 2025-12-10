const WIDTH = 1200;
const HEIGHT = 600;
const PIXEL_SIZE = 12;
const PIXEL_SPACING = 21; // Distance from one pixel column to another
const CHARACTER_SPACING = 140; // Distance from one character to another
const NUM_CHARACTERS = 8;
const COLUMNS_PER_CHARACTER = 5;
const ROWS_PER_CHARACTER = 7;
const TOTAL_COLUMNS = NUM_CHARACTERS * COLUMNS_PER_CHARACTER;

let background_color;
let unlit_color;
let lit_color;

let message = "16:25:15";
let messageBytes = [];

let hours;
let minutes;
let seconds;

function preload() {}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background_color = color(40);
  unlit_color = color("#002200");
  lit_color = color("#00FF00");
  for (let c of message) {
    messageBytes.push(...font5x7[c.charCodeAt(0)]);
  }
  let now = new Date();
  hours = String(now.getHours()).padStart(2, "0");
  minutes = String(now.getMinutes()).padStart(2, "0");
  seconds = String(now.getSeconds()).padStart(2, "0");
}

function draw() {
  let now = new Date();
  let current_hours = String(now.getHours()).padStart(2, "0");
  let current_minutes = String(now.getMinutes()).padStart(2, "0");
  let current_seconds = String(now.getSeconds()).padStart(2, "0");

  let time_changed = false;
  if (hours != current_hours) {
    hours = current_hours;
    time_changed = true;
  }
  if (minutes != current_minutes) {
    minutes = current_minutes;
    time_changed = true;
  }
  if (seconds != current_seconds) {
    seconds = current_seconds;
    time_changed = true;
  }

  if (time_changed) {
    //console.log(`${hours}:${minutes}:${seconds}`);
    message = current_hours + ":" + current_minutes + ":" + current_seconds;
    messageBytes = [];
    for (let c of message) {
      messageBytes.push(...font5x7[c.charCodeAt(0)]);
    }

    time_changed = false;
  } else {
    // scroll down
    for (let i = 0; i < messageBytes.length; i++) {
      messageBytes[i] = messageBytes[i] << 1;
    }
  }

  background(background_color);
  push();
  scale(0.5, 0.5);
  translate(700, 500);
  draw_5_7_grid(unlit_color, lit_color, messageBytes);
  pop();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function scroll_left(message) {
  first_col = message.shift();
  message.push(first_col);
}

function draw_5_7_grid(unlit_color, lit_color, display_array) {
  noStroke();
  fill(unlit_color);
  for (let character = 0; character < NUM_CHARACTERS; character++) {
    push();
    for (let cols = 0; cols < COLUMNS_PER_CHARACTER; cols++) {
      //print(display_array[cols]);
      bits = [];
      for (let i = 0; i < 8; i++) {
        bits.push(
          (display_array[character * COLUMNS_PER_CHARACTER + cols] >> i) & 1
        ); // extract each bit i
      }
      for (let rows = 0; rows < ROWS_PER_CHARACTER; rows++) {
        if (bits[rows] == 0) {
          fill(unlit_color);
        } else {
          fill(lit_color);
        }
        rect(
          cols * PIXEL_SPACING,
          rows * PIXEL_SPACING,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
    translate(CHARACTER_SPACING, 0);
  }
  pop();
}
