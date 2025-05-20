// This sketch generates converts the Starry Night photo to a binary file
// that can be loaded on the M4 Matrix Portal board
// This binary file is 64 * x 64 * 2 (2 bytes for 565 color format)
// To generate a C header from the binary, do this:
// xxd -i pixels.rgb > pixels.h

let img;
let img_width;
let img_height;
let cell_size = 16;
let rgb565_array;

// Converts 24-bit RGB to 16-bit RGB565
function rgb888to565(r, g, b) {
  return ((r & 0b11111000) << 8) | ((g & 0b11111100) << 3) | (b >> 3);
}

function exportBinary(uint8Array, filename) {
  let blob = new Blob([uint8Array], { type: "application/octet-stream" });
  let url = URL.createObjectURL(blob);

  let a = createA(url, filename);
  a.attribute("download", filename);
  a.hide();
  a.elt.click();

  URL.revokeObjectURL(url); // Clean up
}

function preload() {
  img = loadImage('starry_night.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img_width = img.width;
  img_height = img.height;
  noLoop();

  // Initialize Uint8Array to hold 2 bytes per pixel
  rgb565_array = new Uint8Array(floor(img_width/cell_size) * floor(img_height/cell_size) * 2);
  console.log("rgb565_array start length:", rgb565_array.length);
}

function draw() {
  background(0);
  noStroke();
  img.loadPixels();

  let idx = 0; // Index for rgb565_array

  let total_calls = 0
  for (let row = 0; row < img_height; row += cell_size) {
    for (let col = 0; col < img_width; col += cell_size) {
      let pixel_color = img.get(col + cell_size / 2, row + cell_size / 2);
      let rgb565 = rgb888to565(pixel_color[0], pixel_color[1], pixel_color[2]);

      rgb565_array[idx++] = rgb565 >> 8;   // high byte
      rgb565_array[idx++] = rgb565 & 0xFF; // low byte

      fill(pixel_color);
      rect(col, row, cell_size, cell_size);
      total_calls++
    }
  }

  img.updatePixels();
  print(total_calls)
  console.log("rgb565_array length:", rgb565_array.length);
}

function keyPressed() {
  exportBinary(rgb565_array, "pixels_rgb565.bin");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
