let noise_scale = 0.005;
let noise_offset1 = 2000;
let noise_offset2 = 8000;

function setup() {
  createCanvas(405, 720);
  noLoop();
}

function draw() {
  background(220);
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      let red_noise_value = noise(col * noise_scale, row * noise_scale);
      let green_noise_value = noise(
        (col + noise_offset1) * noise_scale,
        (row + noise_offset1) * noise_scale
      );
      let blue_noise_value = noise(
        (col + noise_offset2) * noise_scale,
        (row + noise_offset2) * noise_scale
      );
      stroke(
        255 * red_noise_value,
        255 * green_noise_value,
        255 * blue_noise_value
      );
      strokeWeight(3);
      point(col, row);
    }
  }
}
