let noise_scale = 0.1;

function setup() {
  createCanvas(400, 400);
  background_texture = createGraphics(width, height);
  background_texture.pixelDensity();
  background_texture.loadPixels();

  let d = pixelDensity();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          // loop over
          let index = 4 * ((y * d + j) * width * d + (x * d + i));
          let nvalue = map(
            noise(x * noise_scale, y * noise_scale),
            -1,
            1,
            100,
            255
          );
          let avalue = map(
            noise( x * noise_scale, y * noise_scale),
            -1,
            1,
            0,
            190
          );
          background_texture.pixels[index + 0] = nvalue;
          background_texture.pixels[index + 1] = nvalue;
          background_texture.pixels[index + 2] = nvalue;
          background_texture.pixels[index + 3] = avalue;
        }
      }
    }
  }

  /*
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      var index = (x + y * width) * 4;
      let avalue = map(noise((x + noise_offset1) * noise_scale, (y + noise_offset2) * noise_scale), -1, 1, 0, 190);
      nvalue = map(noise((x + noise_offset1) * noise_scale, (y + noise_offset2) * noise_scale), -1, 1, 200, 255);
      background_texture.pixels[index + 0] = nvalue;
      background_texture.pixels[index + 1] = nvalue;
      background_texture.pixels[index + 2] = nvalue;
      background_texture.pixels[index + 3] = avalue;
    }
  }
  */
  background_texture.updatePixels();
}

function draw() {
  background(255);
  noStroke()
  fill(255,0,0)
  circle(width/2, height/2, width/2)
  image(background_texture, 0, 0);
}
