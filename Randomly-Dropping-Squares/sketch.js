const num_horiz_squares = 25;
const horiz_spacing = 5;
let square_width;
let num_vert_squares;
let vert_spacing;
// Array for Display
let cell_array = new Array(num_horiz_squares);
let square_array = new Array(num_horiz_squares);
let BLACK;
let WHITE;
let GREEN;
let VIOLET;

class Cell {
  constructor(x, y, cell_width, colour) {
    this.pos = createVector(x, y);
    this.cell_width = cell_width;
    this.colour = colour;
  }

  draw() {
    noStroke();
    fill(this.colour);
    rect(this.pos.x, this.pos.y, this.cell_width, this.cell_width);
  }
}

function setup() {
  createCanvas(500, 800);
  //frameRate(10);
  square_width =
    (width - (horiz_spacing + horiz_spacing * num_horiz_squares)) /
    num_horiz_squares;
  num_vert_squares = int((height / width) * num_horiz_squares);
  vert_spacing =
    (height - num_vert_squares * square_width) / (num_vert_squares + 1);
  BLACK = color(0, 0, 0);
  WHITE = color(255, 255, 255);
  GREEN = color(91, 188, 75);
  VIOLET = color(179, 99, 166);
  for (let r = 0; r < num_horiz_squares; r++) {
    cell_array[r] = new Array(num_vert_squares);
    square_array[r] = new Array(num_vert_squares);
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
        WHITE
      );
      square_array[c][r] = 0;
    }
  }
  //saveGif('falling_squares', 22);
}

function draw() {
  background(255);
  fill(0);
  for (let c = 0; c < num_horiz_squares; c++) {
    for (let r = 0; r < num_vert_squares; r++) {
      cell_array[c][r].draw();
    }
  }



  if (is_square_array_full(square_array) == false) {

    let current_color;
    // Pick a random colour - 4:1 odds to pick Green
    if (random() < 0.2) {
      current_color = VIOLET;
    } else {
      current_color = GREEN;
    }
    
        // Pick a random column
    let random_column = floor(random(0, num_horiz_squares));
    if (is_column_full(square_array,random_column) == true){
     
    }
    else{
      square_array[random_column][0] = 1;
      
    cell_array[random_column][0].colour = current_color;
    }


      print_square_array(square_array);
  update_square_array(square_array);
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

function update_square_array(array) {
  let cols = array.length;
  let rows = array[0].length;
  for (let c = 0; c < num_horiz_squares; c++) {
    for (let r = 0; r < num_vert_squares - 1; r++) {
      if (
        array[c][num_vert_squares - r - 2] == 1 &&
        array[c][num_vert_squares - r - 1] != 1
      ) {
        array[c][num_vert_squares - r - 2] = 0;
        let current_color = cell_array[c][num_vert_squares - r - 2].colour;
        cell_array[c][num_vert_squares - r - 2].colour = WHITE;
        array[c][num_vert_squares - r - 1] = 1;
        cell_array[c][num_vert_squares - r - 1].colour = current_color;
      }
    }
  }
}

function is_square_array_full(array) {
  for (let c = 0; c < num_horiz_squares; c++) {
    for (let r = 0; r < num_vert_squares - 1; r++) {
      if (array[c][r] == 0) {
        return false;
      }
    }
  }
  return true;
}

function is_column_full(array,column){
  for (let r = 0; r < array[0].length; r++) {
    if (array[column][r] == 0) {
      return false
    }
  }
  return true
}