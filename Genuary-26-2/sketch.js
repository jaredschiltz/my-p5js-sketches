/*
Genuary 2026 - January 2nd: Twelve principles of animation
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let eye_blink_counter_open = 0;
let eye_blink_counter_close = 0;
let eye_blink_state_closed = false;

let seaweed_toggle = false;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#ffffff");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
}

function draw() {
  background(background_color);
  //image(img, 50, 0, 300, 300);
  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  // Draw background
  textFont("monospace", 40);
  text("~~~~~***~~~", 50, 700);
  text("~~***~~~~~~~~", 245, 730);
  text("~~~~~~~", 510, 700);
  text("~**", 670, 730);

  // Draw seaweed
  drawSeaWeed(100, 670, 10);
  drawSeaWeed(130, 670, 5);
  drawSeaWeed(70, 670, 7);
  drawSeaWeed(320, 700, 4);
  drawSeaWeed(350, 700, 3);
  drawSeaWeed(380, 700, 5);
  drawSeaWeed(680, 700, 5);
  drawSeaWeed(710, 700, 6);

  drawFish("#ffffff");

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
  text(">> 26.2", start_pos, WIDTH_HEIGHT - 15);

  if (frameCount % 10 == 0) {
    seaweed_toggle = !seaweed_toggle;
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    //saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}

function drawSeaWeed(xpos, ypos, len) {
  for (let i = 0; i < len; i++) {
    if (i % 2 == 0) {
      if (seaweed_toggle) {
        text("(", xpos, ypos - i * 50);
      } else {
        text(")", xpos, ypos - i * 50);
      }
    } else {
      if (seaweed_toggle) {
        text(")", xpos, ypos - i * 50);
      } else {
        text("(", xpos, ypos - i * 50);
      }
    }
  }
}

function drawFish(fish_colour) {
  noFill();
  stroke(fish_colour);
  strokeWeight(5);
  strokeCap(ROUND);
  push();
  // push to middle of the scree
  translate(180, 230);

  // add up and down motion
  translate(0, map(sin(frameCount * 0.1), -1, 1, -30, 30), 0);

  // Mouth
  line(67, 147, 98, 133);
  line(67, 147, 98, 162);
  // Eye
  if (eye_blink_state_closed == false && eye_blink_counter_open < 70) {
    eye_blink_counter_open++;
  } else {
    eye_blink_state_closed = true;
    eye_blink_counter_open = 0;
  }
  if (eye_blink_state_closed == true && eye_blink_counter_closed < 10) {
    eye_blink_counter_closed++;
  } else {
    eye_blink_state_closed = false;
    eye_blink_counter_closed = 0;
  }
  if (eye_blink_state_closed) {
    line(113, 133, 133, 133);
  } else {
    circle(123, 133, 20);
  }
  // Tail
  stroke("#ffffff");
  push();
  translate(301, 147);
  rotate(map(sin(frameCount * 0.2), -1, 1, -PI / 8, PI / 8));
  line(0, 0, 32, -15);
  line(0, 0, 32, 15);
  pop();
  line(253, 133, 284, 147);
  line(253, 162, 284, 147);
  // Body
  push();
  for (let i = 0; i < 4; i++) {
    push();
    translate(i * 26, 0);
    let x = 60;
    let y_delta = 30;
    let anchor_x1 = 147;
    let anchor_x2 = 147;
    let anchor_y1 = 122;
    let anchor_y2 = 177;
    beginShape();
    // Add the first control point.
    curveVertex(x, anchor_y1 - y_delta);
    // Add the anchor points.
    curveVertex(anchor_x1, anchor_y1);
    curveVertex(anchor_x2, anchor_y2);

    // Add the second control point.
    curveVertex(x, anchor_y2 + y_delta);

    endShape();
    pop();
  }
  pop();
  pop();
}
