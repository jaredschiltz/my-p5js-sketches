/*
Genuary 2026 - January 30th: Its not a bug, its a feature
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let x, y;
let vx, vy;
let step = 0.5;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#ffc917");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  // start in the middle
  x = width / 2;
  y = height / 2;

  // small random velocity
  let range = 25;
  vx = random(-range, range);
  vy = random(-range, range);
  background(background_color);
  stroke(foreground_color);
  //noLoop();
}

function draw() {
  //background(background_color);
  push();
  for (let i = 0; i < 10000; i++) {
    // multiple steps per frame
    let prevX = x;
    let prevY = y;

    // floating-point noise movement
    x += vx + noise(i * 0.1, y * 0.0001) * step;
    y += vy + noise(i * 0.1, x * 0.0001) * step;

    // CLAMPING: hits the edge and folds back
    if (x < 0 || x > width) vx *= -1;
    if (y < 0 || y > height) vy *= -1;

    // ALIASING: round to nearest integer for drawing
    let drawX = floor(x);
    let drawY = floor(y);

    stroke(random(0, 255));
    line(prevX, prevY, drawX, drawY);

    // occasionally jitter velocity
    if (random() < 0.1) {
      vx += random(-0.5, 0.5);
      vy += random(-0.5, 0.5);
    }
  }
  pop();

  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill("#ffffff");
  textSize(12);
  textFont(google_font);
  text(">> 26.30", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
