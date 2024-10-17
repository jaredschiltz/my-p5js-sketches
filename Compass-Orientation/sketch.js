let mousePoints;
let mousePointCount = 0;

function setup() {
  createCanvas(400, 400);
  mousePoints = new Array(2);
  mousePoints[0] = createVector(0, 0);
  mousePoints[1] = createVector(0, 0);
}

function draw() {
  background(220);
  if (mousePointCount == 2) {
    stroke(0);
    strokeWeight(3);
    line(
      mousePoints[0].x,
      mousePoints[0].y,
      mousePoints[1].x,
      mousePoints[1].y
    );
    fill(0, 255, 0);
    circle(mousePoints[0].x, mousePoints[0].y, 10);
    fill(255, 0, 0);
    circle(mousePoints[1].x, mousePoints[1].y, 10);
    let dx = mousePoints[1].x - mousePoints[0].x;
    // Have to multiply dy by -1 to get cartesian coordinate from p5js coordinate system
    let dy = (mousePoints[1].y - mousePoints[0].y) * -1;
    let angle = (atan2(dy, dx) * 180) / PI;
    let compassAngle = 0;
    if (angle >= 0 && angle < 90) {
      compassAngle = map(angle, 0, 90, 90, 0);
    } else if (angle >= 90 && angle < 180) {
      compassAngle = map(angle, 90, 180, 360, 270);
    } else if (angle < 0 && angle > -90) {
      compassAngle = map(angle, 0, -90, 90, 180);
    } else {
      // -90 to -180
      compassAngle = map(angle, -90, -180, 180, 270);
    }

    let bearing = "N";

    if (compassAngle > 337.5 || compassAngle <= 22.5) {
      bearing = "N";
    }

    if (compassAngle > 22.5 && compassAngle <= 67.5) {
      bearing = "NE";
    }

    if (compassAngle > 67.5 && compassAngle <= 112.5) {
      bearing = "E";
    }

    if (compassAngle > 112.5 && compassAngle <= 157.5) {
      bearing = "SE";
    }

    if (compassAngle > 157.5 && compassAngle <= 202.5) {
      bearing = "S";
    }

    if (compassAngle > 202.5 && compassAngle <= 247.5) {
      bearing = "SW";
    }

    if (compassAngle > 247.5 && compassAngle <= 292.5) {
      bearing = "W";
    }

    if (compassAngle > 292.5 && compassAngle <= 337.5) {
      bearing = "NW";
    }

    textSize(30);
    fill(0);
    noStroke();
    text(
      "Orientation: " + str(compassAngle.toFixed(1) + "°"),
      width / 8,
      height * 0.8
    );
    text("Compass Bearing: " + bearing, width / 8, height * 0.9);
  }
}

function mousePressed() {
  if (mousePointCount < 2) {
    mousePoints[mousePointCount].x = mouseX;
    mousePoints[mousePointCount].y = mouseY;
    mousePointCount++;
  }
}
