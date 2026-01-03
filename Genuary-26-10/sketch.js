/*
Genuary 2026 - January 10th: Polar Coordinates
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let matrix;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#00000");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  // Notice that the following is not the eye matrix
  // It is the eye matrix * 2. This is because of retina display
  //let matrix = getMatrix()
  noLoop();
}

function draw() {
  background(background_color);

  let first_arm_length = 200;
  let first_arm_length_variation = 75;
  let number_of_first_arm_angles = 150;
  let first_arm_angle = TWO_PI / number_of_first_arm_angles;
  let first_arm_number_of_sinusoid_periods = 5;

  let second_arm_rotation_length = 100;
  let number_of_second_arm_rotations = 8;
  stroke(foreground_color);
  noFill();
  push();
  translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT / 2);
  for (let i = 0; i < number_of_first_arm_angles; i++) {
    push();
    rotate(i * first_arm_angle);
    translate(
      0,
      first_arm_length +
        first_arm_length_variation *
          sin(
            (first_arm_number_of_sinusoid_periods * (TWO_PI * i)) /
              number_of_first_arm_angles
          )
    );
    push();
    rotate(
      (number_of_second_arm_rotations * (TWO_PI * i)) /
        number_of_first_arm_angles
    );
    ellipse(0, 0, second_arm_rotation_length * 0.5, second_arm_rotation_length);
    pop();
    /*
    line(
      0,
      0,
      0,
      first_arm_length +
        first_arm_length_variation *
          sin(
            (first_arm_number_of_sinusoid_periods * (TWO_PI * i)) /
              number_of_first_arm_angles
          )
    );
    */
    pop();
  }

  pop();

  /*
  push();
  translate(200, 0);
  rotate(QUARTER_PI);
  matrix = getMatrix();
  let p = matrix.apply(0, 0);
  print(p.x, p.y);
  pop();
  */

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
  text(">> 26.10", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
