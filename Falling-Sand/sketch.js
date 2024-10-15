const WIDTH = 600;
const HEIGHT = 600;
const PIXEL_WIDTH = 4;
const NUM_ROWS = HEIGHT / PIXEL_WIDTH;
const NUM_COLS = WIDTH / PIXEL_WIDTH;
let grid = new Array(NUM_COLS);
let current_color_index = 0
let dropper_x_pos = 0
const NEON_SAND_COLOR_PALETTE = [
  "#b700cc",
  "#f600af",
  "#ffeb01",
  "#42c3d0",
  "#513aee",
];
let SAND_COLOR = NEON_SAND_COLOR_PALETTE[current_color_index];
//const SAND_COLOR = "#dcb159";
const BRUSH_SIZE = 1 ;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(NUM_ROWS);
  }
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      grid[x][y] = { value: 0, colour: color("#000000"), has_moved: false };
    }
  }
}

function draw() {
  background(0);
  noStroke();
  dropper_x_pos = map(noise(0.5 * frameCount),0,1,0,width)
  drop_some_sand(dropper_x_pos, 10)
  
  // draw grid
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      fill(grid[x][y].colour);
      rect(x * PIXEL_WIDTH, y * PIXEL_WIDTH, PIXEL_WIDTH, PIXEL_WIDTH);
    }
  }
  update();

  
}

function update() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS - 1; y++) {
      let next_row = y + 1;
      if (is_empty(x, next_row)) {
        if (grid[x][y].has_moved == false) {
          grid[x][y].has_moved = true;
          swap(x, next_row, x, y);
        }
      } else {
        // Check for edges
        if (x == 0 && is_empty(x + 1, next_row)) {
          if (grid[x][y].has_moved == false) {
            grid[x][y].has_moved = true;
            swap(x + 1, next_row, x, y);
          }
        } else if (x == NUM_COLS - 1 && is_empty(x - 1, next_row)) {
          if (grid[x][y].has_moved == false) {
            grid[x][y].has_moved = true;
            swap(x - 1, next_row, x, y);
          }
        } else {
          // Deal with all particles not on an edge
          // if both diagonals are empty, randomly pick a side

          if (is_empty(x + 1, next_row) && is_empty(x - 1, next_row)) {
            if (Math.random() > 0.5) {
              // Go Right
              if (grid[x][y].has_moved == false) {
                grid[x][y].has_moved = true;
                swap(x + 1, next_row, x, y);
              }
            } else {
              // Go Left
              if (grid[x][y].has_moved == false) {
                grid[x][y].has_moved = true;
                swap(x - 1, next_row, x, y);
              }
            }
          } else if (is_empty(x + 1, next_row)) {
            if (grid[x][y].has_moved == false) {
              grid[x][y].has_moved = true;
              swap(x + 1, next_row, x, y);
            }
          } else if (is_empty(x - 1, next_row)) {
            if (grid[x][y].has_moved == false) {
              grid[x][y].has_moved = true;
              swap(x - 1, next_row, x, y);
            }
          }
        }
      }
    }
  }

  // Clear all has moved particles for next frame
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS - 1; y++) {
      grid[x][y].has_moved = false;
    }
  }
}

function set_colour(x, y, colour) {
  if (x >= 0 && x < NUM_COLS && y >= 0 && y < NUM_ROWS) {
    grid[x][y].colour = colour;
    grid[x][y].value = 1;
  }
}

function is_empty(x, y) {
  if (x >= 0 && x < NUM_COLS && y >= 0 && y < NUM_ROWS) {
    return grid[x][y].value == 0;
  } else {
    return false;
  }
}

function swap(x1, y1, x2, y2) {
  let temp = grid[x1][y1];
  grid[x1][y1] = grid[x2][y2];
  grid[x2][y2] = temp;
}

function mouseDragged() {
  drop_some_sand(mouseX, mouseY);
}

function drop_some_sand(xpos, ypos){
    let colour = varyColor(SAND_COLOR);
  for (let y = -BRUSH_SIZE; y < BRUSH_SIZE; y++) {
    for (let x = -BRUSH_SIZE; x < BRUSH_SIZE; x++) {
      let x_coordinate = floor(xpos / PIXEL_WIDTH) + x;
      let y_coordinate = floor(ypos / PIXEL_WIDTH) + y;
      set_colour(x_coordinate, y_coordinate, colour);
    }
  }
}

function keyPressed(){
  if (keyCode === 32) { // Space bar
    current_color_index = (current_color_index + 1) % NEON_SAND_COLOR_PALETTE.length
     SAND_COLOR = NEON_SAND_COLOR_PALETTE[current_color_index]
    
  }
}

function varyColor(color) {
  let h = floor(hue(color));
  let s = saturation(color) + floor(random(-20, 0));
  s = constrain(s, 0, 100);
  let l = lightness(color) + floor(random(-10, 10));
  l = constrain(l, 0, 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
}
