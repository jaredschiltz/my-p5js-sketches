const NUMBER_PRIMES = 12000;
const SCALING_FACTOR = 3;
let BACKGROUND_COLOR;
let PRIME_COLOR;
let NOT_PRIME_COLOR;
function setup() {
  createCanvas(800, 800);
  BACKGROUND_COLOR = color("#0C0E0C");
  PRIME_COLOR = color("#FFFFFF");
  NOT_PRIME_COLOR = color("#888888");
  noLoop();
}

function draw() {
  background(BACKGROUND_COLOR);
  fill(0);
  noStroke(); // Hide Spiral Line

  push();
  translate(width / 2, height / 2);
  // run through all the primes
  for (let i = 1; i < NUMBER_PRIMES; i++) {
    let theta = sqrt(i) * TWO_PI;
    let r = sqrt(i) * SCALING_FACTOR;
    let x = cos(theta) * r;
    let y = -sin(theta) * r;
    if (isPrime(i)) {
      fill(PRIME_COLOR);
      circle(x, y, SCALING_FACTOR * 0.7);
    } else {
      fill(NOT_PRIME_COLOR);
      circle(x, y, SCALING_FACTOR * 0.5);
    }
  }
  pop();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function isPrime(integer) {
  if (integer == 1) {
    return false;
  } else {
    for (let i = 2; i <= sqrt(integer); i++) {
      if (integer % i == 0) {
        return false;
      }
    }
  }
  return true;
}
