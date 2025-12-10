const WIDTH_HEIGHT = 800;
const ORANGE_COLOR = "#FF8201";
const YELLOW_COLOR = "#FFEA00";
/*
// These color were listed on a website for the cups
   but they don't seem right! Using the colors above instead.
const ORANGE_COLOR = "#D45D00"; // Pantone 717 C
const YELLOW_COLOR = "#F6EB61"; // Pantone 100 C
*/
const NUM_FLOWERS = 150; // N number of Yellow Flowers
const STEM_THICKNESS = 5;
// and N number of Orange Flowers
const MIN_FLOWER_HEIGHT = WIDTH_HEIGHT * 0.05;
const MAX_FLOWER_HEIGHT = WIDTH_HEIGHT * 0.7;
function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background("#FEFEFE");
  for (let i = 0; i < NUM_FLOWERS; i++) {
    let x_pos = random(0, WIDTH_HEIGHT);
    let flower_height = random(MIN_FLOWER_HEIGHT, MAX_FLOWER_HEIGHT);
    drawFlower(
      x_pos,
      WIDTH_HEIGHT,
      flower_height,
      STEM_THICKNESS,
      YELLOW_COLOR
    );
  }
  for (let i = 0; i < NUM_FLOWERS; i++) {
    let x_pos = random(0, WIDTH_HEIGHT);
    let flower_height = random(MIN_FLOWER_HEIGHT, MAX_FLOWER_HEIGHT);
    drawFlower(
      x_pos,
      WIDTH_HEIGHT,
      flower_height,
      STEM_THICKNESS,
      ORANGE_COLOR
    );
  }
  filter(BLUR, 0.5);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function drawFlower(baseX, baseY, height, stem_thickness, colour) {
  stroke(colour);
  strokeWeight(stem_thickness);
  noFill();
  beginShape();
  curveVertex(baseX, baseY);
  curveVertex(baseX, baseY);
  let bend_amount = 200;
  let random_x_bend = random(-bend_amount, bend_amount);
  let random_y_bend = random(0.5 * height, 0.8 * height);
  let p1 = createVector(baseX + random_x_bend / 2, baseY - random_y_bend, 0);
  let p2 = createVector(baseX + random_x_bend, baseY - height, 0);
  curveVertex(p1.x, p1.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p2.x, p2.y);
  endShape();
  push();
  translate(p2.x, p2.y);
  rotate(atan2(p2.y - p1.y, p2.x - p1.x) + PI / 2);
  translate(-21, -50);
  fill(colour);
  beginShape();
  vertex(19.585, 50.428);
  bezierVertex(17.702, 50.036, 16.918, 47.132, 15.819, 45.72);
  bezierVertex(14.856, 44.481, 13.673, 43.368, 12.994, 41.954);
  bezierVertex(12.053, 39.992, 11.425, 36.069, 10.17, 33.95);
  bezierVertex(9.038, 32.041, 6.867, 30.96, 5.462, 29.242);
  bezierVertex(4.049, 27.516, 1.976, 25.838, 1.695, 23.592);
  bezierVertex(1.499, 22.024, 0.243, 19.103, 0.547, 16.622);
  bezierVertex(0.851, 14.14, 2.715, 12.098, 3.108, 10.41);
  bezierVertex(3.696, 7.88, 4.991, 4.996, 6.403, 3.348);
  bezierVertex(7.683, 1.855, 9.63, 0.289, 11.582, 0.523);
  bezierVertex(13.544, 0.759, 15.819, 4.133, 18.173, 4.761);
  bezierVertex(20.527, 5.388, 23.2, 4.069, 25.706, 4.29);
  bezierVertex(28.374, 4.525, 32.062, 5.388, 34.18, 6.173);
  bezierVertex(35.772, 6.763, 36.756, 8.652, 38.417, 8.998);
  bezierVertex(40.301, 9.39, 43.753, 7.899, 45.479, 8.527);
  bezierVertex(47.161, 9.138, 48.304, 11.43, 48.775, 12.764);
  bezierVertex(49.196, 13.957, 47.338, 15.713, 48.304, 16.531);
  bezierVertex(49.324, 17.394, 53.718, 16.923, 54.895, 17.943);
  bezierVertex(56.072, 18.963, 56.013, 21.213, 55.366, 22.651);
  bezierVertex(54.66, 24.22, 52.413, 26, 50.658, 27.359);
  bezierVertex(48.226, 29.242, 43.753, 31.596, 40.771, 33.95);
  bezierVertex(37.896, 36.22, 35.043, 39.129, 32.768, 41.483);
  bezierVertex(30.757, 43.563, 29.315, 46.583, 27.118, 48.074);
  bezierVertex(24.941, 49.551, 21.469, 50.82, 19.585, 50.428);
  endShape();

  pop();
}
