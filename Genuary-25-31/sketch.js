/*
Genuary 2025 - January 31st Prompt: Pixel Sorting
*/
/**
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 5                   : no color sorting
 * 6                   : sort colors on hue
 * 7                   : sort colors on saturation
 * 8                   : sort colors on brightness
 * 9                   : sort colors on greyscale (luminance)
 * s                   : save png
 */
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let img;
let colors = [];
let sortMode = null;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
  img = loadImage("./pexels-postiglioni-792696.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  background_color = color("#FAF9F6");
  foreground_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
}

function draw() {
  background(background_color);
  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  /*
  noStroke();
  fill(color_one);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */

  let tileCount = floor(width / max(mouseX, 5));
  let rectSize = width / tileCount;

  img.loadPixels();
  colors = [];

  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let px = int(gridX * rectSize);
      let py = int(gridY * rectSize);
      let i = (py * img.width + px) * 4;
      let c = color(
        img.pixels[i],
        img.pixels[i + 1],
        img.pixels[i + 2],
        img.pixels[i + 3]
      );
      colors.push(c);
    }
  }

  gd.sortColors(colors, sortMode);

  let display_rect_size = border_size / tileCount;
  let i = 0;
  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      rect(
        start_pos + gridX * display_rect_size,
        start_pos + gridY * display_rect_size,
        display_rect_size,
        display_rect_size
      );
      i++;
    }
  }

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 25.31", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }

  if (key == "5") sortMode = null;
  if (key == "6") sortMode = gd.HUE;
  if (key == "7") sortMode = gd.SATURATION;
  if (key == "8") sortMode = gd.BRIGHTNESS;
  if (key == "9") sortMode = gd.GRAYSCALE;
}
