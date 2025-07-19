const WIDTH = 800;
const HEIGHT = 800;
const HORIZONTAL_PIXELS = 64;
const VERTICAL_PIXELS = 64;
let grid;
const NUM_BALLS = 15;
let ball_array = [];
function preload() {}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = new Grid(
    { w: HORIZONTAL_PIXELS, h: VERTICAL_PIXELS },
    { w: WIDTH, h: HEIGHT }
  );
  for (let b = 0; b < NUM_BALLS; b++) {
    ball_array.push(
      new Ball(
        createVector(
          floor(random(HORIZONTAL_PIXELS)),
          floor(random(VERTICAL_PIXELS))
        ),
        createVector(HORIZONTAL_PIXELS - 1, VERTICAL_PIXELS - 1),
        0.5,
        color(255, 0, 0)
      )
    );
  }
}

function draw() {
  background(220);
  // Update ball positions once per frame
  for (let b = 0; b < NUM_BALLS; b++) {
    ball_array[b].update();
  }

  for (let y = 0; y < VERTICAL_PIXELS; y++) {
    for (let x = 0; x < HORIZONTAL_PIXELS; x++) {
      let field = 0;

      for (let i = 0; i < NUM_BALLS; i++) {
        let pos = ball_array[i].get_pos();
        let dx = pos.x - x;
        let dy = pos.y - y;
        let distSq = dx * dx + dy * dy + 1e-3; // avoid divide by zero
        field += 1 / distSq; // adjust strength here
      }

      // Clamp + normalize
      let maxField = 0.1; // try tuning this
      let norm = constrain(field / maxField, 0, 1);

      // Map to hue range (0 = red, 1 = violet, no wrap)
      let hue = norm * 300;

      let [r, g, b] = hsvToRgb(hue, 1, 1); // constant brightness
      grid.set_pixel(createVector(x, y), color(r * 255, g * 255, b * 255));
    }
  }
  grid.show();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function hsvToRgb(h, s, v) {
  // H is [0, 360]
  // S is [0, 1]
  // V is [0, 1]
  let c = v * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = v - c;

  let r1, g1, b1;

  if (h < 60) {
    [r1, g1, b1] = [c, x, 0];
  } else if (h < 120) {
    [r1, g1, b1] = [x, c, 0];
  } else if (h < 180) {
    [r1, g1, b1] = [0, c, x];
  } else if (h < 240) {
    [r1, g1, b1] = [0, x, c];
  } else if (h < 300) {
    [r1, g1, b1] = [x, 0, c];
  } else {
    [r1, g1, b1] = [c, 0, x];
  }

  let r = r1 + m;
  let g = g1 + m;
  let b = b1 + m;

  return [r, g, b]; // values in [0, 1]; multiply by 255 for 8-bit RGB
}
