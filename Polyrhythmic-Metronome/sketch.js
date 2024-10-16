const num_horiz_squares = 6;
const horiz_spacing = 20;
let square_width;
let num_vert_squares;
let vert_spacing;
// Array for Display
let cell_array = new Array(num_horiz_squares);
let row_zero_count = 0;
let row_one_count = 0;
let row_two_count = 0;
let row_three_count = 0;
let row_four_count = 0;
let alpha = 70;

let osc_zero;
let osc_one;
let osc_two;
let osc_three;
let osc_four;
let attack = 0.1;
let decay = 0.5;

let delay;
let delayTime = 0.2;
let delayFeedback = 0.3;

let run_sketch = false;

function setup() {
  createCanvas(700, 700);
  frameRate(4);

  square_width =
    (width - (horiz_spacing + horiz_spacing * num_horiz_squares)) /
    num_horiz_squares;
  //num_vert_squares = int((height / width) * num_horiz_squares);
  num_vert_squares = 5;
  vert_spacing =
    (height - num_vert_squares * square_width) / (num_vert_squares + 1);

  for (let r = 0; r < num_horiz_squares; r++) {
    cell_array[r] = new Array(num_vert_squares);
  }
  for (let c = 0; c < num_horiz_squares; c++) {
    for (let r = 0; r < num_vert_squares; r++) {
      /*
      print("c: ",c, " x: ", horiz_spacing + c * (square_width + horiz_spacing), " y: ",vert_spacing + r * (square_width + vert_spacing))
      */
      cell_array[c][r] = new Cell(
        horiz_spacing + c * (square_width + horiz_spacing),
        vert_spacing + r * (square_width + vert_spacing),
        square_width,
        color(30, 30, 30)
      );
    }
  }
}

function mousePressed() {
  delay = new p5.Delay();

  osc_zero = new p5.Oscillator("sawtooth");
  osc_one = new p5.Oscillator("sawtooth");
  osc_two = new p5.Oscillator("sawtooth");
  osc_three = new p5.Oscillator("sawtooth");
  osc_four = new p5.Oscillator("sawtooth");

  delay.process(osc_zero, delayTime, delayFeedback, 2300);
  delay.process(osc_one, delayTime, delayFeedback, 2300);
  delay.process(osc_two, delayTime, delayFeedback, 2300);
  delay.process(osc_three, delayTime, delayFeedback, 2300);
  delay.process(osc_four, delayTime, delayFeedback, 2300);
  osc_zero.freq(404.5, 0.1);
  osc_one.freq(270, 0.1);
  osc_two.freq(180, 0.1);
  osc_three.freq(120, 0.1);
  osc_four.freq(80, 0.1);

  osc_zero.amp(0.0, 0.001);
  osc_one.amp(0.0, 0.001);
  osc_two.amp(0.0, 0.001);
  osc_three.amp(0.0, 0.001);
  osc_four.amp(0.0, 0.001);

  osc_zero.start();
  osc_one.start();
  osc_two.start();
  osc_three.start();
  osc_four.start();
  run_sketch = true;
}

function draw() {
  background(0);
  fill(0);
  if (run_sketch == true) {
    for (let c = 0; c < num_horiz_squares; c++) {
      for (let r = 0; r < num_vert_squares; r++) {
        cell_array[c][r].set_colour(color(0, 0, 0));
      }
    }

    if (row_zero_count == 0) {
      osc_zero.amp(1.0, attack);
      cell_array[row_zero_count][0].set_size(true);
      cell_array[row_zero_count][0].set_colour(color(255, 0, 0));
    } else {
      osc_zero.amp(0.0, decay);
      cell_array[row_zero_count][0].set_size(false);
      cell_array[row_zero_count][0].set_colour(color(255, 0, 0, alpha));
    }

    if (row_one_count == 0) {
      osc_one.amp(1.0, attack);
      cell_array[row_one_count][1].set_size(true);
      cell_array[row_one_count][1].set_colour(color(255, 140, 0));
    } else {
      osc_one.amp(0.0, decay);
      cell_array[row_one_count][1].set_size(false);
      cell_array[row_one_count][1].set_colour(color(255, 140, 0, alpha));
    }

    if (row_two_count == 0) {
      osc_two.amp(1.0, attack);
      cell_array[row_two_count][2].set_size(true);
      cell_array[row_two_count][2].set_colour(color(0, 255, 0));
    } else {
      osc_two.amp(0.0, decay);
      cell_array[row_two_count][2].set_size(false);
      cell_array[row_two_count][2].set_colour(color(0, 255, 0, alpha));
    }

    if (row_three_count == 0) {
      osc_three.amp(1.0, attack);
      cell_array[row_three_count][3].set_size(true);
      cell_array[row_three_count][3].set_colour(color(0, 0, 255));
    } else {
      osc_three.amp(0.0, decay);
      cell_array[row_three_count][3].set_size(false);
      cell_array[row_three_count][3].set_colour(color(0, 0, 255, alpha));
    }

    if (row_four_count == 0) {
      osc_four.amp(1.0, attack);
      cell_array[row_four_count][4].set_size(true);
      cell_array[row_four_count][4].set_colour(color(127, 0, 255));
    } else {
      osc_four.amp(0.0, decay);
      cell_array[row_four_count][4].set_size(false);
      cell_array[row_four_count][4].set_colour(color(127, 0, 255, alpha));
    }

    for (let c = 0; c < num_horiz_squares; c++) {
      for (let r = 0; r < num_vert_squares; r++) {
        cell_array[c][r].show();
      }
    }

    row_zero_count = (row_zero_count + 1) % 2;
    row_one_count = (row_one_count + 1) % 3;
    row_two_count = (row_two_count + 1) % 4;
    row_three_count = (row_three_count + 1) % 5;
    row_four_count = (row_four_count + 1) % 6;
  }
}

function print_square_array(array) {
  let cols = array.length;
  let rows = array[0].length;
  let s = "";
  for (let r = 0; r < num_vert_squares; r++) {
    s = str(r) + ": ";
    for (let c = 0; c < num_horiz_squares; c++) {
      s += str(array[c][r]) + " ";
    }
    //print(s);
  }
}
