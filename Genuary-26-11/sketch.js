/*
Genuary 2026 - January 11th: Quine. A quine is a form of code 
poetry, it's a computer program that outputs exactly its own
source code.
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
  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  let s = [
    "let s = [",
    "];",
    "function setup() {",
    "  createCanvas(800, 800);",
    "  background(0);",
    "  fill('#00ff00');",
    "  textFont('monospace');",
    "  textSize(12);",
    "  for (let i = 0; i < s.length; i++) {",
    "    let line = s[i];",
    "    if (i === 1) {",
    "      for (let j = 0; j < s.length; j++)",
    "        text('\"' + s[j] + '\",', 10, 20 + 14 * (i + j));",
    "    }",
    "    text(line, 10, 20 + 14 * i);",
    "  }",
    "}",
  ];

  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  background(0);
  fill("#00ff00");
  textFont("monospace");
  textSize(12);
  for (let i = 0; i < s.length; i++) {
    let line = s[i];
    text(line, 10, 20 + 14 * i);
  }
  // Draw Text
  noStroke();
  fill("#00ff00");
  textSize(12);
  textFont(google_font);
  text(">> 26.11", start_pos, WIDTH_HEIGHT - 15);
  noLoop();
}

function draw() {}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
