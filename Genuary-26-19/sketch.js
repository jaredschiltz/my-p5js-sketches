/*
Genuary 2026 - January 19: 16 x 16
*/

const HORIZONTAL_PIXELS = 16;
const VERTICAL_PIXELS = 16;
let grid;
const NUM_BALLS = 2;
let ball_array = [];

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let frameCounter = 0;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#252422");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  grid = new Grid(
    { w: HORIZONTAL_PIXELS, h: VERTICAL_PIXELS },
    { w: WIDTH_HEIGHT, h: WIDTH_HEIGHT }
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
  //noLoop();
}

function draw() {
  background(background_color);
  // Update ball positions once per frame
  if (frameCounter % 2 == 0) {
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
        let maxField = 0.3; // try tuning this
        let norm = constrain(field / maxField, 0, 1);

        // Map to hue range (0 = red, 1 = violet, no wrap)
        let hue = norm * 300;

        let [r, g, b] = hsvToRgb(hue, 1, 1); // constant brightness
        grid.set_pixel(createVector(x, y), color(r * 255, g * 255, b * 255));
      }
    }
  }
  grid.show();

  // Draw Border
  /*
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.19", start_pos, WIDTH_HEIGHT - 15);

  frameCounter++;
}

function keyPressed() {
  if (key == "s" || key == "S") {
    //saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
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
