const WIDTH_HEIGHT = 800;
const TOP_BOTTOM_BORDER_SPACING = 60;
const PATTERN_ASPECT_RATIO = 2.0 / 3.0; // 2 Width to 3 Height
const PATTERN_HEIGHT = WIDTH_HEIGHT - 2 * TOP_BOTTOM_BORDER_SPACING;
const PATTERN_WIDTH = PATTERN_HEIGHT * PATTERN_ASPECT_RATIO;
const LEFT_RIGHT_BOTTOM_BORDER_SPACING = (WIDTH_HEIGHT - PATTERN_WIDTH) / 2.0;
const BACKGROUND_COLOR = "#ffffff";
const STRIPED_PROBABILITY = 0.2;
let PATTERN_PALETTE;
// These must be 3/2 ratio
const NUM_ROWS = 6;
const NUM_COLS = 4;

const FREQUENCY = 1.0; // Specifies probability that a GRID element will be displayed

const GRID_SIZE = PATTERN_HEIGHT / NUM_ROWS;
//const STRIPE_SIZE = GRID_SIZE / 10;

let striped_graphics_minus_45;
let striped_graphics_plus_45;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  let black_color = color(35, 37, 41).toString("#rrggbb");
  let dark_blue = color(62, 139, 255).toString("#rrggbb");
  let green = color(63, 255, 178).toString("#rrggbb");
  let light_blue = color(62, 236, 255).toString("#rrggbb");

  PATTERN_PALETTE = [black_color, dark_blue, green, light_blue];

  striped_graphics_minus_45 = createGraphics(2 * GRID_SIZE, 2 * GRID_SIZE);
  draw_striped_circle(striped_graphics_minus_45, 1);
  striped_graphics_plus_45 = createGraphics(2 * GRID_SIZE, 2 * GRID_SIZE);
  draw_striped_circle(striped_graphics_plus_45, -1);
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
        // 4 - Big Circle
        // 5 - Little Circle
        // 6 - Upper Left Triangle
        // 7 - Upper Right Triangle
        // 8 - Lower Left Triangle
        // 9 - Lower Right Triangle
        let shape = floor(random(10));
        let current_color = random(PATTERN_PALETTE);
        fill(current_color);
        stroke(current_color); // Need some stroke thickness to avoid gaps between shapes
        let striped_arc_color = PATTERN_PALETTE[0];
        switch (shape) {
          case 0:
            if (random() > STRIPED_PROBABILITY) {
              // 50% change of drawing solid arc vs striped arc
              // Solid Arc
              arc(
                LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE - GRID_SIZE,
                TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - GRID_SIZE,
                GRID_SIZE * 2,
                GRID_SIZE * 2,
                0,
                PI / 2
              );
            } else {
              // Striped Arc,
              // 50% chance of stripes at -45 degrees or 45 degrees
              if (random() < 0.5) {
                copy(
                  striped_graphics_minus_45,
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2)
                );
              } else {
                copy(
                  striped_graphics_plus_45,
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2)
                );
              }
            }
            break;
          case 1:
            if (random() > STRIPED_PROBABILITY) {
              // 50% change of drawing solid arc vs striped arc
              // Solid Arc
              arc(
                LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
                TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE - GRID_SIZE,
                GRID_SIZE * 2,
                GRID_SIZE * 2,
                PI / 2,
                PI
              );
            } else {
              // Striped Arc,
              // 50% chance of stripes at -45 degrees or 45 degrees
              if (random() < 0.5) {
                copy(
                  striped_graphics_minus_45,
                  round(0),
                  round(striped_graphics_minus_45.height / 2),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2)
                );
              } else {
                copy(
                  striped_graphics_plus_45,
                  round(0),
                  round(striped_graphics_plus_45.height / 2),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2)
                );
              }
            }

            break;
          case 2:
            if (random() > STRIPED_PROBABILITY) {
              arc(
                LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE - GRID_SIZE,
                TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
                GRID_SIZE * 2,
                GRID_SIZE * 2,
                (PI * 3) / 2,
                TWO_PI
              );
            } else {
              // Striped Arc,
              // 50% chance of stripes at -45 degrees or 45 degrees
              if (random() < 0.5) {
                copy(
                  striped_graphics_minus_45,
                  round(striped_graphics_minus_45.width / 2),
                  round(0),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2)
                );
              } else {
                copy(
                  striped_graphics_plus_45,
                  round(striped_graphics_plus_45.width / 2),
                  round(0),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2)
                );
              }
            }

            break;
          case 3:
            if (random() > STRIPED_PROBABILITY) {
              arc(
                LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
                TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
                GRID_SIZE * 2,
                GRID_SIZE * 2,
                PI,
                (PI * 3) / 2
              );
            } else {
              // Striped Arc,
              // 50% chance of stripes at -45 degrees or 45 degrees
              if (random() < 0.5) {
                copy(
                  striped_graphics_minus_45,
                  round(0),
                  round(0),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_minus_45.width / 2),
                  round(striped_graphics_minus_45.height / 2)
                );
              } else {
                copy(
                  striped_graphics_plus_45,
                  round(0),
                  round(0),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2),
                  round(LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE),
                  round(TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE),
                  round(striped_graphics_plus_45.width / 2),
                  round(striped_graphics_plus_45.height / 2)
                );
              }
            }

            break;
          case 4:
            circle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              GRID_SIZE
            );
            break;
          case 5:
            circle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE / 4,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE / 4,
              GRID_SIZE * 0.5
            );
            break;

          case 6:
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE
            );
            break;
          case 7:
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE
            );

            break;
          case 8:
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE
            );

            break;
          case 9:
            triangle(
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE + GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE,
              LEFT_RIGHT_BOTTOM_BORDER_SPACING + x * GRID_SIZE,
              TOP_BOTTOM_BORDER_SPACING + y * GRID_SIZE + GRID_SIZE
            );

            break;
        }
      }
    }
  }

  noLoop();
}

function draw_striped_circle(graphics, slope) {
  let grid_spacing = GRID_SIZE / 10;
  let radius = GRID_SIZE;
  // For angle of PI/4, max and min y:
  let max_min_x = (radius * radius) / (radius * cos(PI / 4));
  graphics.background(0, 0, 0, 0);
  graphics.translate(graphics.width / 2, graphics.height / 2);
  graphics.fill(PATTERN_PALETTE[0]);
  graphics.stroke(PATTERN_PALETTE[0]);

  // Draw Stripes
  for (let x = 0; x < max_min_x; x += 2 * grid_spacing) {
    let solutions = compute_intersection_of_circle_and_line(
      slope,
      x,
      0,
      0,
      0,
      radius
    );
    let next_solutions;
    if (x + grid_spacing > max_min_x) {
      next_solutions = compute_intersection_of_circle_and_line(
        slope,
        max_min_x,
        0,
        0,
        0,
        radius
      );
    } else {
      next_solutions = compute_intersection_of_circle_and_line(
        slope,
        x + grid_spacing,
        0,
        0,
        0,
        radius
      );
    }
    graphics.beginShape();
    graphics.vertex(solutions[0].x, solutions[0].y);
    graphics.vertex(solutions[1].x, solutions[1].y);
    graphics.vertex(next_solutions[1].x, next_solutions[1].y);
    graphics.vertex(next_solutions[0].x, next_solutions[0].y);
    graphics.endShape();
  }
  for (let x = -grid_spacing; x > -max_min_x; x -= 2 * grid_spacing) {
    let solutions = compute_intersection_of_circle_and_line(
      slope,
      x,
      0,
      0,
      0,
      radius
    );
    let next_solutions;
    if (x - grid_spacing < -max_min_x) {
      next_solutions = compute_intersection_of_circle_and_line(
        slope,
        -max_min_x,
        0,
        0,
        0,
        radius
      );
    } else {
      next_solutions = compute_intersection_of_circle_and_line(
        slope,
        x - grid_spacing,
        0,
        0,
        0,
        radius
      );
    }
    graphics.beginShape();
    graphics.vertex(solutions[0].x, solutions[0].y);
    graphics.vertex(solutions[1].x, solutions[1].y);
    graphics.vertex(next_solutions[1].x, next_solutions[1].y);
    graphics.vertex(next_solutions[0].x, next_solutions[0].y);
    graphics.endShape();
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function compute_intersection_of_circle_and_line(
  slope,
  x1,
  y1,
  cx,
  cy,
  radius
) {
  // Derived this equation by using two formulas:
  // 1) y = slope * (x - x1) + y1
  // 2) (x - cx)^2 + (y - cy)^2 = R^2
  // 3) plugged equation #1 into equation #2 and solved
  //    for x. Used symbolab.com to solve for x. Pretty nasty.
  // The resulting formula is computed below
  let radical = sqrt(
    radius * radius +
      slope * slope * radius * radius +
      2 * cx * slope * slope * x1 +
      2 * cx * slope * cy +
      2 * slope * x1 * y1 +
      2 * y1 * cy -
      cx * cx * slope * slope -
      2 * cx * slope * y1 -
      slope * slope * x1 * x1 -
      2 * slope * x1 * cy -
      y1 * y1 -
      cy * cy
  );
  let x_solution_1 =
    (cx + slope * slope * x1 - slope * y1 + slope * cy + radical) /
    (1 + slope * slope);
  let x_solution_2 =
    (cx + slope * slope * x1 - slope * y1 + slope * cy - radical) /
    (1 + slope * slope);
  let y_solution_1 = slope * (x_solution_1 - x1) + y1;
  let y_solution_2 = slope * (x_solution_2 - x1) + y1;
  let solution_vector = [];
  solution_vector[0] = createVector(x_solution_1, y_solution_1);
  solution_vector[1] = createVector(x_solution_2, y_solution_2);
  return solution_vector;
}
