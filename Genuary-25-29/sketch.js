/*
Genuary 2025 - January 29th Prompt: Grid-based graphic design
*/

const WIDTH_HEIGHT = 800;
const working_area_PERCENTAGE = 0.9;
const NUM_GRID_CELLS = 5;
let grid_size;
let my_font;

let background_color;
let fill_color_array = new Array(5);

function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  background_color = color(0, 0, 0);
  fill_color_array[0] = color("#173f5f");
  fill_color_array[1] = color("#20639B");
  fill_color_array[2] = color("#3caea3");
  fill_color_array[3] = color("#f6d55c");
  fill_color_array[4] = color("#ed553b");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  working_area = parseInt(WIDTH_HEIGHT * working_area_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - working_area) / 2.0;
  grid_size = working_area / NUM_GRID_CELLS;
  background(background_color);
  noStroke();
  push();
  for (let row = 0; row < NUM_GRID_CELLS; row++) {
    draw_j(get_random_color());
    draw_a(get_random_color(), background_color);
    draw_r(get_random_color(), background_color);
    draw_e(get_random_color());
    draw_d(get_random_color(), background_color);
    translate(0, grid_size);
  }
  pop();
  // Draw Working Area Cells
  noFill();
  for (let row = 0; row < NUM_GRID_CELLS; row++) {
    for (let col = 0; col < NUM_GRID_CELLS; col++) {
      /*
      stroke("#ffffff");
      rect(
        border_start + col * grid_size,
        border_start + row * grid_size,
        grid_size,
        grid_size
      );
      */
      draw_mask(
        createVector(
          border_start + col * grid_size,
          border_start + row * grid_size
        ),
        background_color
      );
    }
  }

  // Draw Text
  noStroke();
  fill(get_random_color());
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.29",
    (WIDTH_HEIGHT - working_area) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - working_area) / 2 + 25
  );
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function get_random_color() {
  return fill_color_array[floor(random(fill_color_array.length))];
}

function draw_mask(pos, mask_color) {
  let random_mask = floor(random(4));
  noStroke();
  fill(mask_color);
  switch (random_mask) {
    case 0:
      rect(pos.x, pos.y, grid_size, grid_size / 2);
      break;
    case 1:
      rect(pos.x, pos.y + grid_size / 2, grid_size, grid_size / 2);
      break;
    case 2:
      rect(pos.x, pos.y, grid_size / 2, grid_size);
      break;
    case 3:
      rect(pos.x + grid_size / 2, pos.y, grid_size / 2, grid_size);
      break;
    case 4:
      // No Mask
      break;
  }
  noFill();
  noStroke();
}

function draw_j(fill_color) {
  noStroke();
  fill(fill_color);
  push();
  translate(40, 45);
  push();
  scale(4.5);
  beginShape();
  vertex(24.659, 0.507);
  vertex(24.659, 21.074);
  bezierVertex(24.659, 22.355, 24.442, 23.52, 24.008, 24.57);
  bezierVertex(23.575, 25.619, 22.957, 26.512, 22.156, 27.248);
  bezierVertex(21.354, 27.984, 20.388, 28.55, 19.258, 28.945);
  bezierVertex(18.128, 29.34, 16.867, 29.538, 15.474, 29.538);
  bezierVertex(12.662, 29.538, 10.488, 28.809, 8.951, 27.35);
  bezierVertex(7.413, 25.892, 6.434, 23.977, 6.014, 21.605);
  vertex(11.611, 20.42);
  bezierVertex(11.822, 21.646, 12.222, 22.641, 12.814, 23.405);
  bezierVertex(13.405, 24.168, 14.292, 24.549, 15.474, 24.549);
  bezierVertex(16.473, 24.549, 17.255, 24.215, 17.82, 23.548);
  bezierVertex(18.385, 22.88, 18.667, 21.851, 18.667, 20.461);
  vertex(18.667, 5.536);
  vertex(9.601, 5.536);
  vertex(9.601, 0.507);
  vertex(24.659, 0.507);
  endShape();
  pop();
  pop();
}

function draw_a(fill_color, background_color) {
  noStroke();
  fill(fill_color);
  push();
  translate(53, 45);
  push();
  scale(4.5);
  beginShape();
  vertex(50.33, 29.047);
  vertex(48.596, 22.178);
  vertex(41.067, 22.178);
  vertex(39.372, 29.047);
  vertex(33.38, 29.047);
  vertex(40.83, 0.507);
  vertex(49.187, 0.507);
  vertex(56.637, 29.047);
  vertex(50.33, 29.047);
  endShape();
  // Make hole
  fill(background_color);
  beginShape();
  vertex(45.009, 6.436);
  vertex(44.693, 6.436);
  vertex(42.013, 17.23);
  vertex(47.689, 17.23);
  vertex(45.009, 6.436);

  endShape();
  pop();
  pop();
}

function draw_r(fill_color, background_color) {
  noStroke();
  fill(fill_color);
  push();
  translate(60, 45);
  push();
  scale(4.5);
  beginShape();
  vertex(72.019, 29.047);
  vertex(66.185, 29.047);
  vertex(66.185, 0.507);
  vertex(76.828, 0.507);
  bezierVertex(78.168, 0.507, 79.364, 0.718, 80.415, 1.141);
  bezierVertex(81.466, 1.563, 82.353, 2.17, 83.075, 2.96);
  bezierVertex(83.798, 3.751, 84.343, 4.705, 84.711, 5.823);
  bezierVertex(85.079, 6.94, 85.263, 8.194, 85.263, 9.584);
  bezierVertex(85.263, 11.601, 84.843, 13.332, 84.002, 14.777);
  bezierVertex(83.161, 16.222, 81.965, 17.176, 80.415, 17.639);
  vertex(85.815, 29.047);
  vertex(79.35, 29.047);
  vertex(74.739, 18.457);
  vertex(72.019, 18.457);
  vertex(72.019, 29.047);
  endShape();
  // Make hole
  fill(background_color);
  beginShape();
  vertex(75.409, 13.714);
  bezierVertex(76.801, 13.714, 77.767, 13.441, 78.306, 12.896);
  bezierVertex(78.845, 12.351, 79.114, 11.452, 79.114, 10.198);
  vertex(79.114, 8.971);
  bezierVertex(79.114, 7.717, 78.845, 6.817, 78.306, 6.272);
  bezierVertex(77.767, 5.727, 76.801, 5.455, 75.409, 5.455);
  vertex(72.019, 5.455);
  vertex(72.019, 13.714);
  vertex(75.409, 13.714);
  endShape();
  pop();
  pop();
}

function draw_e(fill_color) {
  noStroke();
  fill(fill_color);
  push();
  translate(70, 45);
  push();
  scale(4.5);
  beginShape();
  vertex(96.499, 29.047);
  vertex(96.499, 0.507);
  vertex(114.079, 0.507);
  vertex(114.079, 5.536);
  vertex(102.411, 5.536);
  vertex(102.411, 12.078);
  vertex(113.685, 12.078);
  vertex(113.685, 17.108);
  vertex(102.411, 17.108);
  vertex(102.411, 24.018);
  vertex(114.079, 24.018);
  vertex(114.079, 29.047);
  vertex(96.499, 29.047);
  endShape();
  pop();
  pop();
}

function draw_d(fill_color, background_color) {
  noStroke();
  fill(fill_color);
  push();
  translate(85, 45);
  push();
  scale(4.5);
  beginShape();
  vertex(125.173, 0.507);
  vertex(134.042, 0.507);
  bezierVertex(137.747, 0.507, 140.493, 1.734, 142.28, 4.187);
  bezierVertex(144.067, 6.64, 144.96, 10.17, 144.96, 14.777);
  bezierVertex(144.96, 19.384, 144.067, 22.914, 142.28, 25.367);
  bezierVertex(140.493, 27.82, 137.747, 29.047, 134.042, 29.047);
  vertex(125.173, 29.047);
  vertex(125.173, 0.507);
  endShape();
  // Make hole
  fill(background_color);
  beginShape();
  vertex(133.648, 24.222);
  bezierVertex(135.408, 24.222, 136.696, 23.636, 137.511, 22.464);
  bezierVertex(138.325, 21.292, 138.733, 19.588, 138.733, 17.353);
  vertex(138.733, 12.16);
  bezierVertex(138.733, 9.952, 138.325, 8.262, 137.511, 7.09);
  bezierVertex(136.696, 5.918, 135.408, 5.332, 133.648, 5.332);
  vertex(131.007, 5.332);
  vertex(131.007, 24.222);
  vertex(133.648, 24.222);
  endShape();

  pop();
  pop();
}
