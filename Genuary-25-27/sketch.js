/*
Genuary 2025 - January 27th Prompt: Make something interesting with no randomness
or noise or trig
*/

const WIDTH_HEIGHT = 800;
// Glitch color palette -- bright colors
let color_array = [
  "#ff001d",
  "#f727f7",
  "#f7f727",
  "#27f727",
  "#001eff",
  "#000000",
];

// let color_array = [
//   "#000000",
//   "#8CEEEE",
//   "#26BFBF",
//   "#FF8A47",
//   "#FC6170",
//   "#FFD747",
// ];
let ZERO_COLOR;
let ONE_COLOR;
let NUMBER_OF_CELLS_PER_ROW;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  /*
  color_array = new Array(20);
  for (let c = 0; c < color_array.length; c++) {
    color_array[c] = color(random(0, 255), random(0, 255), random(0, 255));
  }
    */

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
          fill(color_array[0]);
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
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function bit_field_function(x, y) {
  //let value = (x, y) => floor(random(0, 2)); // just uniform random output
  //let value = (x, y) => (x ^ y) % 5;
  //let value = (x, y) => (x ^ y) % 19;
  //let value = (x, y) => (x * 21) % y;
  //let value = (x, y) => (x % y) % 4;
  //let value = (x, y) => x & y & (x ^ y) % 19;
  //let value = (x, y) => x & y & (x ^ y) % 19;
  let value = (x, y) => (Math.abs(x + y) ^ (Math.abs(x - y) + 1)) ** 13 % 7;
  //let value = (x, y) => (x | y) % 17;
  //let value = (x, y) => (x * y) & 64;
  //let value = (x, y) => (x ^ y) < 77;
  //let value = (x, y) => ((x - 128) * 64) % (y - 128);
  //let value = (x, y) => (x * y) ** 5 % 99;
  //let value = (x, y) => (x * y) ** 4 % 7;
  //let value = (x, y) => (x * y) ** 9 % 3;
  return value(x, y);
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function mousePressed() {
  color_array = shuffle(color_array);
  draw_xor_rug();
}
