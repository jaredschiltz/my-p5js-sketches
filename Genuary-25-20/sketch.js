/*
Genuary 2025 - January 20th Prompt: Generative Architecture
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let sky_color;
let ground_color;
let wall_color;
let window_color;
let trim_color;

let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;

let engine;
let world;
let boxes = [];
let boundaries = [];

const NUM_FLOORS = 30;
const FLOOR_HEIGHT = 80;
const MIN_FLOOR_WIDTH = 80;
const MAX_FLOOR_WIDTH = 80;

let ground;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  sky_color = color("#7aa993");
  ground_color = color(182, 209, 182);
  wall_color = color(246, 231, 197);
  window_color = color(105, 102, 104);
  trim_color = color(44, 8, 43);
  engine = Engine.create();
  world = engine.world;
  for (let i = 0; i < NUM_FLOORS; i++) {
    boxes.push(
      new Box(
        random(WIDTH_HEIGHT / 3, (WIDTH_HEIGHT * 3) / 4),
        0,
        random(MIN_FLOOR_WIDTH, MAX_FLOOR_WIDTH),
        FLOOR_HEIGHT,
        color(wall_color),
        color(window_color),
        color(trim_color)
      )
    );
  }

  boundaries.push(
    new Boundary(
      WIDTH_HEIGHT / 4,
      WIDTH_HEIGHT / 2,
      50,
      WIDTH_HEIGHT / 1,
      0.0,
      color(sky_color)
    )
  );
  boundaries.push(
    new Boundary(
      (WIDTH_HEIGHT * 3) / 4,
      WIDTH_HEIGHT / 2,
      50,
      WIDTH_HEIGHT / 1,
      0.0,
      color(sky_color)
    )
  );

  boundaries.push(
    new Boundary(
      WIDTH_HEIGHT / 2,
      WIDTH_HEIGHT,
      WIDTH_HEIGHT,
      220,
      0.0,
      color(ground_color)
    )
  );

  World.add(world, boundaries);
  World.add(world, boxes);
  Engine.run(engine);

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  //noLoop();
}

function draw() {
  background(sky_color);
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  for (let bounds of boundaries) {
    bounds.show();
  }
  for (let box of boxes) {
    box.show();
  }

  // Draw Border
  /*
  noFill();
  stroke(color_two);
  rect(start_pos, start_pos, border_size, border_size);
  */

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
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
