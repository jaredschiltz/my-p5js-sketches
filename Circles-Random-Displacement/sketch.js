const WIDTH_HEIGHT = 800;
let BACKGROUND_COLOR;
let FOREGROUND1_COLOR;
let NUM_DOTS_PER_ROW_COL = 10;
let spacing;
function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  BACKGROUND_COLOR = color("#00B5A3");
  FOREGROUND1_COLOR = color("#E60079");
  FOREGROUND2_COLOR = color("#FFFF00");
  spacing = width / (NUM_DOTS_PER_ROW_COL + 1);
  noLoop();
}

function draw() {
  background(BACKGROUND_COLOR);
  noStroke();
  print(spacing);

  // Draw large circles
  const large_diameter = spacing * 0.6;
  fill(FOREGROUND2_COLOR);
  for (let row = 0; row < NUM_DOTS_PER_ROW_COL; row++) {
    for (let col = 0; col < NUM_DOTS_PER_ROW_COL; col++) {
      // add random vertical displacement
      let horizontal_displacement_amount = spacing / 3.5;
      let vertical_displacement_amount = 0;
      circle(
        spacing +
          col * spacing +
          random(
            -horizontal_displacement_amount,
            horizontal_displacement_amount
          ),
        spacing +
          row * spacing +
          random(-vertical_displacement_amount, vertical_displacement_amount),
        large_diameter
      );
    }
  }

  // Draw small circles
  const small_diameter = spacing * 0.25;
  fill(FOREGROUND1_COLOR);
  for (let row = 0; row < NUM_DOTS_PER_ROW_COL; row++) {
    for (let col = 0; col < NUM_DOTS_PER_ROW_COL; col++) {
      circle(spacing + col * spacing, spacing + row * spacing, small_diameter);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("circle-displacment", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
