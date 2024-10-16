let number
let number_array

function setup() {
  createCanvas(400, 400);
  noLoop()
  number_array = new Array()
}

function draw() {
  background(220);
  // Pick any whole number greater than 1
  number =24511
  number_array.push(number)
  // Run until you get back to 1
  while (number != 1) {
    number = hailstone(number)
    number_array.push(number)
  }
  translate(0,height)
  for (let i = 0; i < number_array.length; i++) {
    line(0,0,0, -number_array[i] * 0.00005)
    translate(1,0)
  }
  
}

function hailstone(input) {
  if (input % 2 == 0) {
    return input / 2
  }
  else {
    return input * 3 + 1
  }
}