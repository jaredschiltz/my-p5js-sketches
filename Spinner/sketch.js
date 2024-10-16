let radius;
let spinButton;
let choices = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
let sliceAngle;
let spinnerLength;
let spinnerAngle = 0;
let spinnerSpeed = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 1);
  rectMode(CENTER);
  radius = width * 0.8;
  sliceAngle = 360 / choices.length;
  spinnerLength = width * 0.7;
  spinButton = createButton("Spin!");
  spinButton.position(0, 0);
  spinButton.mousePressed(intializeSpinner);
}

function draw() {
  background(20);
  let angle = 0;
  for (i = 0; i < choices.length; i++) {
    stroke(255);
    strokeWeight(1);
    fill(angle, 100, 100);
    arc(
      width / 2,
      height / 2,
      radius,
      radius,
      radians(angle),
      radians(angle + sliceAngle),
      PIE
    );
    noStroke();
    push();
    translate(width / 2, height / 2);
    textSize(width / 60);
    textAlign(CENTER, CENTER);
    if (floor(((spinnerAngle % 360) / 360) * choices.length) == i) {
      fill(255);
      rect(
        (radius / 2) * cos(radians(i * sliceAngle + sliceAngle / 2)),
        (radius / 2) * sin(radians(i * sliceAngle + sliceAngle / 2)),
        textWidth(choices[i] + 2),
        textWidth("A") * 3
      );
      fill(0);
      text(
        choices[i],
        (radius / 2) * cos(radians(i * sliceAngle + sliceAngle / 2)),
        (radius / 2) * sin(radians(i * sliceAngle + sliceAngle / 2))
      );
    } else {
      fill(0);
      rect(
        (radius / 2) * cos(radians(i * sliceAngle + sliceAngle / 2)),
        (radius / 2) * sin(radians(i * sliceAngle + sliceAngle / 2)),
        textWidth(choices[i] + 2),
        textWidth("A") * 3
      );
      fill(255);
      text(
        choices[i],
        (radius / 2) * cos(radians(i * sliceAngle + sliceAngle / 2)),
        (radius / 2) * sin(radians(i * sliceAngle + sliceAngle / 2))
      );
    }

    pop();

    angle += sliceAngle;
  }

  stroke(255);
  strokeCap(SQUARE);
  push();
  translate(width / 2, height / 2);
  rotate(radians(spinnerAngle));
  strokeWeight(6);
  circle(0, 0, 10);
  fill(255);
  strokeWeight(6);
  stroke(255);
  line(0, 0, -spinnerLength / 2, 0);
  rect(-spinnerLength / 2, 0, 10, 10);
  line(0, 0, spinnerLength / 2, 0);
  triangle(
    spinnerLength / 2,
    -5,
    spinnerLength / 2,
    5,
    spinnerLength / 2 + 10,
    0
  );

  fill(0);
  noStroke();
  circle(0, 0, 8);
  pop();
  spinnerAngle += spinnerSpeed;

  spinnerSpeed *= 0.98; // spinner damping factor
}

function intializeSpinner() {
  spinnerAngle = random(0, 360);
  spinnerSpeed = 35;
}
