/*
Genuary 2026 - January 8th: A City. Create a generative metropolis.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

const HORIZONTAL_PIXELS = 128;
const VERTICAL_PIXELS = 128;
let grid;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  grid = new Grid(
    { w: HORIZONTAL_PIXELS, h: VERTICAL_PIXELS },
    { w: WIDTH_HEIGHT, h: WIDTH_HEIGHT }
  );
  foreground_color = color("#ffffff");
  background_color = color("#222034");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  noLoop();
}

function draw() {
  background(background_color);
  /*
  grid.set_pixel(createVector(63, 63), color(255, 255, 255));
  grid.draw_line(createVector(0, 0), createVector(20, 63), color(255, 0, 0));
  grid.draw_ellipse_unfilled(
    createVector(32, 32),
    createVector(5, 5),
    color(0, 255, 0)
  );
  grid.draw_ellipse_filled(
    createVector(32, 32),
    createVector(3, 3),
    color(255, 255, 0)
  );
  grid.draw_rect_unfilled(
    createVector(0, 0),
    createVector(5, 5),
    color(255, 0, 255)
  );
  grid.draw_rect_filled(
    createVector(1, 1),
    createVector(3, 3),
    color(255, 255, 255)
  );

  grid.draw_rect_filled_pattern(
    createVector(6, 6),
    createVector(20, 10),
    0x8520,
    color(255, 0, 255)
  );
  */
  // Draw sky
  grid.draw_rect_filled(
    createVector(0, 0),
    createVector(127, 127),
    color("#222234")
  );

  // Draw starts
  for (i = 0; i < 100; i++) {
    grid.set_pixel(
      createVector(floor(random(0, 128)), floor(random(0, 128))),
      color("#595652")
    );
  }
  for (i = 0; i < 50; i++) {
    grid.set_pixel(
      createVector(floor(random(0, 128)), floor(random(0, 128))),
      color("#ffffff")
    );
  }

  // Draw moon
  grid.draw_ellipse_filled(
    createVector(100, 15),
    createVector(8, 8),
    color("#fbf236")
  );

  // Draw first layer of buildings
  let building_width_height_multiple = 10;
  let total_building_width = 0;
  while (total_building_width <= HORIZONTAL_PIXELS) {
    let building_width = floor(random(1, 2)) * building_width_height_multiple;
    grid.draw_rect_filled_pattern(
      createVector(
        total_building_width,
        110 - floor(random(1, 8)) * building_width_height_multiple
      ),
      createVector(building_width, 128),
      0x8080,
      color("#fbf236"),
      color("#3f3f74")
    );

    total_building_width += building_width;
  }

  // Draw second layer of buildings
  building_width_height_multiple = 10;
  total_building_width = 0;
  while (total_building_width <= HORIZONTAL_PIXELS) {
    let building_width = floor(random(1, 2)) * building_width_height_multiple;
    grid.draw_rect_filled_pattern(
      createVector(
        total_building_width,
        128 - floor(random(1, 8)) * building_width_height_multiple
      ),
      createVector(building_width, 128),
      0x8080,
      color("#fbf236"),
      color("#000000")
    );

    total_building_width += building_width;
  }

  grid.show();
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);

  /*
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.8", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
