const WIDTH_HEIGHT = 800;
let cnv;
let wave_array;
const WAVE_LINE_LENGTH = 600;
const WAVE_LINE_Y_START = (WIDTH_HEIGHT - 600) / 2.0;
const WAVE_LINE_Y_END = WIDTH_HEIGHT - WAVE_LINE_Y_START;
const NUM_LINES = 9;
const LINE_SPACING = WIDTH_HEIGHT / (NUM_LINES + 1);
const ARC_WIDTH_HEIGHT = 72;
const ARC_POS_START_PERCENT = 0.15;
const ARC_POS_Y_MIN_LIMIT =
  WAVE_LINE_Y_START + ARC_POS_START_PERCENT * WAVE_LINE_LENGTH;
const ARC_POS_Y_MAX_LIMIT =
  WAVE_LINE_Y_END - ARC_POS_START_PERCENT * WAVE_LINE_LENGTH;

const WAVE_SPEED = 0.05;
const WAVE_FREQUENCY = 3;
let blue_color;

function preload() {}

function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  wave_array = new Array(NUM_LINES);
  blue_color = color("#3A5FA3");
  black_color = color("#000000");
  bg_color = color("#ECE4D2");
  for (let i = 0; i < wave_array.length; i++) {
    if (i % 2 == 0) {
      wave_array[i] = {
        colour: blue_color,
        y_pos: map(
          sin((i / wave_array.length) * WAVE_FREQUENCY),
          -1.0,
          1.0,
          ARC_POS_Y_MIN_LIMIT,
          ARC_POS_Y_MAX_LIMIT
        ),
      };
    } else {
      wave_array[i] = {
        colour: black_color,
        y_pos: map(
          sin(i / wave_array.length),
          -1.0,
          1.0,
          ARC_POS_Y_MIN_LIMIT,
          ARC_POS_Y_MAX_LIMIT
        ),
      };
    }
  }
}

function draw() {
  background(bg_color);
  strokeWeight(24);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  noFill();
  for (let i = 0; i < NUM_LINES; i++) {
    stroke(wave_array[i].colour);
    line(
      LINE_SPACING + i * LINE_SPACING,
      WAVE_LINE_Y_START,
      LINE_SPACING + i * LINE_SPACING,
      wave_array[i].y_pos - ARC_WIDTH_HEIGHT / 2 + 12
    );
    line(
      LINE_SPACING + i * LINE_SPACING,
      wave_array[i].y_pos + ARC_WIDTH_HEIGHT / 2 - 12,
      LINE_SPACING + i * LINE_SPACING,
      WAVE_LINE_Y_END
    );

    arc(
      LINE_SPACING + i * LINE_SPACING,
      wave_array[i].y_pos,
      ARC_WIDTH_HEIGHT,
      ARC_WIDTH_HEIGHT,
      -PI / 2,
      PI / 2
    );
  }
  // Update Arc positions
  for (let i = 0; i < wave_array.length; i++) {
    wave_array[i].y_pos = map(
      sin((i / wave_array.length) * WAVE_FREQUENCY + frameCount * WAVE_SPEED),
      -1.0,
      1.0,
      ARC_POS_Y_MIN_LIMIT,
      ARC_POS_Y_MAX_LIMIT
    );
  }
}

function keyPressed() {
  if (key == "s") {
    saveGif("mygif", 10);
  }
}
