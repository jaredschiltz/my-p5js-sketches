const GAP = 8.0;
const SQUARE_SIDE_LENGTH = 50;
const MIN_SIDE_LENGTH = 10;
const WIDTH_HEIGHT = 600;
let BORDER_WIDTH;
let NUM_SQUARES;
let cnv;

function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  NUM_SQUARES = width / (SQUARE_SIDE_LENGTH + GAP);
  NUM_SQUARES = floor(NUM_SQUARES);
  let frame_width = NUM_SQUARES * SQUARE_SIDE_LENGTH + (NUM_SQUARES - 1) * GAP;
  BORDER_WIDTH = (width - frame_width) / 2.0;
  colorMode(HSB);
  noLoop();
}

function draw() {
  background(0);
  push();
  translate(BORDER_WIDTH, BORDER_WIDTH);
  for (let i = 0; i < NUM_SQUARES; i++) {
    for (let j = 0; j < NUM_SQUARES; j++) {
      draw_rect(
        j * (SQUARE_SIDE_LENGTH + GAP),
        i * (SQUARE_SIDE_LENGTH + GAP),
        SQUARE_SIDE_LENGTH
      );
    }
  }
  pop();
  //save(cnv, "vera_molnar_3.jpg");
}

function draw_rect(x, y, side_length) {
  noFill();
  stroke(color(random(0, 360), 80, 100));
  strokeWeight(1);
  if (side_length < MIN_SIDE_LENGTH) {
    return;
  }
  rect(x, y, side_length, side_length);
  let next_length = side_length * random(0.9, 0.5);
  let next_x = x + (side_length - next_length) / 2.0;
  let next_y = y + (side_length - next_length) / 2.0;
  draw_rect(next_x, next_y, next_length);
}
