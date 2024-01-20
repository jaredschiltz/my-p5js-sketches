const WIDTH_HEIGHT = 800;
const NUM_CELLS = 20;
const CELL_WIDTH_HEIGHT = WIDTH_HEIGHT / NUM_CELLS;
const RADIUS_SCALING = 1.0;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  ellipseMode(CENTER);
  colorMode(HSB);
}

function draw() {
  background(0, 255, 0);
  noStroke();
  let t = frameCount / 30;
  for (let y = 0; y < NUM_CELLS; y++) {
    for (let x = 0; x < NUM_CELLS; x++) {
      //console.log(map(wobbly_sinusoid(t, x, y), -3.0, 3.0, 0.1, 0.9));
      fill(map(wobbly_sinusoid(x, y, t), -1.0, 2.0, 30, 50), 255, 255);
      circle(
        CELL_WIDTH_HEIGHT / 2 + x * CELL_WIDTH_HEIGHT,
        CELL_WIDTH_HEIGHT / 2 + y * CELL_WIDTH_HEIGHT,
        CELL_WIDTH_HEIGHT * map(wobbly_sinusoid(x, y, t), -3.0, 3.0, 0.0, 1.0)
      );
    }
  }
}

function wobbly_sinusoid(x, y, t) {
  return (
    sin(2.31 * x + 0.11 * t + 5.95 + 2.57 * sin(1.73 * y - 0.65 * t + 1.87)) +
    sin(3.09 * y - 0.28 * t + 4.15 + 2.31 * sin(2.53 * x + 0.66 * t + 4.45)) +
    sin(3.06 * x - 0.18 * t + 5.16 + 2.28 * sin(2.27 * y + 0.71 * t + 3.97)) +
    sin(5.4 * y - 0.13 * t + 4.74 + 2.83 * sin(3.71 * x + 0.96 * t + 4.42)) / 2
  );
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
