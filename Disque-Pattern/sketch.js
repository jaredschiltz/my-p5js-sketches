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
  STRIPED_LINES_COLOR = "#3B3F45";
  PATTERN_PALETTE = ["#7f58af", "#64c5eb", "#e84d8a", "#feb326"];
}
function draw() {
  background(BACKGROUND_COLOR);
  noStroke();
  ellipseMode(CORNER);
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (random() < FREQUENCY) {
        // Chose random pattern to fill the grid element with:
        // 0 - Left Arc
        // 1 - Right Arc
        // 2 - Top Arc
        // 3 - Bottom
        let shape = floor(random(4));
        let current_color = random(PATTERN_PALETTE);
        fill(current_color);
        STRIPE_THICKNESS = GRID_SIZE / 10;
        if (random() < 0.5) {
          // Draw Stripe
          if (random() < 0.5) {
            // Choose Horizontal Stripe
            for (let i = 0; i < 10; i++) {
              let stripe_color;
              if (i % 2 == 0) {
                stripe_color = STRIPED_LINES_COLOR;
              } else {
                stripe_color = BACKGROUND_COLOR;
              }
              fill(stripe_color);
              rect(
                LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
                TOP_BOTTOM_BORDER_SPACING +
                  y * GRID_SIZE +
                  i * STRIPE_THICKNESS,
                GRID_SIZE,
                STRIPE_THICKNESS
              );
            }
          } else {
            // Choose Vertical Stripe
            for (let i = 0; i < 10; i++) {
              let stripe_color;
              if (i % 2 == 0) {
                stripe_color = STRIPED_LINES_COLOR;
              } else {
                stripe_color = BACKGROUND_COLOR;
              }
              fill(stripe_color);
              rect(
                LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                  x * GRID_SIZE +
                  i * STRIPE_THICKNESS,
                TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
                STRIPE_THICKNESS,
                GRID_SIZE
              );
            }
          }
        }
        fill(current_color);
        switch (shape) {
          case 0:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
              PI / 2
            );

            break;
          case 1:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              1.5 * PI
            );

            break;
          case 2:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI
            );

            break;
          case 3:
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              0
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
