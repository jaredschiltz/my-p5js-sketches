const WIDTH = 800;
const HEIGHT = 800;
const HORIZONTAL_PIXELS = 64;
const VERTICAL_PIXELS = 64;
let grid;
let ball;
const NUM_BALLS = 200;
let ball_array = [];

const colors = [
  "#F44336",
  "#FF9800",
  "#FFEB3B",
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
];
function preload() {}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  grid = new Grid(
    { w: HORIZONTAL_PIXELS, h: VERTICAL_PIXELS },
    { w: WIDTH, h: HEIGHT }
  );
  for (let b = 0; b < NUM_BALLS; b++) {
    ball_array.push(
      new Ball(
        createVector(
          floor(random(HORIZONTAL_PIXELS)),
          floor(random(VERTICAL_PIXELS))
        ),
        createVector(HORIZONTAL_PIXELS - 1, VERTICAL_PIXELS - 1),
        0.4,
        color(colors[floor(random(colors.length))])
      )
    );
  }
}

function draw() {
  background(220);
  grid.clear_grid(color(20, 20, 20));
  for (let b = 0; b < NUM_BALLS; b++) {
    ball_array[b].update();
    grid.set_pixel(ball_array[b].get_pos(), ball_array[b].get_colour());
  }
  grid.show();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
