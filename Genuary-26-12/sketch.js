/*
Genuary 2026 - January 12th: Boxes Only
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
  foreground_color = color("#00000");
  background_color = color("#000000");
  colorMode(HSB, 100);

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);

  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  noFill();
  strokeWeight(1);
  stroke("#ffffff");

  push();
  translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT / 2);
  // Rectangle with all corners rounded (radius 20)
  let square_length = 100;
  let square_period = 10;
  for (let s = 0; s < 6; s++) {
    push();
    scale(s * 0.5);
    for (let i = 0; i < square_period; i++) {
      stroke(map(i, 0, square_period, 0, 100), 100, 100);
      push();
      rotate((TWO_PI * i) / square_period);
      rect(0, 0, square_length, square_length, 20);
      rect(0, 0, square_length, square_length, 20);
      pop();
    }
    pop();
  }

  pop();

  noStroke();
  fill("#000000");
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill("#666666");
  textSize(12);
  textFont(google_font);
  text(">> 26.12", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
