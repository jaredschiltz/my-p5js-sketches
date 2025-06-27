const WIDTH = 800;
const HEIGHT = 800;
const HORIZONTAL_PIXELS = 64;
const VERTICAL_PIXELS = 64;
let grid;
function preload() {}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = new Grid(
    { w: HORIZONTAL_PIXELS, h: VERTICAL_PIXELS },
    { w: WIDTH, h: HEIGHT }
  );
  noLoop();
}

function draw() {
  background(220);
  grid.set_pixel(createVector(63, 63), color(255, 255, 255));
  grid.draw_line(createVector(0, 0), createVector(20, 63), color(255, 0, 0));
  grid.draw_ellipse_unfilled(
    createVector(32, 32),
    createVector(5, 5),
    color(0, 255, 0)
  );
  grid.draw_ellipse_filled(
    createVector(32, 32),
    createVector(3, 3),
    color(255, 255, 0)
  );
  grid.draw_rect_unfilled(
    createVector(0, 0),
    createVector(5, 5),
    color(255, 0, 255)
  );
  grid.draw_rect_filled(
    createVector(1, 1),
    createVector(3, 3),
    color(255, 255, 255)
  );

  grid.show();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
