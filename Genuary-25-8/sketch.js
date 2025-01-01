/*
Genuary 2025 - January 8th Prompt: Draw one million of something
*/

const WIDTH_HEIGHT = 800;
const COLOR_PALETTE = ["#CCCCCC", "#cc527a", "#e8175d", "#474747"];
let BACKGROUND_COLOR;
let FOREGROUND_COLOR;
const SCALE_FACTOR = 0.0005;
function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  BACKGROUND_COLOR = color(COLOR_PALETTE[0]);
  FOREGROUND_COLOR = color(0);

  noLoop();
}

function mousePressed() {
  draw();
}

function draw() {
  background(BACKGROUND_COLOR);
  for (let i = 0; i < 1e6; i++) {
    push();
    translate(random(50, WIDTH_HEIGHT - 50), random(50, WIDTH_HEIGHT - 50));
    rotate(random(0, TWO_PI));
    draw_blob(
      color(COLOR_PALETTE[floor(random(COLOR_PALETTE.length - 1)) + 1])
    );
    pop();
  }
  // Draw text
  noStroke();
  fill(FOREGROUND_COLOR);
  textSize(12);
  textFont("Playwrite CU");
  text(">> 25.8", 50, WIDTH_HEIGHT - 20);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function draw_blob(colour) {
  //strokeJoin(ROUND);
  //stroke("rgba(0,0,0,0)");
  //strokeCap(PROJECT);
  //strokeJoin(MITER);
  fill(colour);
  noStroke();
  //stroke("#ff0000");
  //strokeWeight(62.5 * SCALE_FACTOR * 2);
  beginShape();
  vertex(1463.83 * SCALE_FACTOR, 1000 * SCALE_FACTOR);
  bezierVertex(
    1207.56 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    792.438 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    536.174 * SCALE_FACTOR
  );
  bezierVertex(
    1000 * SCALE_FACTOR,
    281.726 * SCALE_FACTOR,
    790.621 * SCALE_FACTOR,
    72.347 * SCALE_FACTOR,
    536.174 * SCALE_FACTOR,
    72.347 * SCALE_FACTOR
  );
  bezierVertex(
    281.726 * SCALE_FACTOR,
    72.347 * SCALE_FACTOR,
    72.347 * SCALE_FACTOR,
    281.726 * SCALE_FACTOR,
    72.347 * SCALE_FACTOR,
    536.174 * SCALE_FACTOR
  );
  bezierVertex(
    72.347 * SCALE_FACTOR,
    790.621 * SCALE_FACTOR,
    281.726 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    536.174 * SCALE_FACTOR,
    1000 * SCALE_FACTOR
  );
  bezierVertex(
    792.438 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    1207.56 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    1463.83 * SCALE_FACTOR
  );
  bezierVertex(
    1000 * SCALE_FACTOR,
    1718.27 * SCALE_FACTOR,
    1209.38 * SCALE_FACTOR,
    1927.65 * SCALE_FACTOR,
    1463.83 * SCALE_FACTOR,
    1927.65 * SCALE_FACTOR
  );
  bezierVertex(
    1718.27 * SCALE_FACTOR,
    1927.65 * SCALE_FACTOR,
    1927.65 * SCALE_FACTOR,
    1718.27 * SCALE_FACTOR,
    1927.65 * SCALE_FACTOR,
    1463.83 * SCALE_FACTOR
  );
  bezierVertex(
    1927.65 * SCALE_FACTOR,
    1209.38 * SCALE_FACTOR,
    1718.27 * SCALE_FACTOR,
    1000 * SCALE_FACTOR,
    1463.83 * SCALE_FACTOR,
    1000 * SCALE_FACTOR
  );
  endShape();
}
