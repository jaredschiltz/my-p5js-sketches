let inc = 0.01;
let zoff = 0;
let threshold = 90;
let water;
let land;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  noiseDetail(4);
  water = { r: 101, g: 164, b: 171 };
  land = { r: 252, g: 226, b: 178 };
  noLoop();
}

function draw() {
  let yoff = 0;
  loadPixels();
  for (let y = 0; y < height; y++) {
    var xoff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let value = noise(xoff, yoff, zoff) * 255;
      let colorSelect;
      if (value > threshold) {
        colorSelect = water;
      } else {
        colorSelect = land;
      }
      //console.log(c)
      pixels[index + 0] = colorSelect.r;
      pixels[index + 1] = colorSelect.g;
      pixels[index + 2] = colorSelect.b;
      pixels[index + 3] = 255;
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
}
