/*
Genuary 2025 - January 18th Prompt: What does the wind look like?
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let color_one;
let color_two;
let color_three;
let color_four;
let color_five;
let color_array;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  let alpha = "20";
  color_one = color("#d5edff" + alpha);
  color_two = color("#a5d4ff" + alpha);
  color_three = color("#6daaee" + alpha);
  color_four = color("#3858f9" + alpha);
  color_array = [color_one, color_two, color_three, color_four];

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  noLoop();
}

function draw() {
  background(0);
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  // Draw Border
  noFill();
  //stroke(0);
  //rect(start_pos, start_pos, border_size, border_size);

  let x_off = 0.1;
  let x_inc = 0.01;
  let amplitude = 1;
  strokeWeight(100);
  // Draw a random curve
  for (let i = 0; i < 50; i++) {
    let random_y_pos = floor(random(border_size));
    let random_color_index = floor(random(color_array.length));
    let random_color = color_array[random_color_index];
    stroke(random_color);
    beginShape();
    for (let x = 0; x < border_size; x++) {
      vertex(start_pos + x, start_pos + random_y_pos);
      let increment_amount = map(noise(x_off), 0, 1, -amplitude, amplitude);
      random_y_pos += increment_amount;
      x_off += x_inc;
    }
    endShape();
  }

  noStroke();
  fill(0);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  loadPixels();
  filter(BLUR, 10);
  updatePixels();

  // Draw Text
  noStroke();
  fill(color("#d5edff" + "55"));
  textSize(12);
  textFont(google_font);
  text(">> 25.18", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
