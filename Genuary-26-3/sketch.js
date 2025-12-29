/*
Genuary 2026 - January 3rd: Fibonacci forever. Create a work
that uses the Fibonacci sequence in some way.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let Fibonacci_array = [];
const NUM_FIBONACCI_TERMS = 300;
let MAX_NUM_BITS;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#eb5e28");
  background_color = color("#252422");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  // Initialize fibonacci series
  Fibonacci_array.push(BigInt(1));
  Fibonacci_array.push(BigInt(1));
  for (let i = 2; i < NUM_FIBONACCI_TERMS; i++) {
    Fibonacci_array.push(
      BigInt(Fibonacci_array[i - 1] + Fibonacci_array[i - 2])
    );
  }
  /*
  MAX_NUM_BITS = Math.ceil(
    Math.log2(Fibonacci_array[Fibonacci_array.length - 1])
  );
  */
  MAX_NUM_BITS =
    Fibonacci_array[Fibonacci_array.length - 1].toString(2).length - 1;
  /*
  for (let f of Fibonacci_array) {
    print(f.toString(2).padStart(32, "0"));
  }
    */
  noLoop();
}

function draw() {
  background(background_color);
  noStroke();
  // Draw Sequence
  let cell_width = border_size / MAX_NUM_BITS;
  let cell_height = border_size / NUM_FIBONACCI_TERMS;
  for (let rows = 0; rows < NUM_FIBONACCI_TERMS; rows++) {
    let current_number = Fibonacci_array[rows]
      .toString(2)
      .padStart(MAX_NUM_BITS, "0");
    //print(current_number);
    for (let cols = 0; cols < MAX_NUM_BITS; cols++) {
      if (current_number[cols] == "0") {
        fill(background_color);
      } else {
        fill(foreground_color);
      }
      rect(
        start_pos + cols * cell_width,
        start_pos + rows * cell_height,
        cell_width,
        cell_height
      );
    }
  }
  // Draw Border
  noStroke();
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
  text(">> 26.3", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
