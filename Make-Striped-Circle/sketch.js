let radius = 200;
let slope = 1;
let grid_spacing;

function setup() {
  createCanvas(400, 400);
  grid_spacing = radius / 10;
}

function draw() {
  // For angle of PI/4, max and min y:
  let max_min_x = (radius * radius) / (radius * cos(PI / 4));
  background(220);
  translate(width / 2, height / 2);
  //rotate(PI/2)
  /*
  noFill();
  circle(0, 0, radius * 2);
  line(-width, 0, width, 0);
  line(0, -height, 0, height);
  */

  fill("#000000");

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
    beginShape();
    vertex(solutions[0].x, solutions[0].y);
    vertex(solutions[1].x, solutions[1].y);
    vertex(next_solutions[1].x, next_solutions[1].y);
    vertex(next_solutions[0].x, next_solutions[0].y);
    endShape();
  }
  for (let x = -grid_spacing; x > -max_min_x; x -= 2*grid_spacing) {
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
    beginShape();
    vertex(solutions[0].x, solutions[0].y);
    vertex(solutions[1].x, solutions[1].y);
    vertex(next_solutions[1].x, next_solutions[1].y);
    vertex(next_solutions[0].x, next_solutions[0].y);
    endShape();
  }

  noLoop();
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
  //fill("#00ff00");
  //circle(x_solution_1, y_solution_1, 5);
  //circle(x_solution_2, y_solution_2, 5);
  let solution_vector = [];
  solution_vector[0] = createVector(x_solution_1, y_solution_1);
  solution_vector[1] = createVector(x_solution_2, y_solution_2);
  return solution_vector;
}
