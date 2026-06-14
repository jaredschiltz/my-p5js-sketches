const WIDTH_HEIGHT = 800;
let BORDER = 50;
let NUM_CELLS;
let CELL_WIDTH_HEIGHT;
let cell_template;
let tile_array = [];
let foreground_color;
let background_color;
let color_palette;

async function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  //cell_template = await loadImage("shape.png");
  CELL_WIDTH_HEIGHT = 60;
  //TODO: Compute NUM_CELLS based on specified CELL_WIDTH
  NUM_CELLS = floor((WIDTH_HEIGHT - 2 * BORDER) / (CELL_WIDTH_HEIGHT / 2)) - 1;
  print(NUM_CELLS);
  let CELL_CHAIN_LENGTH = (NUM_CELLS + 1) * (CELL_WIDTH_HEIGHT / 2);
  color_palette = ["#000000", "#fffdd0"];
  foreground_color = color(color_palette[0]);
  background_color = color(color_palette[1]);
  tile_array.push(
    make_tile_0(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_1(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_2(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_3(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_4(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_5(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_6(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_7(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_8(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_9(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_10(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_11(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_12(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_13(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
    make_tile_14(
      CELL_WIDTH_HEIGHT,
      color(background_color),
      color(foreground_color),
    ),
  );

  noLoop();
}

function draw() {
  background(background_color);
  push();
  translate(BORDER, BORDER);
  for (let rows = 0; rows < NUM_CELLS; rows++) {
    for (let cols = 0; cols < NUM_CELLS; cols++) {
      push();
      translate((cols * CELL_WIDTH_HEIGHT) / 2, (rows * CELL_WIDTH_HEIGHT) / 2);
      //image(cell_template, 0, 0, CELL_WIDTH_HEIGHT, CELL_WIDTH_HEIGHT);
      image(tile_array[floor(random(tile_array.length))], 0, 0);
      pop();
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

function make_tile_0(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 0
  tile_0 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_0.background(255, 255, 255, 0);
  // Draw Wings
  tile_0.noStroke();
  tile_0.fill(tile_background_color);
  tile_0.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_0.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_0.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_0.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_0.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_0.noFill();
  tile_0.stroke(tile_foreground_color);
  tile_0.strokeWeight(tile_width_height / 6);
  tile_0.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    PI / 2,
    PI,
  );
  tile_0.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI / 2,
    0,
  );

  return tile_0;
}

function make_tile_1(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 1
  tile_1 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_1.background(255, 255, 255, 0);
  // Draw Wings
  tile_1.noStroke();
  tile_1.fill(tile_background_color);
  tile_1.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_1.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_1.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_1.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_1.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );
  // Draw the terminal points
  /*
  tile_1.fill(tile_foreground_color);
  tile_1.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  tile_1.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );

  tile_1.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );

  tile_1.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  */
  // Draw the Arcs
  tile_1.noFill();
  tile_1.stroke(tile_foreground_color);
  tile_1.strokeWeight(tile_width_height / 6);
  tile_1.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    0,
    PI / 2,
  );
  tile_1.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI,
    -PI / 2,
  );

  /*
  // Draw test boundaries
  tile_1.noFill();
  tile_1.stroke(0);
  // Draw Cell Outline
  tile_1.rect(0, 0, tile_width_height, tile_width_height);
  // Debug Tile Outline
  tile_1.rect(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
  );
  */
  return tile_1;
}

function make_tile_2(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 2
  tile_2 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_2.background(255, 255, 255, 0);
  // Draw Wings
  tile_2.noStroke();
  tile_2.fill(tile_background_color);
  tile_2.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_2.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_2.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_2.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_2.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );
  // Draw the terminal points
  tile_2.fill(tile_foreground_color);
  /*
  tile_2.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  */
  tile_2.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );

  tile_2.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );
  /*
  tile_2.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  */
  // Draw the Lines
  tile_2.noFill();
  tile_2.stroke(tile_foreground_color);
  tile_2.strokeWeight(tile_width_height / 6);
  tile_2.line(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height * 0.5,
  );

  return tile_2;
}

function make_tile_3(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 3
  tile_3 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_3.background(255, 255, 255, 0);
  // Draw Wings
  tile_3.noStroke();
  tile_3.fill(tile_background_color);
  tile_3.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_3.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_3.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_3.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_3.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );
  // Draw the terminal points
  tile_3.fill(tile_foreground_color);
  tile_3.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  /*
  tile_3.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );

  tile_3.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );
  */
  tile_3.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  // Draw the Lines
  tile_3.noFill();
  tile_3.stroke(tile_foreground_color);
  tile_3.strokeWeight(tile_width_height / 6);
  tile_3.line(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
  );

  return tile_3;
}

function make_tile_4(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 4
  tile_4 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_4.background(255, 255, 255, 0);
  // Draw Wings
  tile_4.noStroke();
  tile_4.fill(tile_background_color);
  tile_4.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_4.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_4.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_4.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_4.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );
  // Draw the terminal points
  tile_4.fill(tile_foreground_color);
  tile_4.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  tile_4.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );

  tile_4.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );

  tile_4.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );

  return tile_4;
}

function make_tile_5(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 5
  tile_5 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_5.background(255, 255, 255, 0);
  // Draw Wings
  tile_5.noStroke();
  tile_5.fill(tile_background_color);
  tile_5.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_5.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_5.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_5.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_5.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );
  // Draw the Arcs
  tile_5.noFill();
  tile_5.stroke(tile_foreground_color);
  tile_5.strokeWeight(tile_width_height / 6);
  tile_5.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    0,
    PI / 2,
  );
  tile_5.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    PI / 2,
    PI,
  );
  tile_5.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI,
    -PI / 2,
  );
  tile_5.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI / 2,
    0,
  );
  tile_5.line(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
  );

  return tile_5;
}

function make_tile_6(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 6
  tile_6 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_6.background(255, 255, 255, 0);
  // Draw Wings
  tile_6.noStroke();
  tile_6.fill(tile_background_color);
  tile_6.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_6.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_6.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_6.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_6.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  tile_6.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  // Draw the Lines
  tile_6.noFill();
  tile_6.stroke(tile_foreground_color);
  tile_6.strokeWeight(tile_width_height / 6);
  tile_6.line(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
  );
  tile_6.noFill();
  tile_6.stroke(tile_foreground_color);
  tile_6.strokeWeight(tile_width_height / 6);
  tile_6.line(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height * 0.5,
  );

  return tile_6;
}

function make_tile_7(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 7
  tile_7 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_7.background(255, 255, 255, 0);
  // Draw Wings
  tile_7.noStroke();
  tile_7.fill(tile_background_color);
  tile_7.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_7.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_7.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_7.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_7.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_7.noFill();
  tile_7.stroke(tile_foreground_color);
  tile_7.strokeWeight(tile_width_height / 6);
  tile_7.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    PI / 2,
    PI,
  );
  // Draw the terminal points
  tile_7.fill(tile_foreground_color);
  tile_7.noStroke();
  tile_7.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  tile_7.noStroke();
  tile_7.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );
  return tile_7;
}

function make_tile_8(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 8
  tile_8 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_8.background(255, 255, 255, 0);
  // Draw Wings
  tile_8.noStroke();
  tile_8.fill(tile_background_color);
  tile_8.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_8.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_8.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_8.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_8.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_8.noFill();
  tile_8.stroke(tile_foreground_color);
  tile_8.strokeWeight(tile_width_height / 6);
  tile_8.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI / 2,
    0,
  );
  // Draw the terminal points
  tile_8.fill(tile_foreground_color);
  tile_8.noStroke();
  tile_8.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );
  tile_8.noStroke();
  tile_8.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );

  return tile_8;
}

function make_tile_9(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 9
  tile_9 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_9.background(255, 255, 255, 0);
  // Draw Wings
  tile_9.noStroke();
  tile_9.fill(tile_background_color);
  tile_9.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_9.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_9.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_9.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_9.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_9.noFill();
  tile_9.stroke(tile_foreground_color);
  tile_9.strokeWeight(tile_width_height / 6);
  tile_9.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    0,
    PI / 2,
  );
  // Draw the terminal points
  tile_9.fill(tile_foreground_color);
  tile_9.noStroke();
  tile_9.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );
  tile_9.noStroke();
  tile_9.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );

  return tile_9;
}

function make_tile_10(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 10
  tile_10 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_10.background(255, 255, 255, 0);
  // Draw Wings
  tile_10.noStroke();
  tile_10.fill(tile_background_color);
  tile_10.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_10.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_10.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_10.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_10.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_10.noFill();
  tile_10.stroke(tile_foreground_color);
  tile_10.strokeWeight(tile_width_height / 6);
  tile_10.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI,
    -PI / 2,
  );
  // Draw the terminal points
  tile_10.fill(tile_foreground_color);
  tile_10.noStroke();
  tile_10.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );
  tile_10.noStroke();
  tile_10.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );
  return tile_10;
}

function make_tile_11(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 11
  tile_11 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_11.background(255, 255, 255, 0);
  // Draw Wings
  tile_11.noStroke();
  tile_11.fill(tile_background_color);
  tile_11.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_11.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_11.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_11.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_11.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_11.noFill();
  tile_11.stroke(tile_foreground_color);
  tile_11.strokeWeight(tile_width_height / 6);
  tile_11.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    0,
    PI / 2,
  );
  tile_11.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    PI / 2,
    -PI,
  );
  tile_11.line(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height * 0.5,
  );

  // Draw the terminal points
  tile_11.fill(tile_foreground_color);
  tile_11.noStroke();
  tile_11.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height / 6,
  );

  return tile_11;
}

function make_tile_12(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 12
  tile_12 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_12.background(255, 255, 255, 0);
  // Draw Wings
  tile_12.noStroke();
  tile_12.fill(tile_background_color);
  tile_12.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_12.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_12.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_12.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_12.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_12.noFill();
  tile_12.stroke(tile_foreground_color);
  tile_12.strokeWeight(tile_width_height / 6);
  tile_12.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI / 2,
    0,
  );
  tile_12.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI,
    -PI / 2,
  );
  tile_12.line(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
    tile_width_height * 0.5,
  );

  // Draw the terminal points
  tile_12.fill(tile_foreground_color);
  tile_12.noStroke();
  tile_12.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height / 6,
  );

  return tile_12;
}

function make_tile_13(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 13
  tile_13 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_13.background(255, 255, 255, 0);
  // Draw Wings
  tile_13.noStroke();
  tile_13.fill(tile_background_color);
  tile_13.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_13.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_13.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_13.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_13.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_13.noFill();
  tile_13.stroke(tile_foreground_color);
  tile_13.strokeWeight(tile_width_height / 6);
  tile_13.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    PI / 2,
    PI,
  );
  tile_13.arc(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI,
    -PI / 2,
  );
  tile_13.line(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
  );

  // Draw the terminal points
  tile_13.fill(tile_foreground_color);
  tile_13.noStroke();
  tile_13.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );

  return tile_13;
}

function make_tile_14(
  tile_width_height,
  tile_background_color,
  tile_foreground_color,
) {
  // Tile 14
  tile_14 = createGraphics(tile_width_height, tile_width_height);
  // Make the background of the tile transparent
  tile_14.background(255, 255, 255, 0);
  // Draw Wings
  tile_14.noStroke();
  tile_14.fill(tile_background_color);
  tile_14.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_14.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.25,
    tile_width_height / 3,
  );
  tile_14.circle(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );

  tile_14.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.75,
    tile_width_height / 3,
  );
  tile_14.circle(
    tile_width_height * 0.5,
    tile_width_height * 0.5,
    tile_width_height / 2,
  );

  // Draw the Arcs
  tile_14.noFill();
  tile_14.stroke(tile_foreground_color);
  tile_14.strokeWeight(tile_width_height / 6);
  tile_14.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.25,
    tile_width_height / 2,
    tile_width_height / 2,
    0,
    PI / 2,
  );
  tile_14.arc(
    tile_width_height * 0.25,
    tile_width_height * 0.75,
    tile_width_height / 2,
    tile_width_height / 2,
    -PI / 2,
    0,
  );
  tile_14.line(
    tile_width_height * 0.5,
    tile_width_height * 0.25,
    tile_width_height * 0.5,
    tile_width_height * 0.75,
  );

  // Draw the terminal points
  tile_14.fill(tile_foreground_color);
  tile_14.noStroke();
  tile_14.circle(
    tile_width_height * 0.75,
    tile_width_height * 0.5,
    tile_width_height / 6,
  );

  return tile_14;
}
