const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;
let color_1;
let color_2;
let rule_set;
let cell_array;
let cell_array_rows;
let cell_array_cols;
const cell_size = 4; // Make this so, number of cells (WIDTH_HEIGHT / cell_size) is an integer

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  color_1 = color(0, 0, 0);
  color_2 = color(255, 255, 255);
  cell_array_rows = floor(CANVAS_HEIGHT / cell_size);
  cell_array_cols = floor(CANVAS_WIDTH / cell_size);
  cell_array = new Array(cell_array_rows).fill(0);
  for (let rows = 0; rows < cell_array_rows; rows++) {
    cell_array[rows] = new Array(cell_array_cols).fill(0);
  }
  rule_set = new Array(8);
  initialize_cell_array();

  make_rule_30_ruleset();
  //make_rule_41_ruleset();
  // make_rule_60_ruleset();
  // make_rule_73_ruleset();
  // make_rule_89_ruleset();
  // make_rule_105_ruleset();
  //make_rule_106_ruleset();
  //make_rule_110_ruleset();
  //make_rule_135_ruleset();
  // make_rule_150_ruleset();
  //make_rule_167_ruleset();
  //make_rule_169_ruleset();
  // make_rule_182_ruleset();
  // make_rule_193_ruleset();
  //make_rule_193_ruleset();
  //make_rule_225_ruleset();

  compute_cell_array();
  //print_rule_set();
  noLoop();
}

function draw() {
  background(220);
  noStroke();
  // Generate CA
  for (let rows = 0; rows < cell_array_rows; rows++) {
    for (let cols = 0; cols < cell_array_cols; cols++) {
      if (cell_array[rows][cols] == 1) {
        fill(color_1);
      } else {
        fill(color_2);
      }
      rect(cols * cell_size, rows * cell_size, cell_size, cell_size);
    }
  }

  // Flood-Fill inside CA
  // For Retina display, pixelDensity() will return value of 2
  let background_color = color(255, 255, 255);
  let fill_color_array = [
    "#3F8A8C",
    "#0C5679 ",
    "#0B0835",
    "#E5340B",
    "#F28A0F",
    "#FFE7BD",
  ];

  loadPixels();
  let d = pixelDensity();
  for (let x = 0; x < width * d; x++) {
    for (let y = 0; y < height * d; y++) {
      //loadPixels();
      fill_color = color(
        fill_color_array[floor(random(0, fill_color_array.length))]
      );
      if (random() < 1.1) {
        flood_fill_4(y, x, width * 2, height * 2, background_color, fill_color);
      }
      //updatePixels();
    }
  }
  updatePixels();
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");

    // N.B.
    // By default, the pixel density is 2
    // So, if our canvas is setup to be 800 x 800,
    // The resulting image will be 800 * 2 x 800 * 2,
    // or 1600 x 1600

    saveCanvas("Output_CA", "png");
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
