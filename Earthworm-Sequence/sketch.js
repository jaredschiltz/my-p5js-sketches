// From Clifford Pickover book "Computers and the Imagination"
let number;
let multiplier;
let max_num_digits;
let number_array;
function setup() {
  createCanvas(400, 400);
  noLoop();
  // Pick starting number
  number = 2;
  multiplier = 3;
  max_num_digits = 3;
  number_array = new Array();
  next_number = number * multiplier;
  if (count_digits(number) > max_num_digits) {
    next_number = truncate_number(next_number, max_num_digits);
  }
  number_array.push(next_number);

  while(next_number != number) {
    next_number = next_number * multiplier;
    if (count_digits(next_number) > max_num_digits) {
      next_number = truncate_number(next_number, max_num_digits);
    }
    number_array.push(next_number);
  }


}

function draw() {
  background(220);
    translate(0,height)
  for (let i = 0; i < number_array.length; i++) {
    line(0,0,0,-number_array[i] * 0.1)
    translate(1,0)
  }
}

function truncate_number(number, num_digits_to_truncate) {
  let num_string = number.toString();
  return parseInt(num_string.slice(-num_digits_to_truncate))
}

function count_digits(number) {
  // O(1) Time complexity
  let num_string = number.toString();
  return num_string.length;
}
