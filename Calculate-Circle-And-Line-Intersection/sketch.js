let radius = 140;
let cx = 170;
let cy = 130;
let p1_x = 220;
let p1_y = 150;

let slope = -1;
function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER);
}

function draw() {
  background(220);
  noFill();
  circle(cx, cy, radius);
  fill("#ff0000");
  // Draw point and line through that point
  circle(p1_x, p1_y, 5);
  beginShape();
  for (let x = 0; x < width; x++) {
    vertex(x, line_equation(slope, x, p1_x, p1_y));
  }
  endShape();
  // Calculate intersection point of line and circle
  // There will be two points
  let solution_vector = compute_intersection_of_circle_and_line(
    slope,
    p1_x,
    p1_y,
    cx,
    cy,
    radius
  );
  print(solution_vector[0].x, solution_vector[0].y);
  print(solution_vector[1].x, solution_vector[1].y);
  noLoop();
}
function line_equation(slope, x, x1, y1) {
  return slope * (x - x1) + y1;
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
  radius = radius / 2;
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
  fill("#00ff00");
  circle(x_solution_1, y_solution_1, 5);
  circle(x_solution_2, y_solution_2, 5);
  let solution_vector = [];
  solution_vector[0] = createVector(x_solution_1, y_solution_1);
  solution_vector[1] = createVector(x_solution_2, y_solution_2);
  return solution_vector;
}
