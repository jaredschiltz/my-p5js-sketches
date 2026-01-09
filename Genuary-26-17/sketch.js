/*
Genuary 2026 - January 17: Wallpaper group. There are only 17 ways to cover a 
plane with a repeating pattern, choose your 
favourite on this page: 
https://en.wikipedia.org/wiki/Wallpaper_group
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let shape_side = 50;
let shape_width = (shape_side * 28) / 100;
let shape_inner = shape_side - shape_width;
const angle_degrees = 28;
const angle_radians = (Math.PI * angle_degrees) / 180;
let shape_inner_x = shape_inner * Math.cos(angle_radians);
let shape_inner_y = shape_inner * Math.sin(angle_radians);
let shape_width_x = shape_width * Math.cos(angle_radians);
let shape_width_y = shape_width * Math.sin(angle_radians);
let shape_side_x = shape_side * Math.cos(angle_radians);
let shape_side_y = shape_side * Math.sin(angle_radians);

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#F0e9CC");
  background_color = color("#00a7a7");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);
  push();

  for (let col = 0; col < ceil(border_size / (shape_side_x * 2)); col++) {
    push();
    translate(col * (shape_side_x * 2 + shape_width_x * 2), 0);
    for (
      let row = 0;
      row < ceil(border_size / (shape_width + shape_side) + 1);
      row++
    ) {
      push();
      translate(0, (shape_width + shape_side) * row);
      draw_shape();
      pop();
    }
    pop();
  }
  translate(shape_side_x + shape_width_x, shape_side_y + shape_width_y + 2);
  for (let col = 0; col < ceil(border_size / (shape_side_x * 2)); col++) {
    push();
    translate(col * (shape_side_x * 2 + shape_width_x * 2), 0);
    for (
      let row = 0;
      row < ceil(border_size / (shape_width + shape_side) + 1);
      row++
    ) {
      push();
      translate(0, (shape_width + shape_side) * row);
      draw_shape();
      pop();
    }
    pop();
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
  text(">> 26.17", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function draw_shape() {
  stroke(foreground_color);
  noFill();
  // Construction lines
  /*
  stroke("#00ff00");
  line(0, 0, 0, shape_side);
  line(0, 0, shape_side_x, -shape_side_y);
  line(0, 0, -shape_side_x, -shape_side_y);
  */
  strokeWeight(3);
  stroke(foreground_color);
  beginShape();
  vertex(0, -shape_width);
  vertex(-shape_side_x + shape_width_x, -shape_side_y - shape_width_y);
  vertex(-shape_side_x, -shape_side_y);
  vertex(-shape_side_x, -shape_side_y + shape_width);
  vertex(-shape_width_x, shape_side - shape_width_y - shape_inner);
  vertex(-shape_width_x, shape_side - shape_width_y);
  vertex(0, shape_side);
  vertex(shape_width_x, shape_side - shape_width_y);
  vertex(shape_width_x, shape_side - shape_width_y - shape_inner);
  vertex(shape_side_x, -shape_side_y + shape_width);
  vertex(shape_side_x, -shape_side_y);
  vertex(shape_side_x, -shape_side_y);
  vertex(shape_side_x - shape_width_x, -shape_side_y - shape_width_y);
  endShape(CLOSE);
}
