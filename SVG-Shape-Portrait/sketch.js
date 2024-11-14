const WIDTH = 600;
const HEIGHT = 900;

let shapes;
let portrait;
let portrait_graphics;

const NUM_HORIZONTAL_TILES = 60;
const NUM_VERTICAL_TILES = NUM_HORIZONTAL_TILES / (WIDTH / HEIGHT);

function preload() {
  portrait = loadImage("assets/jared.png");

  shapes = [];
  shapes.push(loadImage("assets/056.svg"));
  shapes.push(loadImage("assets/076.svg"));
  shapes.push(loadImage("assets/082.svg"));
  shapes.push(loadImage("assets/096.svg"));
  shapes.push(loadImage("assets/117.svg"));
  shapes.push(loadImage("assets/148.svg"));
  shapes.push(loadImage("assets/152.svg"));
  shapes.push(loadImage("assets/157.svg"));
  shapes.push(loadImage("assets/164.svg"));
  shapes.push(loadImage("assets/166.svg"));
  shapes.push(loadImage("assets/186.svg"));
  shapes.push(loadImage("assets/198.svg"));
  shapes.push(loadImage("assets/224.svg"));
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  portrait_graphics = createGraphics(WIDTH, HEIGHT);
  portrait_graphics.image(portrait, 0, 0, WIDTH, HEIGHT);
  noLoop();
}

function draw() {
  background(220);
  let horizontal_tile_width = WIDTH / NUM_HORIZONTAL_TILES;
  let vertical_tile_width = HEIGHT / NUM_VERTICAL_TILES;
  //noFill();
  //stroke(255, 0, 0);
  portrait_graphics.loadPixels();
  for (let row = 0; row < NUM_VERTICAL_TILES; row++) {
    for (let col = 0; col < NUM_HORIZONTAL_TILES; col++) {
      // get current color
      let current_color = portrait_graphics.get(
        col * horizontal_tile_width + horizontal_tile_width / 2,
        row * vertical_tile_width + vertical_tile_width / 2
      );
      let greyscale = round(
        red(current_color) * 0.222 +
          green(current_color) * 0.707 +
          blue(current_color) * 0.071
      );

      let gradient_to_index = round(
        map(greyscale, 10, 255, 0, shapes.length - 3)
      );
      image(
        shapes[gradient_to_index],
        col * horizontal_tile_width,
        row * vertical_tile_width,
        horizontal_tile_width,
        vertical_tile_width
      );
      // Draw Grid
      /*
      rect(
        col * horizontal_tile_width,
        row * vertical_tile_width,
        horizontal_tile_width,
        vertical_tile_width
      );
      */
    }
  }
  /*
  for (let gridX = 0; gridX < portrait.width; gridX++) {
    for (let gridY = 0; gridY < portrait.height; gridY++) {
      // grid position + title size
      let titleWidth = 603 / portrait.width;
      let titleHeight = 873 / portrait.height;
      let posX = titleWidth * gridX;
      let posY = titleHeight * gridY;

      // get current color
      portrait.loadPixels();
      let c = portrait.get(min(gridX, portrait.width - 1), gridY);
      // greyscale conversion
      let greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
      let gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));
      image(shapes[gradientToIndex], posX, posY, titleWidth, titleHeight);
    }
  }
  */
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
