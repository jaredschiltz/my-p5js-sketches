const WIDTH_HEIGHT = 800;
const TOP_BOTTOM_BORDER_SPACING = 60;
const PATTERN_ASPECT_RATIO = 2.0 / 3.0; // 2 Width to 3 Height
const PATTERN_HEIGHT = WIDTH_HEIGHT - 2 * TOP_BOTTOM_BORDER_SPACING;
const PATTERN_WIDTH = PATTERN_HEIGHT * PATTERN_ASPECT_RATIO;
const LEFT_RIGHT_BOTTOM_BORDER_SPACING = (WIDTH_HEIGHT - PATTERN_WIDTH) / 2.0;
const BACKGROUND_COLOR = "#000000";
let PATTERN_PALETTE;
// These must be 3/2 ratio
const NUM_ROWS = 9;
const NUM_COLS = 6;

const FREQUENCY = 1.0; // Specifies probability that a GRID element will be displayed

const GRID_SIZE = PATTERN_HEIGHT / NUM_ROWS;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  PATTERN_PALETTE = ["#fe218b", "#fed700", "#21b0fe"];
}

function draw() {
  background(BACKGROUND_COLOR);
  noStroke();
  ellipseMode(CENTER);
  for (let y = 0; y < NUM_ROWS; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (random() < FREQUENCY) {
        noFill();
        push();
        translate(
          LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
          TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE
        );
        strokeWeight(10);
        translate(GRID_SIZE / 2, GRID_SIZE / 2);
        let random_rotation_selection = floor(random(3));
        let rotation_angle = 0;
        switch (random_rotation_selection) {
          case 0:
            rotation_angle = 0;
            break;
          case 1:
            rotation_angle = PI / 4;
            break;
          case 2:
            rotation_angle = -PI / 4;
            break;
        }
        rotate(rotation_angle);
        current_color = random(PATTERN_PALETTE);
        stroke(current_color);
        let height_scaling_factor = 5;
        line(
          -GRID_SIZE / 4,
          -GRID_SIZE / height_scaling_factor,
          -GRID_SIZE / 4,
          GRID_SIZE / height_scaling_factor
        );
        current_color = random(PATTERN_PALETTE);
        stroke(current_color);
        line(
          0,
          -GRID_SIZE / height_scaling_factor,
          0,
          GRID_SIZE / height_scaling_factor
        );
        current_color = random(PATTERN_PALETTE);
        stroke(current_color);
        line(
          GRID_SIZE / 4,
          -GRID_SIZE / height_scaling_factor,
          GRID_SIZE / 4,
          GRID_SIZE / height_scaling_factor
        );
        pop();
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
