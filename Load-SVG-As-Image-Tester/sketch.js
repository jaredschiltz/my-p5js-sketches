// This program demonstrates that you can't work with native SVG images
// You can import them as images, but unfortunately, there is no way to
// specify the output size before the get rasterized.
//
// To make the SVG images look decent, you must set their height and width to
// the exact size you want them to appear in the p5js canvas, or they will look
// awful -- just like pngs and jpegs :(
const WIDTH_HEIGHT = 800;
let small_image;
let large_image;
function preload() {
  small_image = loadImage("small_svg.svg"); // This is 10x10 pixels
  large_image = loadImage("large_svg.svg"); // This is 300x300
}

function setup() {
  createCanvas(1600, 800);
  noLoop();
}

function draw() {
  background(255);
  image(small_image, 0, 0, 800, 800);
  image(large_image, 800, 0, 800, 800);
}
function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
