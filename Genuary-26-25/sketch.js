/*
Genuary 2026 - January 26th: Organic Geometry. Forms that look or act organic 
but are constructed entirely from geometric shapes.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let color_array = ["#f6a61d", "#2d5868", "#e67726", "#90bdc3"];

const PLANT_WIDTH_MAX = 75;
const MAX_VERTICAL_SEGMENTS = 13;
const MIN_VERTICAL_SEGMENTS = 3;
const MIN_CIRCLE_DIAMETER = 10;
const MAX_CIRCLE_DIAMETER = 50;
function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);

  push();
  translate(start_pos, start_pos);
  for (let cols = 0; cols < floor(border_size / PLANT_WIDTH_MAX); cols++) {
    //stroke("#000000");
    //line(cols * PLANT_WIDTH_MAX, 0, cols * PLANT_WIDTH_MAX, border_size);
    let plant_x_start = random(0, PLANT_WIDTH_MAX);
    let plant_x_end = random(0, PLANT_WIDTH_MAX);
    let total_y_segment_length = 0;
    let number_of_segments = floor(
      random(MIN_VERTICAL_SEGMENTS, MAX_VERTICAL_SEGMENTS)
    );
    let average_segment_length = border_size / number_of_segments;
    let startx = cols * PLANT_WIDTH_MAX + plant_x_start;
    let starty = 0;
    let endy;
    let endx;
    strokeWeight(3);
    let select_color = color_array[cols % 4];
    fill(select_color);
    stroke(select_color);
    for (let s = 0; s < number_of_segments - 1; s++) {
      let segment_length =
        average_segment_length +
        random(-average_segment_length * 0.2, average_segment_length * 0.2);
      total_y_segment_length += segment_length;
      endy = total_y_segment_length;

      if (startx > cols * PLANT_WIDTH_MAX + PLANT_WIDTH_MAX / 2) {
        endx = cols * PLANT_WIDTH_MAX + random(0, PLANT_WIDTH_MAX / 2);
      } else {
        endx =
          cols * PLANT_WIDTH_MAX + random(PLANT_WIDTH_MAX / 2, PLANT_WIDTH_MAX);
      }
      line(startx, starty, endx, endy);
      starty = endy;
      startx = endx;

      circle(startx, starty, random(MIN_CIRCLE_DIAMETER, MAX_CIRCLE_DIAMETER));
    }
    line(startx, starty, cols * PLANT_WIDTH_MAX + plant_x_end, border_size);
  }
  pop();
  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

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
  text(">> 26.25", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
