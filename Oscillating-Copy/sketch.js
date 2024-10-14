const WIDTH_HEIGHT = 1000;
let img;
let buffer;
let canvas;
let frame_counter = 0;

function preload() {
  img = loadImage("david.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  image_buffer = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  buffer = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  canvas = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  rectMode(CENTER);
  image_buffer.image(img, 0, 0);
}

function draw() {
  background(255);
  canvas.background(0);
  let resolution = 120;
  let step_size = width / resolution;
  for (let row = 0; row < height; row += step_size) {
    for (let col = 0; col < width; col += step_size) {
      let pixel_color = image_buffer.get(col, row);
      let pixel_brightness = brightness(pixel_color);
      //let tile_size = map(pixel_brightness, 0, 255, 8, 0);
      tile_size = step_size;
      buffer.stroke(pixel_color);
      buffer.fill(pixel_color);
      buffer.push();
      buffer.translate(col, row);
      buffer.rect(0, 0, tile_size, tile_size);
      buffer.pop();
    }
  }
  let moving_tiles_x = 100;
  let moving_tiles_y = 100;
  let moving_tile_x_width = width / moving_tiles_x;
  let moving_tile_y_height = height / moving_tiles_y;
  let range_of_x_motion = 10;
  let range_of_y_motion = 20;

  let acc = 3;
  for (let row = 0; row < moving_tiles_y; row++) {
    for (let col = 0; col < moving_tiles_x; col++) {
      let translate_x = map(
        sin(radians(frameCount * acc + (col * 11 + row * 11))),
        -1,
        1,
        -range_of_x_motion,
        range_of_x_motion
      );
      let translate_y = map(
        cos(radians(frameCount * acc + row * 10)),
        -1,
        1,
        -range_of_y_motion,
        range_of_y_motion
      );
      //copy buffer to canvas
      canvas.copy(
        buffer,
        col * moving_tile_x_width + translate_x,
        row * moving_tile_y_height + translate_y,
        moving_tile_x_width,
        moving_tile_y_height,
        col * moving_tile_x_width,
        row * moving_tile_y_height,
        moving_tile_x_width,
        moving_tile_y_height
      );
    }
  }
  image(canvas, 0, 0);
}

function keyPressed() {
  if (key === "s") {
    saveGif("david.gif", 5); // 1 sec
  }
}
