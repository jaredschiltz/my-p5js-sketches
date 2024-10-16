let cell_size = 4
let grid_size 
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid_size = 256 
   noLoop();
}

function draw() {
  background(255)
  noStroke(0)
  for (let row = 0; row < grid_size; row++) {
    for (let col = 0; col < grid_size; col++) {
      if (gcd(col + 1, row + 1) == 1) {
        fill(255)
      }
      else {
        fill(0)
      }
      rect(col * cell_size, row * cell_size, cell_size, cell_size)
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Function to return gcd of a and b
function gcd(a,b)
{
    let result = Math.min(a, b); // Find Minimum of a nd b
    while (result > 0) {
        if (a % result == 0 && b % result == 0) {
            break;
        }
        result--;
    }
    return result; // return gcd of a nd b
}