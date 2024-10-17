let newVector;
let oldVector;
const stepSize = 3

function setup() {
  createCanvas(400, 400);
  background(220);
  newVector = createVector(width / 2, height / 2);
  oldVector = createVector(width / 2, height / 2);
  stroke(0);
}

function draw() {
  let move = floor(random(0,4))
  switch(move) {
    case 0:
      newVector.x += 1 * stepSize
      newVector.y += 0
      break;
    case 1:
      newVector.x += 0
      newVector.y += 1 * stepSize
      break;
    case 2:
      newVector.x -= 1 * stepSize
      newVector.y -= 0
      break;
    case 3:
      newVector.x -= 0 
      newVector.y -= 1 * stepSize
      break;
  }

  line(newVector.x, newVector.y, oldVector.x, oldVector.y);
  oldVector.x = newVector.x;
  oldVector.y = newVector.y;
}
