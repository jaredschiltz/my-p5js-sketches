const WIDTH_HEIGHT = 800;
let order = 6;
let length = 700;
let foreground_color;
let background_color;

function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#ff9900");
  background_color = color("#000000");
  stroke(foreground_color);
  strokeWeight(3);
  noFill();
  noLoop();
}

function draw() {
  background(background_color);
  // center and orient drawing
  let turtle = {
    x: (WIDTH_HEIGHT - length) / 2,
    y: WIDTH_HEIGHT + (length * sin(60)) / 2,
    heading: 0, // degrees
  };

  sierpinski_arrowhead_curve(order, length, turtle);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function sierpinski_arrowhead_curve(order, length, t) {
  if (order % 2 === 0) {
    curve_arrow(order, length, 60, t);
  } else {
    turn(t, 60);
    curve_arrow(order, length, -60, t);
  }
}

function curve_arrow(order, length, angle, t) {
  if (order === 0) {
    draw_line(t, length);
    return;
  }

  curve_arrow(order - 1, length / 2, -angle, t);
  turn(t, angle);
  curve_arrow(order - 1, length / 2, angle, t);
  turn(t, angle);
  curve_arrow(order - 1, length / 2, -angle, t);
}

function draw_line(t, l) {
  let rad = radians(t.heading);

  let nx = t.x + cos(rad) * l;
  let ny = t.y + sin(rad) * l;

  line(t.x, t.y, nx, ny);

  t.x = nx;
  t.y = ny;
}

function turn(t, angle) {
  t.heading += angle;
}
