const WIDTH_HEIGHT = 900;
const CELL_SIZE = 9;
let box_x = 0;
let box_y = 0;
let box_width = 0;
let box_height = 0;
let ACTIVE_DRAWING_BOX = false;
let box_array = [];
function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
}

function draw() {
  noStroke();
  background(255);

  // Go through every cell and calculate XOR
  for (let row = 0; row < floor(WIDTH_HEIGHT / CELL_SIZE); row++) {
    for (let col = 0; col < floor(WIDTH_HEIGHT / CELL_SIZE); col++) {
      //print(`${row} ${col}`);
      let xor_value = 0;
      for (b of box_array) {
        /*
        print(
          `${b.position.x}, ${b.position.x + b.w} ${b.position.h} ${
            b.position.y + b.h
          }`
        );
        */
        if (
          col >= b.position.x &&
          col < b.position.x + b.w &&
          row >= b.position.y &&
          row < b.position.y + b.h
        ) {
          //print(`cells: ${row} ${col}`);
          xor_value ^= 1;
        }
      }
      if (xor_value === 0) {
        fill(255);
      } else {
        fill(0);
      }
      rect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
  // Just displaying this when actively making a box
  // This gets replaced with an actual Box object with
  // the same coordinates after the mouse is released
  if (ACTIVE_DRAWING_BOX) {
    fill(255, 0, 0);
    rect(
      box_x * CELL_SIZE,
      box_y * CELL_SIZE,
      box_width * CELL_SIZE,
      box_height * CELL_SIZE
    );
  }
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
  if (keyCode === BACKSPACE) {
    // Delete all of the boxes
    box_array = [];
  }
}

function mousePressed() {
  ACTIVE_DRAWING_BOX = true;
  box_x = floor(mouseX / CELL_SIZE);
  box_y = floor(mouseY / CELL_SIZE);
  box_width = 1;
  box_height = 1;
}

function mouseDragged() {
  let new_box_x = floor(mouseX / CELL_SIZE);
  let new_box_y = floor(mouseY / CELL_SIZE);
  //print(`${new_box_x} ${new_box_y}`);
  box_width = new_box_x - box_x + 1;
  box_height = new_box_y - box_y + 1;
}

function mouseReleased() {
  box_array.push(new Box(createVector(box_x, box_y), box_width, box_height));
  ACTIVE_DRAWING_BOX = false;
}
