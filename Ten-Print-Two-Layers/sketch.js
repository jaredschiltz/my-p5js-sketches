const WIDTH_HEIGHT = 800;
const ASPECT_RATIO = 0.5; // Width to Height
const TILE_WIDTH = 20;
const TILE_HEIGHT = TILE_WIDTH / ASPECT_RATIO;

let background_color;
let color1;
let color2;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  background_color = color("#00a4cc");
  color1 = color("#ff3ea5");
  color2 = color("#edff00");
  strokeWeight(6);
  noLoop();
}

function draw() {
  background(background_color);
  let num_tiles_width = floor(width / TILE_WIDTH);
  let num_tiles_height = floor(height / TILE_HEIGHT);
  let horizontal_spacing = (width - num_tiles_width * TILE_WIDTH) / 2.0;
  let vertical_spacing = (height - num_tiles_height * TILE_HEIGHT) / 2.0;
  noFill();
  stroke(0);
  for (let row = 0; row < num_tiles_height; row++) {
    for (let col = 0; col < num_tiles_width; col++) {
      let select = floor(random(0, 2));
      if (select == 1) {
        stroke(color1);
        line(
          horizontal_spacing + col * TILE_WIDTH,
          vertical_spacing + row * TILE_HEIGHT + TILE_HEIGHT,
          horizontal_spacing + col * TILE_WIDTH + TILE_WIDTH,
          vertical_spacing + row * TILE_HEIGHT
        );
      } else {
        stroke(color2);
        line(
          horizontal_spacing + col * TILE_WIDTH,
          vertical_spacing + row * TILE_HEIGHT,
          horizontal_spacing + col * TILE_WIDTH + TILE_WIDTH,
          vertical_spacing + row * TILE_HEIGHT + TILE_HEIGHT
        );
      }
      /*
      stroke(255);
      rect(
        horizontal_spacing + col * TILE_WIDTH,
        vertical_spacing + row * TILE_HEIGHT,
        TILE_WIDTH,
        TILE_HEIGHT
      );
	  */
    }
  }
}
