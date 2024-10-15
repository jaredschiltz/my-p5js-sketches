let colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
let num_squares_across = 10;
let square_length = 25;
let square_spacing = 8;
let square_array;
let total_width;
let horizontal_offset;
let vertical_offset;

function setup() {
  createCanvas(405, 720);
  square_array = new Array(num_squares_across);
  for (i = 0; i < num_squares_across; i++) {
    square_array[i] = new Array(num_squares_across);
  }
  total_width =
    (square_length + square_spacing) * num_squares_across - square_spacing;
  horizontal_offset = (width - total_width) / 2.0;
  vertical_offset = (height - total_width) / 2.0;
  for (row = 0; row < square_array.length; row++) {
    for (col = 0; col < square_array.length; col++) {
      square_array[col][row] = colors[floor(random(0, colors.length))];
    }
  }
}

function draw() {
  //background(colors[floor(random(0, colors.length))]);
  background(40);
  for (row = 0; row < square_array.length; row++) {
    for (col = 0; col < square_array.length; col++) {
      fill(square_array[col][row]);
      rect(
        horizontal_offset + (square_length + square_spacing) * col,
        vertical_offset + (square_length + square_spacing) * row,
        square_length,
        square_length
      );
    }
  }
  // Randomly choose square to update color
  for (i = 0; i < 5; i++) {
    let random_row = floor(random(0, square_array.length));
    let random_col = floor(random(0, square_array.length));
    square_array[random_col][random_row] =
      colors[floor(random(0, colors.length))];
  }
}
