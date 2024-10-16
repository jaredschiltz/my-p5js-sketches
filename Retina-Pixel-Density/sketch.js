function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);
  loadPixels();
  // For Retina display, pixelDensity() will return value of 2
  let d = pixelDensity();
  let xoff = 0.0;
  for (let x = 0; x < width * d; x++) {
    let yoff = 0.0;
    for (let y = 0; y < height * d; y++) {
      let index = (x + y * width * d) * 4;
      let bright = map(noise(xoff, yoff), 0, 1, 0, 255);
      pixels[index] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;
      yoff += 0.001;
    }
    xoff += 0.001;
  }
  updatePixels()
}
