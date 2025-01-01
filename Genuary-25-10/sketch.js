/*
Genuary 2025 - January 10st Prompt: You can only use TAU in your code.
No other number allowed! TAU = 2 * pi = 6.2831853…
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
  BACKGROUND_COLOR = color("#F5D042");
  FOREGROUND_COLOR = color("#0A174E");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  noLoop();
}

function mousePressed() {
  draw();
}

function draw() {
  background(BACKGROUND_COLOR);
  noFill();
  stroke(FOREGROUND_COLOR);
  strokeWeight(TAU);
  push();
  translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT / 2);
  for (let i = TAU; i < TAU * TAU; i++) {
    rotate(TAU * TAU);
    scale(sqrt(sqrt(sqrt(TAU))));
    ellipse(TAU, TAU, TAU * TAU, TAU * TAU * TAU);
  }
  pop();
  noStroke();
  fill(BACKGROUND_COLOR);
  textSize(12);
  textFont("Playwrite CU");
  text(">> 25.10", border_size, WIDTH_HEIGHT - 10);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
