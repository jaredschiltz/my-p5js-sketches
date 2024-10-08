let img;
let img_width;
let img_height;
const WIDTH_HEIGHT = 800;
let cell_size;
brightness_table = new Set();
function preload() {
  img = loadImage("mona_lisa_pixelated.png");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  img_width = img.width;
  img_height = img.height;
  cell_size = WIDTH_HEIGHT / img_width;
  noLoop();
}

function draw() {
  background(255);
  img.loadPixels();
  for (row = 0; row < img_height; row++) {
    for (col = 0; col < img_width; col++) {
      // Get Center Pixel Value
      let pixel_color = img.get(col, row);
      //brightness_table.add(JSON.stringify(pixel_color));
      // Convert array to string and then add it to set, you
      // you eliminate duplicates. Without this, you get duplicate
      // arrays!

      // Running this, I get the following values for the Mona Lisa png:
      // Will treat the first two rows as identical. This yields 6 discrete
      // colors, which matches what I specified in Posterize colors in
      // Affinity Designer
      /*
        "[255,255,255,255]"
        "[255,255,255,244]"
        "[0,0,0,255]"
        "[102,102,102,255]"
        "[51,51,51,255]"
        "[153,153,153,255]"
        "[204,204,204,255]"
      */

      //Use red channel to get 'brightness'
      fill(pixel_color[0]);
      noStroke();
      //rect(col * cell_size, row * cell_size, cell_size, cell_size);

      noFill();
      stroke(0);
      strokeWeight(2);
      switch (pixel_color[0]) {
        // Pound
        case 0:
          darkest(row, col);
          break;
        case 51:
          kind_of_dark(row, col);
          break;
        case 102:
          normal_light(row, col);
          break;

        case 153:
          kind_of_light(row, col);
          break;

        case 204:
          lightest(row, col);
          break;
      }
    }
  }
  img.updatePixels();
  //print(brightness_table);
}

function darkest(row, col) {
  // Smaller Dot
  fill(0);
  circle(
    col * cell_size + cell_size / 2,
    row * cell_size + cell_size / 2,
    cell_size / 8
  );
  // Larger Circle
  noFill();
  stroke(0);
  circle(
    col * cell_size + cell_size / 2,
    row * cell_size + cell_size / 2,
    (cell_size * 3) / 4
  );

  // Box
  /*
  line(
    col * cell_size + (cell_size * 1) / 7,
    row * cell_size + (cell_size * 1) / 8,
    col * cell_size + (cell_size * 1) / 8,
    row * cell_size + (cell_size * 7) / 8
  );
  line(
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 1) / 8,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 7) / 8
  );
  line(
    col * cell_size + (cell_size * 1) / 7,
    row * cell_size + (cell_size * 1) / 8,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 1) / 8
  );
  line(
    col * cell_size + (cell_size * 1) / 8,
    row * cell_size + (cell_size * 7) / 8,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 7) / 8
  );
  */
}
function kind_of_dark(row, col) {
  // Draw S Shape
  line(
    col * cell_size + (cell_size * 1) / 7,
    row * cell_size + (cell_size * 1) / 7,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 1) / 8
  );
  line(
    col * cell_size + (cell_size * 1) / 7,
    row * cell_size + (cell_size * 1) / 2,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 1) / 2
  );
  line(
    col * cell_size + (cell_size * 1) / 7,
    row * cell_size + (cell_size * 7) / 8,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 7) / 8
  );
  line(
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 1) / 8,
    col * cell_size + (cell_size * 7) / 8,
    row * cell_size + (cell_size * 1) / 2
  );
  line(
    col * cell_size + (cell_size * 1) / 8,
    row * cell_size + (cell_size * 1) / 2,
    col * cell_size + (cell_size * 1) / 8,
    row * cell_size + (cell_size * 7) / 8
  );
}
function normal_light(row, col) {
  // Draw Plus Sign
  line(
    col * cell_size + cell_size / 2,
    row * cell_size + (cell_size * 7) / 8,
    col * cell_size + cell_size / 2,
    row * cell_size + cell_size / 8
  );
  line(
    col * cell_size + cell_size / 8,
    row * cell_size + (cell_size * 1) / 2,
    col * cell_size + cell_size - cell_size / 8,
    row * cell_size + (cell_size * 1) / 2
  );
}
function kind_of_light(row, col) {
  // Dash
  line(
    col * cell_size + cell_size / 8,
    row * cell_size + cell_size / 2,
    col * cell_size + cell_size - cell_size / 8,
    row * cell_size + cell_size / 2
  );
}
function lightest(row, col) {
  // Dot
  fill(0);
  circle(
    col * cell_size + cell_size / 2,
    row * cell_size + cell_size / 2,
    cell_size / 8
  );
}

function keyPressed() {
  if (key === "j") {
    saveCanvas("mona", "jpg");
  } else if (key === "p") {
    saveCanvas("mona", "png");
  }
}
