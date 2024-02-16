const WIDTH_HEIGHT = 800;
const TOP_BOTTOM_BORDER_SPACING = 60;
const PATTERN_ASPECT_RATIO = 2.0 / 3.0; // 2 Width to 3 Height
const PATTERN_HEIGHT = WIDTH_HEIGHT - 2 * TOP_BOTTOM_BORDER_SPACING;
const PATTERN_WIDTH = PATTERN_HEIGHT * PATTERN_ASPECT_RATIO;
const LEFT_RIGHT_BOTTOM_BORDER_SPACING = (WIDTH_HEIGHT - PATTERN_WIDTH) / 2.0;
const BACKGROUND_COLOR = "#ffffff";
let PATTERN_PALETTE;
// These must be 3/2 ratio
const NUM_ROWS = 9;
const NUM_COLS = 6;

const FREQUENCY = 1.0; // Specifies probability that a GRID element will be displayed

const GRID_SIZE = PATTERN_HEIGHT / NUM_ROWS;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  PATTERN_PALETTE = [
    color(59, 63, 69),
    color(63, 255, 178),
    color(62, 236, 255),
    color(151, 244, 255),
    color(255, 61, 139),
  ];
}

function draw() {
  background(BACKGROUND_COLOR);
  noStroke();
  ellipseMode(CORNER);
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (random() < FREQUENCY) {
        // Chose random pattern to fill the grid element with:
        // 0 - Upper Left Arc
        // 1 - Upper Right Arc
        // 2 - Lower Left Arc
        // 3 - Lower Right Arc
        // 4 - Circle
        let shape = floor(random(5));
        let current_color = random(PATTERN_PALETTE);
        fill(current_color);
        stroke(current_color); // Need some stroke thickness to avoid gaps between shapes
        switch (shape) {
          case 0:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE - GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - GRID_SIZE,
              GRID_SIZE * 2,
              GRID_SIZE * 2,
              0,
              PI / 2
            );
            break;
          case 1:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - GRID_SIZE,
              GRID_SIZE * 2,
              GRID_SIZE * 2,
              PI / 2,
              PI
            );
            break;
          case 2:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE - GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE * 2,
              GRID_SIZE * 2,
              (PI * 3) / 2,
              TWO_PI
            );

            break;
          case 3:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE * 2,
              GRID_SIZE * 2,
              PI,
              (PI * 3) / 2
            );

            break;
          case 4:
            circle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE
            );
            break;
        }
      }
    }
  }
  noLoop();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
