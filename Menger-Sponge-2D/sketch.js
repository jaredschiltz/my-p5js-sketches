let iterations = 4;
let square_width;
let square_array;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  square_width = width;
  square_array = new Array();
  build_sponge(createVector(0, 0), square_width, iterations);
}

function draw() {
  background(220);
  stroke(0);
  fill(0)
  translate(width/2, height/2)
  for (let i = 0; i < square_array.length; i++) {
    push()
    translate(square_array[i].vector.x, square_array[i].vector.y)
    rect(0,0,square_array[i].square_width,square_array[i].square_width)
    pop()
  }
}

function build_sponge(center, square_width, iterations) {
  square_width = square_width / 3
  if (iterations == 1) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i == 0 && j == 0)) {
        
          square_array.push({
            vector:
            createVector(
              center.x + i * square_width,
              center.y + j * square_width
            ),
            square_width: square_width
          }
          )
        }
      }
    }
    return;
  } else {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i == 0 && j == 0)) { 
        
          build_sponge(
            createVector(
              center.x + i * square_width,
              center.y + j * square_width
            ),
            square_width,
            iterations - 1
          );
        }
      }
    }
  }
}
