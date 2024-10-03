const WIDTH_HEIGHT = 700;
const NUM_DOTS_PER_WIDTH_HEIGHT = 50;
const BORDER_WIDTH = 80;
const FRAME_RATE = 60;
let DOT_ANGLE_ARRAY = new Array(
  NUM_DOTS_PER_WIDTH_HEIGHT * NUM_DOTS_PER_WIDTH_HEIGHT
);
let DOT_ANGLE_INCREMENT;
let frames_for_one_rotation;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  angleMode(RADIANS);
  for (let i = 0; i < DOT_ANGLE_ARRAY.length; i++) {
    DOT_ANGLE_ARRAY[i] = sin(i * 0.6);
  }
  frameRate(FRAME_RATE);
  DOT_ANGLE_INCREMENT = PI / 60;
  // Calculate number of seconds to animate GIF, so that the loop is
  // seamless
  frames_for_one_rotation = TWO_PI / DOT_ANGLE_INCREMENT;
}

function draw() {
  background(220);
  fill(0);
  const DOT_OFFSET = (width - 2 * BORDER_WIDTH) / NUM_DOTS_PER_WIDTH_HEIGHT;
  const CIRCLE_RADIUS = DOT_OFFSET;
  for (let row = 0; row < NUM_DOTS_PER_WIDTH_HEIGHT; row++) {
    for (let col = 0; col < NUM_DOTS_PER_WIDTH_HEIGHT; col++) {
      let x_center = BORDER_WIDTH + DOT_OFFSET + row * DOT_OFFSET;
      let y_center = BORDER_WIDTH + DOT_OFFSET + col * DOT_OFFSET;
      //circle(x_center, y_center, 1);
      let index = row * NUM_DOTS_PER_WIDTH_HEIGHT + col;
      circle(
        x_center + CIRCLE_RADIUS * cos(DOT_ANGLE_ARRAY[col]),
        y_center + CIRCLE_RADIUS * sin(DOT_ANGLE_ARRAY[row]),
        5
      );
    }
  }
  for (let i = 0; i < DOT_ANGLE_ARRAY.length; i++) {
    DOT_ANGLE_ARRAY[i] += DOT_ANGLE_INCREMENT;
  }
}

function keyPressed() {
  if (key == "s") {
    // setup saveGif function to use frames argument, instead of secondes
    let options = {
      units: "frames",
    };
    saveGif("animation.gif", frames_for_one_rotation, options);
  }
}
