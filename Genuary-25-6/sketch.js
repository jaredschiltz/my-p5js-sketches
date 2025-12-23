/*
Genuary 2025 - January 6th Prompt: Make a landscape using only primitive shapes
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
const NUM_CELLS = 30;
let my_font;
let border_size;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  let background_color = color("#eef5db");
  let sky_color = color("#b8d8d8");
  let sun_color = color("#fe5f55");
  let first_layer_color = color("#7a9e9f");
  let second_layer_color = color("#4f6367");

  background(background_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;
  // Draw background
  fill(sky_color);
  //stroke(0);
  noStroke();
  rect(border_start, border_start, border_size, border_size);

  // Draw Sun
  noStroke();
  fill(sun_color);
  let sun_circumference = random(border_size / 4, (border_size * 2) / 3);
  let sun_y_pos = sun_circumference / 2 + random(0, 2 * border_start);
  let sun_x_pos = sun_circumference / 2 + random(0, 5 * border_start);
  circle(sun_x_pos, sun_y_pos, sun_circumference);

  // Draw first layer of mountains
  fill(background_color);
  let num_layer1_mountains = 2;
  let mountain_average_width = WIDTH_HEIGHT / num_layer1_mountains;
  let mountain_height_average = WIDTH_HEIGHT / 3;
  let start_mountain_base = (WIDTH_HEIGHT * 2) / 3;
  for (let i = 0; i < num_layer1_mountains; i++) {
    triangle(
      i * mountain_average_width,
      start_mountain_base,
      (i + 1) * mountain_average_width * random(1, 1.4),
      start_mountain_base,
      i * mountain_average_width +
        mountain_average_width / 2 +
        random(-mountain_average_width / 4, mountain_average_width / 4),
      mountain_height_average +
        random(-mountain_height_average / 4, mountain_average_width / 4)
    );
  }
  rect(0, start_mountain_base, WIDTH_HEIGHT, WIDTH_HEIGHT);
  // Draw second layer of mountains
  fill(first_layer_color);
  let num_layer2_mountains = 3;
  mountain_average_width = WIDTH_HEIGHT / num_layer2_mountains;
  mountain_height_average = (WIDTH_HEIGHT * 2) / 3 - WIDTH_HEIGHT / 5;
  start_mountain_base = WIDTH_HEIGHT - border_start - WIDTH_HEIGHT / 5;
  for (let i = 0; i < num_layer2_mountains; i++) {
    triangle(
      i * mountain_average_width,
      start_mountain_base,
      (i + 1) * mountain_average_width * random(1, 1.4),
      start_mountain_base,
      i * mountain_average_width +
        mountain_average_width / 2 +
        random(-mountain_average_width / 4, mountain_average_width / 4),
      mountain_height_average +
        random(-mountain_height_average / 4, mountain_average_width / 4)
    );
  }
  rect(0, start_mountain_base, WIDTH_HEIGHT, WIDTH_HEIGHT);
  // Draw third layer of mountains
  fill(second_layer_color);
  let num_layer3_mountains = 4;
  mountain_average_width = WIDTH_HEIGHT / num_layer3_mountains;
  mountain_height_average = (WIDTH_HEIGHT * 2) / 3;
  start_mountain_base = WIDTH_HEIGHT - border_start;
  for (let i = 0; i < num_layer3_mountains; i++) {
    triangle(
      i * mountain_average_width,
      start_mountain_base,
      (i + 1) * mountain_average_width * random(1, 1.4),
      start_mountain_base,
      i * mountain_average_width +
        mountain_average_width / 2 +
        random(-mountain_average_width / 4, mountain_average_width / 4),
      mountain_height_average +
        random(-mountain_height_average / 4, mountain_average_width / 4)
    );
  }

  // Draw Border
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
  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.6",
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
}
