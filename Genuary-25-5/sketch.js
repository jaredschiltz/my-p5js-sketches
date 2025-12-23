/*
Genuary 2025 - January 5th Prompt: Isometric Art (No vanishing points)
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
const NUM_CELLS = 30;
const CUBE_SIDE = 30;
let cube_width;
let cube_height;

let my_font;
let border_size;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  cube_width = CUBE_SIDE * cos((30 * PI) / 180);
  cube_height = CUBE_SIDE * sin((30 * PI) / 180);

  noLoop();
}

function draw() {
  let background_color = color("#001524");
  background(background_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;
  // Draw background
  fill(background_color);
  //stroke(0);
  noStroke();
  rect(border_start, border_start, border_size, border_size);

  const NUM_CUBES = 15;
  const MAX_CUBES_PER_WIDTH = floor(border_size / (2 * cube_width) / 4);
  const MAX_CUBES_PER_HEIGHT = floor(
    border_size / (CUBE_SIDE + 2 * cube_height) / 2.1
  );
  // Draw cubes
  push();
  translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT / 2);
  drawCube();
  for (let i = 0; i < NUM_CUBES; i++) {
    let x_pos = floor(random(-MAX_CUBES_PER_WIDTH, MAX_CUBES_PER_WIDTH));
    let y_pos = ceil(random(-MAX_CUBES_PER_HEIGHT, MAX_CUBES_PER_HEIGHT));

    push();
    if (y_pos % 2 == 0) {
      translate(2 * cube_width * x_pos, y_pos * CUBE_SIDE);
      drawCube();
    } else {
      translate(cube_width + 2 * cube_width * x_pos, CUBE_SIDE + cube_height);
      drawCube();
    }
    pop();
  }
  pop();

  // Draw Border
  /*
  noStroke();
  fill(background_color);
  rect(0, 0, border_start, WIDTH_HEIGHT);
  rect(
    WIDTH_HEIGHT - border_start,
    0,
    WIDTH_HEIGHT - border_start,
    WIDTH_HEIGHT
  );
  rect(0, WIDTH_HEIGHT - border_start, WIDTH_HEIGHT, WIDTH_HEIGHT);
  */
  // Draw Text
  noStroke();
  fill("#ffecd1");
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.5",
    (WIDTH_HEIGHT - border_size) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - border_size) / 2 + 25
  );
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
  if (key == " ") {
    draw();
  }
}

function drawCube() {
  noStroke();
  //stroke(0);
  fill("#15616d");
  // Right part of cube
  beginShape();
  vertex(0, 0);
  vertex(0, -CUBE_SIDE);
  vertex(cube_width, -cube_height - CUBE_SIDE);
  vertex(cube_width, -cube_height);
  endShape(CLOSE);

  // Left part of cube
  fill("#ff7d00");
  beginShape();
  vertex(0, 0);
  vertex(0, -CUBE_SIDE);
  vertex(-cube_width, -cube_height - CUBE_SIDE);
  vertex(-cube_width, -cube_height);
  endShape(CLOSE);
  // Top part of cube
  fill("#ffecd1");
  beginShape();
  vertex(0, -CUBE_SIDE);
  vertex(-cube_width, -cube_height - CUBE_SIDE);
  vertex(0, -CUBE_SIDE - 2 * cube_height);
  vertex(cube_width, -cube_height - CUBE_SIDE);
  endShape(CLOSE);
}
