const WIDTH_HEIGHT = 800;
let color_array;
let ZERO_COLOR;
let ONE_COLOR;
let NUMBER_OF_CELLS_PER_ROW;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  color_array = new Array(20);
  for (let c = 0; c < color_array.length; c++) {
    color_array[c] = color(random(0, 255), random(0, 255), random(0, 255));
  }

  NUMBER_OF_CELLS_PER_ROW = 200;
  noStroke();
  noLoop();
}

function draw() {
  draw_xor_rug();
}

function draw_xor_rug() {
  background(220);
  let cell_width = width / NUMBER_OF_CELLS_PER_ROW;
  for (let rows = 0; rows < NUMBER_OF_CELLS_PER_ROW; rows++) {
    for (let cols = 0; cols < NUMBER_OF_CELLS_PER_ROW; cols++) {
      let result = bit_field_function(cols, rows);
      switch (result) {
        case 0:
          fill(color_array[0]);
          break;
        case 1:
          fill(color_array[1]);
          break;
        case 2:
          fill(color_array[2]);
          break;
        case 3:
          fill(color_array[3]);
          break;
        case 4:
          fill(color_array[4]);
          break;

        case 5:
          fill(color_array[5]);
          break;

        default:
          fill(color_array[19]);
      }
      /*
      if (bit_field_function(cols, rows) == 0) {
        fill(color_array[0]);
      } else {
        fill(color_array[1]);
      }
      */
      rect(cols * cell_width, rows * cell_width, cell_width, cell_width);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}

function bit_field_function(x, y) {
  //let value = (x, y) => floor(random(0, 2)); // just uniform random output
  //let value = (x, y) => (x ^ y) % 5;
  //let value = (x, y) => (x ^ y) % 19;
  //let value = (x, y) => (x * 21) % y;
  //let value = (x, y) => (x % y) % 4;
  //let value = (x, y) => x & y & (x ^ y) % 19;
  let value = (x, y) => x & y & (x ^ y) % 19;
  //let value = (x, y) => (Math.abs(x + y) ^ (Math.abs(x - y) + 1)) ** 13 % 7;
  //let value = (x, y) => (x | y) % 17;
  //let value = (x, y) => (x * y) & 64;
  //let value = (x, y) => (x ^ y) < 77;
  //let value = (x, y) => ((x - 128) * 64) % (y - 128);
  //let value = (x, y) => (x * y) ** 5 % 99;
  //let value = (x, y) => (x * y) ** 4 % 7;
  //let value = (x, y) => (x * y) ** 9 % 3;
  return value(x, y);
}

function mousePressed() {
  for (let c = 0; c < color_array.length; c++) {
    color_array[c] = color(random(0, 255), random(0, 255), random(0, 255));
  }
  draw_xor_rug();
}
