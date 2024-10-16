let num_horizontal_squares = 20;
let num_vertical_squares;
let min_square_width;
let max_square_width;
let square_array;
let horizontal_spacing;
let vertical_spacing;
let horizontal_offset
let vertical_offset

function setup() {
  createCanvas(405, 720);
  rectMode(CENTER);
  colorMode(HSB)
  min_square_width = 10;
  max_square_width = 40;
  num_vertical_squares = floor(num_horizontal_squares * height / width)
  horizontal_spacing = width / num_horizontal_squares
  vertical_spacing = height / num_vertical_squares
  horizontal_offset = (width - (num_horizontal_squares - 1) * horizontal_spacing) / 2.0
  vertical_offset = (height - (num_vertical_squares - 1) * vertical_spacing) / 2.0
  square_array = new Array(num_vertical_squares);
  for (rows = 0; rows < num_vertical_squares; rows++) {
    square_array[rows] = new Array(num_horizontal_squares);
  }

  for (rows = 0; rows < num_vertical_squares; rows++) {
    for (cols = 0; cols < num_horizontal_squares; cols++) {
      square_array[cols][rows] = { width: map(sin(rows + cols), -1, 1, min_square_width, max_square_width), colour: map(sin(rows + cols), -1, 1, 0, 360)};
    }
  }
}

function draw() {
  background(20);
  //noStroke()
  for (rows = 0; rows < num_vertical_squares; rows++) {
    for (cols = 0; cols < num_horizontal_squares; cols++) {
      fill(square_array[cols][rows].colour,100,100)
      circle(
        cols * horizontal_spacing + horizontal_offset,
        rows * vertical_spacing + vertical_offset ,
        square_array[cols][rows].width
      );
      square_array[cols][rows].width = map(sin(rows + cols + frameCount/5), -1, 1, min_square_width, max_square_width)
    
    }
  }
  
}

function keyPressed() {
  if (key == " ") {
    const options = {
      units:"frames",
      delay:0
    }
    saveGif("sinusodialCircles.gif",100,options)
  }
}
