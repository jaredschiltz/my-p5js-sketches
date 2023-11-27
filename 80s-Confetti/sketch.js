//orange, yellow, pink, green, blue, purple
let color_array;
let shape_name_array;
const MAX_SIZE = 40;
const MIN_LINEAR_VELOCITY = 5;
const MAX_LINEAR_VELOCITY = 10;
const MIN_ROTATE_VELOCITY = -3.1415 / 30;
const MAX_ROTATE_VELOCITY = 3.1415 / 30;

const NUM_SHAPES = 100;
let shape_array;

function setup() {
  createCanvas(700, 700);
  color_array = [
    "#e93c36",
    "#fdec3d",
    "#e51f7f",
    "#3ca64a",
    "#10a6e9",
    "#822c82",
    "ffffff",
  ];
  shape_name_array = [
    "square",
    "rectangle",
    "circle",
    "triangle",
    "star",
    "squiggle1",
    "squiggle2",
    "squiggle3",
  ];
  rectMode(CENTER);
  ellipseMode(CENTER);
  shape_array = new Array(NUM_SHAPES);
  for (let i = 0; i < shape_array.length; i++) {
    shape_array[i] = shape_factory();
  }
}

function shape_factory() {
  /* (Shape Constructor)
   x,
    y,
    size,
    shape_scale,
    rotation,
    colour,
    linear_velocity,
    rotational_velocity
  */
  let shape_name = shape_name_array[floor(random() * shape_name_array.length)];
  switch (shape_name) {
    case "square":
      return new Square(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );
    case "rectangle":
      return new Rectangle(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );
    case "circle":
      return new Circle(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );

    case "triangle":
      return new Triangle(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );

    case "star":
      return new Star(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );

    case "squiggle1":
      return new Squiggle1(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );

    case "squiggle2":
      return new Squiggle2(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );

    case "squiggle3":
      return new Squiggle3(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );

    default:
      return new Square(
        random(MAX_SIZE, width - MAX_SIZE),
        random(-height, -MAX_SIZE),
        MAX_SIZE,
        floor(random(1, 3)),
        random(0, TWO_PI),
        color_array[floor(random() * color_array.length)],
        random(MIN_LINEAR_VELOCITY, MAX_LINEAR_VELOCITY),
        random(MIN_ROTATE_VELOCITY, MAX_ROTATE_VELOCITY)
      );
  }
}

function draw() {
  background(0);
  for (let i = 0; i < shape_array.length; i++) {
    shape_array[i].draw();
    shape_array[i].update();
    if (shape_array[i].is_alive == false) {
      shape_array[i] = shape_factory();
    }
  }
}

/* Used for generating random squiggle
//
function draw_random_squiggle(x, y, size, colour) {
  noFill();
  stroke(colour);
  strokeWeight(7);
  let segments = 10;
  beginShape();
  let x_begin = x - size;
  let x_step = (size * 2) / segments;
  let x_current = x_begin;
  for (let s = 0; s < segments; s++) {
    let y_current = random(-size / 4, size / 4);
    curveVertex(x_current, y + y_current);
    print("curveVertex(x + ", x_current - x, ", y+", y_current - y, ")");
    x_current += x_step;
  }

  endShape();
}

*/
