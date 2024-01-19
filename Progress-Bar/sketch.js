const WIDTH_HEIGHT = 600;
const NUM_SEGMENTS = 11;
const SEGMENT_SPACING = WIDTH_HEIGHT / (NUM_SEGMENTS + 1);
let progress_bar_array;
let saved_time;
let start_load = false;

const States = {
  UP: "up",
  UP_CURVE: "up_curve",
  DOWN: "down",
  DOWN_CURVE: "down_curve",
};
let current_state = States.UP;
let current_segment = 1;
let current_pivot;
let current_angle;
let cnv;
let position;
const SPEED = 0.1;

function preload() {}

function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  position = createVector(SEGMENT_SPACING, 500);
  progress_bar_array = new Array();
  progress_bar_array.push({ x: position.x, y: position.y });
 
}

function draw() {
  background(200);
  noFill();
  strokeWeight(30);
  stroke(0);
  for (let x = 0; x < NUM_SEGMENTS; x++) {
    line(
      SEGMENT_SPACING + x * SEGMENT_SPACING,
      100,
      SEGMENT_SPACING + x * SEGMENT_SPACING,
      500
    );
    if (x % 2 == 1) {
      //point(x * SEGMENT_SPACING + 1/2 * SEGMENT_SPACING, 100)
      arc(
        x * SEGMENT_SPACING + (1 / 2) * SEGMENT_SPACING,
        100,
        SEGMENT_SPACING,
        SEGMENT_SPACING,
        -PI,
        0
      );
    } else {
      //point(x * SEGMENT_SPACING + 2.5 * SEGMENT_SPACING, 500)
      if (x != 0) {
        // Have to skip very first arc
        arc(
          x * SEGMENT_SPACING + (1 / 2) * SEGMENT_SPACING,
          500,
          SEGMENT_SPACING,
          SEGMENT_SPACING,
          0,
          PI
        );
      }
    }
  }
  strokeWeight(16);
  stroke(255);
  for (let x = 0; x < NUM_SEGMENTS; x++) {
    line(
      SEGMENT_SPACING + x * SEGMENT_SPACING,
      100,
      SEGMENT_SPACING + x * SEGMENT_SPACING,
      500
    );
    if (x % 2 == 1) {
      //point(x * SEGMENT_SPACING + 1/2 * SEGMENT_SPACING, 100)
      arc(
        x * SEGMENT_SPACING + (1 / 2) * SEGMENT_SPACING,
        100,
        SEGMENT_SPACING,
        SEGMENT_SPACING,
        -PI,
        0
      );
    } else {
      //point(x * SEGMENT_SPACING + 2.5 * SEGMENT_SPACING, 500)
      if (x != 0) {
        // Have to skip very first arc
        arc(
          x * SEGMENT_SPACING + (1 / 2) * SEGMENT_SPACING,
          500,
          SEGMENT_SPACING,
          SEGMENT_SPACING,
          0,
          PI
        );
      }
    }
  }

  // Loading Animation
  noFill()
  stroke(0)
  strokeWeight(10);
  if (start_load) {
    move_on_curve(
      createVector(SEGMENT_SPACING + (NUM_SEGMENTS - 1) * SEGMENT_SPACING, 100)
    );
    for (let p = 0; p < progress_bar_array.length; p++) {
      point(progress_bar_array[p].x, progress_bar_array[p].y);
    }
    if (millis() - saved_time < 55000) {
      let fraction_to_str = (((millis() - saved_time) / 55000) * 100).toFixed(
        1
      );
      //console.log(fraction_to_str + "%");
      //console.log((millis() - saved_time)/55000*100)
      fill(0)
      stroke(0)
      textSize(30)
      strokeWeight(1)
      text("Loading... " + fraction_to_str + "%", 180,40)
    }
    else {
      fill(0)
      stroke(0)
      textSize(30)
      strokeWeight(1) 
      text("Loading... " + 100.0 + "%", 180,40)
    }
  }
}

function move_on_curve(end_position) {
  //point(start_position.x, start_position.y);
  //point(end_position.x, end_position.y);
  if (position.x >= end_position.x && position.y <= end_position.y) {
    position.x = end_position.x;
    position.y = end_position.y;

    point(position.x, position.y);
    //  console.log("finished");
  } else {
    switch (current_state) {
      case States.UP:
        if (position.y <= 100) {
          position.y = 100;
          position.x = current_segment * SEGMENT_SPACING;
          current_pivot = createVector(
            position.x + SEGMENT_SPACING - (1 / 2) * SEGMENT_SPACING,
            position.y
          );
          current_angle = -PI + 0.1;
          current_state = States.UP_CURVE;
        } else {
          position.y = position.y - SPEED * deltaTime;
        }
        break;
      case States.UP_CURVE:
        if (current_angle >= 0 - 0.1) {
          position.y = 100;
          current_segment++;
          position.x = current_segment * SEGMENT_SPACING;
          current_state = States.DOWN;
        } else {
          position.x =
            current_pivot.x + (1 / 2) * SEGMENT_SPACING * cos(current_angle);
          position.y =
            current_pivot.y + (1 / 2) * SEGMENT_SPACING * sin(current_angle);
          current_angle = current_angle + SPEED;
        }
        break;
      case States.DOWN:
        if (position.y >= 500) {
          position.y = 500;
          position.x = current_segment * SEGMENT_SPACING;
          current_pivot = createVector(
            position.x + (1 / 2) * SEGMENT_SPACING,
            position.y
          );
          current_angle = -PI - 0.1;
          current_state = States.DOWN_CURVE;
        } else {
          position.y = position.y + SPEED * deltaTime;
        }

        break;
      case States.DOWN_CURVE:
        if (current_angle <= -TWO_PI) {
          position.y = 500;
          current_segment++;
          position.x = current_segment * SEGMENT_SPACING;
          current_state = States.UP;
        } else {
          position.x =
            current_pivot.x + (1 / 2) * SEGMENT_SPACING * cos(current_angle);
          position.y =
            current_pivot.y + (1 / 2) * SEGMENT_SPACING * sin(current_angle);
          current_angle = current_angle - SPEED;
        }
        break;
      default:
        console.log("Error! Case not defined.");
        break;
    }
    if (position.x >= end_position.x && position.y <= end_position.y) {
      position.x = end_position.x;
      position.y = end_position.y;
    }

    progress_bar_array.push({ x: position.x, y: position.y });
    //point(position.x, position.y);
  }
}

function keyPressed() {
  if (key === "s") {
    start_load = true;
    saved_time = millis();
  }
}
