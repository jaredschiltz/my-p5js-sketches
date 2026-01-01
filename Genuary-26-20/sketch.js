/*
Genuary 2026 - January 20th: One line. An artwork that is made 
of a single line only
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let start_line_pos;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#fee715");
  background_color = color("#101820");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  start_line_pos = createVector(
    floor(WIDTH_HEIGHT / 2),
    floor(WIDTH_HEIGHT / 2)
  );
  print(start_line_pos);

  noLoop();
}

function draw() {
  background(background_color);

  // Draw Line
  noFill();
  stroke(foreground_color);
  let end_line_pos = createVector(start_line_pos.x + 1, start_line_pos.y);
  line(start_line_pos.x, start_line_pos.y, end_line_pos.x, end_line_pos.y);
  start_line_pos.x = end_line_pos.x;
  start_line_pos.y = end_line_pos.y;
  let increment = 2;
  let current_direction = "up";

  for (let i = 1; i < 800; i++) {
    switch (current_direction) {
      case "up":
        end_line_pos.y -= increment;
        current_direction = "left";
        break;
      case "right":
        end_line_pos.x += increment;
        current_direction = "up";
        break;
      case "down":
        end_line_pos.y += increment;
        current_direction = "right";
        break;
      case "left":
        end_line_pos.x -= increment;
        current_direction = "down";
        break;
    }

    line(start_line_pos.x, start_line_pos.y, end_line_pos.x, end_line_pos.y);
    start_line_pos.x = end_line_pos.x;
    start_line_pos.y = end_line_pos.y;

    increment += 3;
  }
  // Draw Border
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.20", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
