/* Intersection Code taken from: */
/* https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/ */

let lineOnePointA;
let lineOnePointB;
let lineTwpPointA;
let lineTwoPointB;

function setup() {
  createCanvas(400, 400);
  lineOnePointA = createVector(random(0, width), random(0, height));
  lineOnePointB = createVector(random(0, width), random(0, height));
  lineTwoPointA = createVector(random(0, width), random(0, height));
  lineTwoPointB = createVector(random(0, width), random(0, height));
}

function draw() {
  background(220);

  // Draw Line Segments
  strokeWeight(3);
  fill(0);
  stroke(0);
  circle(lineOnePointA.x, lineOnePointA.y, 10);
  circle(lineOnePointB.x, lineOnePointB.y, 10);
  line(lineOnePointA.x, lineOnePointA.y, lineOnePointB.x, lineOnePointB.y);
  circle(lineTwoPointA.x, lineTwoPointA.y, 10);
  circle(lineTwoPointB.x, lineTwoPointB.y, 10);
  line(lineTwoPointA.x, lineTwoPointA.y, lineTwoPointB.x, lineTwoPointB.y);

  if (doIntersect(lineOnePointA, lineOnePointB, lineTwoPointA, lineTwoPointB)) {
    // Compute Intersection:
    // https://www.hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect

    let delta1x = lineOnePointB.x - lineOnePointA.x;
    let delta1y = lineOnePointB.y - lineOnePointA.y;
    let delta2x = lineTwoPointB.x - lineTwoPointA.x;
    let delta2y = lineTwoPointB.y - lineTwoPointA.y;

    // create a 2D matrix from our vectors and calculate the determinant
    let determinant = delta1x * delta2y - delta2x * delta1y;

    if (abs(determinant) > 0.0001) {
      let ab =
        ((lineOnePointA.y - lineTwoPointA.y) * delta2x -
          (lineOnePointA.x - lineTwoPointA.x) * delta2y) /
        determinant;
      let cd =
        ((lineOnePointA.y - lineTwoPointA.y) * delta1x -
          (lineOnePointA.x - lineTwoPointA.x) * delta1y) /
        determinant;
      let intersectX = lineOnePointA.x + ab * delta1x;
      let intersectY = lineOnePointA.y + ab * delta1y;
      // Draw Intersection Point
      strokeWeight(3);
      fill(0, 255, 0);
      stroke(0);
      circle(intersectX, intersectY, 10);
    }
  }
}

function mousePressed() {
  lineOnePointA = createVector(random(0, width), random(0, height));
  lineOnePointB = createVector(random(0, width), random(0, height));
  lineTwoPointA = createVector(random(0, width), random(0, height));
  lineTwoPointB = createVector(random(0, width), random(0, height));
}

// Given three collinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
function onSegment(p, q, r) {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  )
    return true;

  return false;
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise

function orientation(p, q, r) {
  // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
  // for details of below formula.
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) return 0; // collinear

  return val > 0 ? 1 : 2; // clock or counterclock wise
}

// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
function doIntersect(p1, q1, p2, q2) {
  // Find the four orientations needed for general and
  // special cases
  let o1 = orientation(p1, q1, p2);
  let o2 = orientation(p1, q1, q2);
  let o3 = orientation(p2, q2, p1);
  let o4 = orientation(p2, q2, q1);

  // General case
  if (o1 != o2 && o3 != o4) return true;

  // Special Cases
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) return true;

  // p1, q1 and q2 are collinear and q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) return true;

  // p2, q2 and p1 are collinear and p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) return true;

  // p2, q2 and q1 are collinear and q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) return true;

  return false; // Doesn't fall in any of the above cases
}
