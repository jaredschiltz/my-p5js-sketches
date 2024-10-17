let dayNum;
const daysOfMonth = 31;
let horizSpace;
const smallTriangleHeight = 30;

function setup() {
  createCanvas(400, 400);
  horizSpace = width / (daysOfMonth + daysOfMonth + 1);
  dayNum = day();
}

function draw() {
  background(220);
  fill(0);
  noStroke();
  line(0, height / 2, width, height / 2);
  translate(
    horizSpace,
    (height - smallTriangleHeight) / 2 + smallTriangleHeight
  );
  for (let i = 0; i < daysOfMonth; i++) {
    if (i == dayNum - 1) {
      fill(255, 0, 0);
      triangle(
        0,
        -smallTriangleHeight * 1.5,
        horizSpace,
        -smallTriangleHeight * 1.5,
        horizSpace / 2,
        0.5 * smallTriangleHeight
      );
    } else {
      fill(0);
      triangle(0, 0, horizSpace, 0, horizSpace / 2, -smallTriangleHeight);
    }

    translate(2 * horizSpace, 0);
  }
}
