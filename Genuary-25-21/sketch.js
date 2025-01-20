/*
Genuary 2025 - January 21th Prompt: Create a collision detection system (no libraries allowed)
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
const NUM_BOXES = 200;
const MIN_WIDTH = 20;
const MAX_WIDTH = 40;
const MIN_HEIGHT = 20;
const MAX_HEIGHT = 40;

let boxes = [];

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  sky_color = color("#7aa993");
  background_color = color("#679289");
  ground_color = color(182, 209, 182);
  wall_color = color(246, 231, 197);
  window_color = color(105, 102, 104);
  trim_color = color(44, 8, 43);

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  for (let i = 0; i < NUM_BOXES; i++) {
    let random_box_width = random(MIN_WIDTH, MAX_WIDTH);
    let random_box_height = random(MIN_HEIGHT, MAX_HEIGHT);
    boxes.push(
      new Box(
        random(start_pos, start_pos + border_size - random_box_width),
        random(start_pos, start_pos + border_size - random_box_height),
        random_box_width,
        random_box_height,
        start_pos,
        start_pos,
        border_size,
        border_size,
        color("#071e22"),
        color(background_color)
      )
    );
  }

  //noLoop();
}

function draw() {
  background(background_color);
  for (let box of boxes) {
    box.show();
    box.update();
    box.fill_true = false;
  }

  // Check for collisions
  for (let i = 0; i < boxes.length - 1; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      //print(i, j)
      if (
        boxes[i].x < boxes[j].x + boxes[j].w &&
        boxes[i].x + boxes[i].w > boxes[j].x &&
        boxes[i].y < boxes[j].y + boxes[j].h &&
        boxes[i].y + boxes[i].h > boxes[j].y
      ) {
        // Collision detected!
        boxes[i].fill_true = true;
        boxes[j].fill_true = true;
      }
    }
  }
  // Draw Border
  // noFill();
  // stroke(0);
  // rect(start_pos, start_pos, border_size, border_size);

  /*
  noStroke();
  fill(color_one);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */

  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(google_font);
  text(">> 25.20", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    //saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
