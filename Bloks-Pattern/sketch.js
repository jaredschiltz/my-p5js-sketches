const WIDTH_HEIGHT = 800;
const TOP_BOTTOM_BORDER_SPACING = 60;
const PATTERN_ASPECT_RATIO = 2.0 / 3.0; // 2 Width to 3 Height
const PATTERN_HEIGHT = WIDTH_HEIGHT - 2 * TOP_BOTTOM_BORDER_SPACING;
const PATTERN_WIDTH = PATTERN_HEIGHT * PATTERN_ASPECT_RATIO;
const LEFT_RIGHT_BOTTOM_BORDER_SPACING = (WIDTH_HEIGHT - PATTERN_WIDTH) / 2.0;
const BACKGROUND_COLOR = "#ffffff";
let PATTERN_PALETTE;
// These must be 3/2 ratio
const NUM_ROWS = 6;
const NUM_COLS = 4;

const FREQUENCY = 0.8; // Specifies probability that a GRID element will be displayed

const GRID_SIZE = PATTERN_HEIGHT / NUM_ROWS;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  PATTERN_PALETTE = ["#3B3F45", "#ff4e00", "#8ea604", "#f5bb00", "#ec9f05"];
}
function draw() {
  background(BACKGROUND_COLOR);
  noStroke();
  ellipseMode(CORNER);
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (random() < FREQUENCY) {
        // Chose random pattern to fill the grid element with:
        // 0 - Left Arc with Square
        // 1 - Right Arc with Square
        // 2 - Top Arc with Square
        // 3 - Bottom Acc with Square
        // 4 - Circle
        let shape = floor(random(5));
        let current_color = random(PATTERN_PALETTE);
        fill(current_color);
        stroke(current_color); // Need some stroke thickness to avoid gaps between shapes
        switch (shape) {
          case 0:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              1.5 * PI
            );
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              0.5 * GRID_SIZE,
              GRID_SIZE
            );
            break;
          case 1:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
              PI / 2
            );
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              0.5 * GRID_SIZE,
              GRID_SIZE
            );
            break;
          case 2:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              0
            );
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              0.5 * GRID_SIZE
            );

            break;
          case 3:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI
            );
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              0.5 * GRID_SIZE
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
