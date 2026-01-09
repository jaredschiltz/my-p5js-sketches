/*
Genuary 2026 - January 9th: Crazy automaton. Cellular automata with crazy rules
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let rule_set;
let cell_array;
let cell_array_rows = 200;
let cell_array_cols = cell_array_rows;
let cell_size;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#ff3da7");
  background_color = color("#fffd00");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  cell_size = border_size / cell_array_cols;

  cell_array = new Array(cell_array_rows).fill(0);
  for (let rows = 0; rows < cell_array_rows; rows++) {
    cell_array[rows] = new Array(cell_array_cols).fill(0);
  }

  rule_set = new Array(8);
  initialize_cell_array();

  // make_rule_30_ruleset();
  // make_rule_41_ruleset();
  // make_rule_60_ruleset();
  // make_rule_73_ruleset();
  // make_rule_89_ruleset();
  make_rule_105_ruleset();
  compute_cell_array();
  noLoop();
}

function draw() {
  background(background_color);
  push();
  translate(start_pos, start_pos);
  for (let rows = 0; rows < cell_array_rows; rows++) {
    for (let cols = 0; cols < cell_array_cols; cols++) {
      if (cell_array[rows][cols] == 1) {
        fill(foreground_color);
        stroke(foreground_color);
      } else {
        fill(background_color);
        stroke(background_color);
      }
      rect(cols * cell_size, rows * cell_size, cell_size, cell_size);
    }
  }
  pop();
  /*
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.9", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function compute_rule(a, b, c, rule_set) {
  // Inputs (a, b, c) are integers representing binary value; i.e., 0 or 1
  // Ruleset is the output associated with each ruleIndex
  inputString = str(a) + str(b) + str(c);
  ruleIndex = int(inputString, 2); // Convert string to decimal representation of binary value
  return rule_set[ruleIndex];
}

function print_rule_set() {
  for (let r = 0; r < rule_set.length; r++) {
    print(`Index: ${r} Value: ${rule_set[r]}`);
  }
}

function initialize_cell_array() {
  // Create Random Rule Set
  /*
  for (let i = 0; i < rule_set.length; i++) {
    rule_set[i] = Math.round(Math.random());
  }
  */
  // console.log(rule_set)

  // Initialize first row with random values
  for (let cols = 0; cols < cell_array_cols; cols++) {
    cell_array[0][cols] = Math.round(Math.random());
  }
}

function compute_cell_array() {
  // Compute the rest of the rows in the cell_array
  for (let rows = 0; rows < cell_array_rows - 1; rows++) {
    // stop one row from the bottom
    for (let cols = 0; cols < cell_array_cols; cols++) {
      // Check for edge cases and evaluate separately
      if (cols == 0) {
        //Left edge, so pull wrap around cell (right-most cell)
        cell_array[rows + 1][0] = compute_rule(
          cell_array[rows][cell_array_cols - 1],
          cell_array[rows][0],
          cell_array[rows][1],
          rule_set
        );
      } else if (cols == cell_array_cols - 1) {
        //Right edge, so pull wrap around cell (left-most cell)
        cell_array[rows + 1][cell_array_cols - 1] = compute_rule(
          cell_array[rows][cell_array_cols - 2],
          cell_array[rows][cell_array_cols - 1],
          cell_array[rows][0],
          rule_set
        );
      } else {
        cell_array[rows + 1][cols] = compute_rule(
          cell_array[rows][cols - 1],
          cell_array[rows][cols],
          cell_array[rows][cols + 1],
          rule_set
        );
      }
    }
  }
}

function make_rule_30_ruleset() {
  rule_set[0] = 0;
  rule_set[1] = 1;
  rule_set[2] = 1;
  rule_set[3] = 1;
  rule_set[4] = 1;
  rule_set[5] = 0;
  rule_set[6] = 0;
  rule_set[7] = 0;
}

function make_rule_41_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 1;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 0;
  rule_set[7] = 0;
}

function make_rule_60_ruleset() {
  rule_set[0] = 0;
  rule_set[1] = 0;
  rule_set[2] = 1;
  rule_set[3] = 1;
  rule_set[4] = 1;
  rule_set[5] = 1;
  rule_set[6] = 0;
  rule_set[7] = 0;
}

function make_rule_73_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 1;
  rule_set[4] = 0;
  rule_set[5] = 0;
  rule_set[6] = 1;
  rule_set[7] = 0;
}

function make_rule_89_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 1;
  rule_set[4] = 1;
  rule_set[5] = 0;
  rule_set[6] = 1;
  rule_set[7] = 0;
}

function make_rule_105_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 1;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 1;
  rule_set[7] = 0;
}

function make_rule_106_ruleset() {
  rule_set[0] = 0;
  rule_set[1] = 1;
  rule_set[2] = 0;
  rule_set[3] = 1;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 1;
  rule_set[7] = 0;
}

function make_rule_110_ruleset() {
  rule_set[0] = 0;
  rule_set[1] = 1;
  rule_set[2] = 1;
  rule_set[3] = 1;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 1;
  rule_set[7] = 0;
}

function make_rule_135_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 1;
  rule_set[2] = 1;
  rule_set[3] = 0;
  rule_set[4] = 0;
  rule_set[5] = 0;
  rule_set[6] = 0;
  rule_set[7] = 1;
}

function make_rule_150_ruleset() {
  rule_set[0] = 0;
  rule_set[1] = 1;
  rule_set[2] = 1;
  rule_set[3] = 0;
  rule_set[4] = 1;
  rule_set[5] = 0;
  rule_set[6] = 0;
  rule_set[7] = 1;
}

function make_rule_167_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 1;
  rule_set[2] = 1;
  rule_set[3] = 0;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 0;
  rule_set[7] = 1;
}

function make_rule_169_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 1;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 0;
  rule_set[7] = 1;
}

function make_rule_182_ruleset() {
  rule_set[0] = 0;
  rule_set[1] = 1;
  rule_set[2] = 1;
  rule_set[3] = 0;
  rule_set[4] = 1;
  rule_set[5] = 1;
  rule_set[6] = 0;
  rule_set[7] = 1;
}

function make_rule_193_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 0;
  rule_set[4] = 0;
  rule_set[5] = 0;
  rule_set[6] = 1;
  rule_set[7] = 1;
}

function make_rule_225_ruleset() {
  rule_set[0] = 1;
  rule_set[1] = 0;
  rule_set[2] = 0;
  rule_set[3] = 0;
  rule_set[4] = 0;
  rule_set[5] = 1;
  rule_set[6] = 1;
  rule_set[7] = 1;
}
