/*
Genuary 2026 - January 23rd: Transparency. Explore the concept of transparency.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

const MIN_QUAD_HEIGHT = 30;
const MAX_QUAD_HEIGHT = 200;
const MIN_QUAD_WIDTH = 100;
const MAX_QUAD_WIDTH = 300;
const TRANSPARENCY_AMOUNT = 160; // 0-255
let quad_height;

let color_array = ["#230007", "#D7CF07", "#D98324", "#A40606", "#5A0002"];

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  quad_height = floor(random(MIN_QUAD_HEIGHT, MAX_QUAD_HEIGHT));

  noLoop();
}

function draw() {
  background(background_color);

  let quad_points = [];
  // Compute Quad Heights
  let total_height = 0;
  fill("#00ff00");
  let current_width = start_pos;
  let current_direction = "right";
  while (total_height + quad_height < border_size) {
    let new_width = floor(random(MIN_QUAD_WIDTH, MAX_QUAD_WIDTH));
    if (
      current_direction == "right" &&
      current_width + new_width >= start_pos + border_size
    ) {
      current_direction = "left";
      current_width -= new_width;
    } else if (
      current_direction == "left" &&
      current_width - new_width <= start_pos
    ) {
      current_direction = "right";
      current_width += new_width;
    } else if (current_direction == "right") {
      current_width += new_width;
    } else if (current_direction == "left") {
      current_width -= new_width;
    }

    quad_points.push(createVector(current_width, start_pos + total_height));
    /*
    fill("#00ff00");
    circle(current_width, start_pos + total_height, 5);
    fill("#ff0000");
    circle(current_width, start_pos + total_height + quad_height, 5);
    */
    let new_quad_height = floor(random(MIN_QUAD_HEIGHT, quad_height));
    total_height += new_quad_height;
  }

  // To center the image, find the max_y point and the min_x and max_x points
  let MAX_Y = quad_points[quad_points.length - 1].y + quad_height;
  let y_offset = (border_size - (MAX_Y - start_pos)) / 2;
  let MIN_X = WIDTH_HEIGHT;
  let MAX_X = 0;
  for (let i = 0; i < quad_points.length; i++) {
    if (quad_points[i].x < MIN_X) {
      MIN_X = quad_points[i].x;
    }
    if (quad_points[i].x > MAX_X) {
      MAX_X = quad_points[i].x;
    }
  }
  let x_offset = (border_size - (MAX_X - start_pos - (MIN_X - start_pos))) / 2;
  x_offset += start_pos;
  x_offset -= MIN_X;

  noStroke();

  for (let i = 0; i < quad_points.length - 1; i++) {
    let colour = color(color_array[i % color_array.length]);
    colour.setAlpha(TRANSPARENCY_AMOUNT);
    fill(colour);
    beginShape();
    vertex(quad_points[i].x + x_offset, quad_points[i].y + y_offset);
    vertex(quad_points[i + 1].x + x_offset, quad_points[i + 1].y + y_offset);
    vertex(
      quad_points[i + 1].x + x_offset,
      quad_points[i + 1].y + quad_height + y_offset
    );
    vertex(
      quad_points[i].x + x_offset,
      quad_points[i].y + quad_height + y_offset
    );
    endShape(CLOSE);
  }

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
  text(">> 26.23", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
