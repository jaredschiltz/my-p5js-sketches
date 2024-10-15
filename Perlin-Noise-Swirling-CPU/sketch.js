let bg; // Image to use as the background of the effect

const noiseScale = 0.01;
let inc = 0.02;

let zoff = 0;

const colours = ["#ff5500", "#55ff00", "#ffdd00", "#55ddff"];
  const numBands = 32;

function setup() {
  createCanvas(800, 800);
  //noLoop()
}

function draw() {
  loadPixels()
  let d = pixelDensity();
  for (x = 0; x < width / 2; x++) {
    for (y = 0; y < height / 2; y++) {
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          // loop over
          index = 4 * ((y * d + j) * width * d + (x * d + i));
          const n = noise(x * noiseScale, y * noiseScale, zoff);
          const band = int(n * numBands);
          const colour = band % colours.length;
          let selected_color = color(colours[colour])
          pixels[index] = selected_color._array[0] * 255;
          pixels[index + 1] = selected_color._array[1] * 255;
          pixels[index + 2] = selected_color._array[2] * 255;
          pixels[index + 3] = 255;
        }
      }
     
    }
   
  }
  updatePixels()
    zoff += inc;
}

function createBG() {
  const numBands = 16;

  for (let i = 0; i < bg.width; i++) {
    for (let j = 0; j < bg.height; j++) {
      // Get the noise at the current pixel
      const n = noise(i * noiseScale + xoff, j * noiseScale + xoff);

      // Turn the noise into a colour
      const band = int(n * numBands);
      const colour = band % colours.length;

      // Draw a point at the current location
      bg.stroke(colours[colour]);
      bg.point(i, j);
    }
  }
}
