/**
 * extract and sort the color palette of an image
 *
 * MOUSE
 * position x          : resolution
 *
 * KEYS
 * 1-4                 : load different images
 * 5                   : no color sorting
 * 6                   : sort colors on hue
 * 7                   : sort colors on saturation
 * 8                   : sort colors on brightness
 * 9                   : sort colors on greyscale (luminance)
 * s                   : save png
 * c                   : save color palette (Adobe ASE format)
 */
"use strict";

let img;
let colors = [];
let sortMode = null;

// !! ALL imported images have to be 600 x 600 pixels
// for there to me a 1-1 to mapping of image size to canvas display size.
// This could be changed, but don't see the point in doing this.
// For making a palette, you would never want more than (600/5) * (600/5) = 14,400 colors

const WIDTH_HEIGHT = 600;
function preload() {
  loadImage("data/pic1.jpg", setImage);
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noCursor();
  noStroke();
}

function draw() {
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

  let i = 0;
  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      fill(colors[i]);
      rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
      i++;
    }
  }
}

function keyReleased() {
  if (key == "c" || key == "C")
    writeFile([gd.ase.encode(colors)], gd.timestamp(), "ase");
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");

  if (key == "1") loadImage("data/pic1.jpg", setImage);
  if (key == "2") loadImage("data/pic2.jpg", setImage);
  if (key == "3") loadImage("data/pic3.jpg", setImage);
  if (key == "4") loadImage("data/pic4.jpg", setImage);

  if (key == "5") sortMode = null;
  if (key == "6") sortMode = gd.HUE;
  if (key == "7") sortMode = gd.SATURATION;
  if (key == "8") sortMode = gd.BRIGHTNESS;
  if (key == "9") sortMode = gd.GRAYSCALE;
}

function setImage(loadedImageFile) {
  img = loadedImageFile;
}
