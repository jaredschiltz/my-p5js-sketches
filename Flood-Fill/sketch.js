const WIDTH_HEIGHT = 800;
const GRID_WIDTH_HEIGHT = 9;
const GRID_SIZE = WIDTH_HEIGHT / GRID_WIDTH_HEIGHT;
let grid_array = new Array(GRID_WIDTH_HEIGHT);
let background_color;
let border_color;
let fill_color;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  background_color = color(255, 255, 255);
  border_color = color(0, 0, 0);
  fill_color = color(255, 216, 1);
  for (let i = 0; i < grid_array.length; i++) {
    grid_array[i] = new Array(GRID_WIDTH_HEIGHT);
  }
  initialize_grid();
  noLoop();
}

function draw() {
  background(255, 0, 0);
  // Run Flood Fill
  // flood_fill_4(4, 4, grid_array, background_color, fill_color);
  flood_fill_8(4, 4, grid_array, background_color, fill_color);
  draw_grid();
}

function initialize_grid() {
  // set all background tiles
  for (let row = 0; row < grid_array.length; row++) {
    for (let col = 0; col < grid_array[0].length; col++) {
      grid_array[row][col] = background_color;
    }
  }
  //set all border tiles
  for (let row = 0; row < grid_array.length; row++) {
    grid_array[row][0] = border_color;
  }
  for (let row = 0; row < grid_array.length; row++) {
    grid_array[row][GRID_WIDTH_HEIGHT - 1] = border_color;
  }
  for (let col = 0; col < grid_array[0].length; col++) {
    grid_array[0][col] = border_color;
  }
  for (let col = 0; col < grid_array[0].length; col++) {
    grid_array[GRID_WIDTH_HEIGHT - 1][col] = border_color;
  }
  // Set inner border tiles
  grid_array[4][1] = border_color;
  grid_array[4][2] = border_color;
  grid_array[3][3] = border_color;
  grid_array[2][4] = border_color;
  grid_array[1][4] = border_color;
  grid_array[7][4] = border_color;
  grid_array[6][4] = border_color;
  grid_array[5][5] = border_color;
  grid_array[4][6] = border_color;
  grid_array[4][7] = border_color;

  // set these inner tiles to test diagonals
  // grid_array[5][3] = border_color;
  // grid_array[3][5] = border_color;

  // grid_array[0][0] = background_color;
  // grid_array[GRID_WIDTH_HEIGHT - 1][0] = background_color;
  // grid_array[0][GRID_WIDTH_HEIGHT - 1] = background_color;
  // grid_array[GRID_WIDTH_HEIGHT - 1][GRID_WIDTH_HEIGHT - 1] = background_color;
}
function draw_grid() {
  noStroke();
  for (let row = 0; row < grid_array.length; row++) {
    for (let col = 0; col < grid_array[0].length; col++) {
      fill(grid_array[row][col]);
      rect(col * GRID_SIZE, row * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    // saveGif("output_gif", 10);
  }
}
