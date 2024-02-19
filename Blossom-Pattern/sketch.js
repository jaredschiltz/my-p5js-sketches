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

const FREQUENCY = 1.0; // Specifies probability that a GRID element will be displayed

const GRID_SIZE = PATTERN_HEIGHT / NUM_ROWS;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  PATTERN_PALETTE = [
    color(255, 161, 198), // Pink
    color(63, 255, 178), // Aqua Green
    color(62, 236, 255), // Sky Blue
    color(236, 255, 61), // Yellow
    color(255, 61, 139), // Lipstick Red
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
        // 0 - Horizontal Square
        // 1 - Vertical Square
        // 2 - Horizontal Circle
        // 3 - Vertical Circle
        // 4 - Blossom Up
        // 5 - Blossom Down
        // 6 - Horizontal Star
        // 7 - Vertical Star

        let shape = floor(random(8));
        let current_color_1 = random(PATTERN_PALETTE);
        let current_color_2 = random(PATTERN_PALETTE);
        switch (shape) {
          case 0:
            fill(current_color_1);
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              0.5 * GRID_SIZE
            );
            fill(current_color_2);
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              0.5 * GRID_SIZE
            );

            break;
          case 1:
            fill(current_color_1);
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              0.5 * GRID_SIZE,
              GRID_SIZE
            );
            fill(current_color_2);
            rect(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE * 0.5,
              GRID_SIZE
            );

            break;
          case 2:
            fill(current_color_1);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI
            );
            fill(current_color_2);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              TWO_PI
            );

            break;
          case 3:
            fill(current_color_1);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
              PI / 2
            );
            fill(current_color_2);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              1.5 * PI
            );

            break;
          case 4:
            fill(current_color_1);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
              0
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              PI
            );
            fill(current_color_2);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              1.5 * PI
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI / 2
            );

            break;
          case 5:
            fill(current_color_1);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
              0
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              PI
            );
            fill(current_color_2);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              1.5 * PI
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI / 2
            );

            break;
          case 6:
            fill(current_color_1);
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE
            );
            fill(current_color_2);
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE
            );
            // Now "punch" out the triangles with arcs to make stars
            fill(BACKGROUND_COLOR);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI / 2
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              PI
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,

              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              1.5 * PI
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,

              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
              0
            );

            break;
          case 7:
            fill(current_color_1);
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE
            );
            fill(current_color_2);
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE
            );
            // Now "punch" out the triangles with arcs to make stars
            fill(BACKGROUND_COLOR);
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              0,
              PI / 2
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI / 2,
              PI
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE +
                0.5 * GRID_SIZE,

              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              PI,
              1.5 * PI
            );
            arc(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING +
                x * GRID_SIZE -
                0.5 * GRID_SIZE,

              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + 0.5 * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE,
              1.5 * PI,
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
