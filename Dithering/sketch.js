let img;
function preload() {
  img = loadImage("pug.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  noLoop();
}

function draw() {
  background(220);
  filter(GRAY);
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let i = (x + y * img.width) * 4;

      // Compute grayscale
      let oldPixel =
        0.299 * img.pixels[i] +
        0.587 * img.pixels[i + 1] +
        0.114 * img.pixels[i + 2];

      // Threshold to black or white
      let newPixel = oldPixel < 128 ? 0 : 255;
      let error = oldPixel - newPixel;

      img.pixels[i] = img.pixels[i + 1] = img.pixels[i + 2] = newPixel;

      // Distribute error (1/8) to Atkinson neighbors
      // Atikinson_Distribute_Error(x + 1, y, (error * 1) / 8);
      // Atikinson_Distribute_Error(x + 2, y, (error * 1) / 8);
      // Atikinson_Distribute_Error(x - 1, y + 1, (error * 1) / 8);
      // Atikinson_Distribute_Error(x, y + 1, (error * 1) / 8);
      // Atikinson_Distribute_Error(x + 1, y + 1, (error * 1) / 8);
      // Atikinson_Distribute_Error(x, y + 2, (error * 1) / 8);

      // Distribute all of the error to 4 neighbors (Floyd-Steinberg)
      Floyd_Steinberg_Distribute_Error(x + 1, y, (error * 7) / 16);
      Floyd_Steinberg_Distribute_Error(x - 1, y + 1, (error * 3) / 16);
      Floyd_Steinberg_Distribute_Error(x, y + 1, (error * 5) / 16);
      Floyd_Steinberg_Distribute_Error(x + 1, y + 1, (error * 1) / 16);
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function Atikinson_Distribute_Error(x, y, err) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let i = (x + y * img.width) * 4;
  img.pixels[i] = constrain(img.pixels[i] + err, 0, 255);
  img.pixels[i + 1] = constrain(img.pixels[i + 1] + err, 0, 255);
  img.pixels[i + 2] = constrain(img.pixels[i + 2] + err, 0, 255);
}

function Floyd_Steinberg_Distribute_Error(x, y, error) {
  // Prevent out-of-bounds
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;

  let index = (x + y * img.width) * 4;
  for (let i = 0; i < 3; i++) {
    let val = img.pixels[index + i] + error;
    img.pixels[index + i] = constrain(val, 0, 255);
  }
}
