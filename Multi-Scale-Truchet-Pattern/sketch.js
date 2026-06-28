const WIDTH_HEIGHT = 800;
let BORDER = 50;
let NUM_CELLS;
let CELL_WIDTH_HEIGHT;
let cell_template;
let draw_square_length;
let draw_square_offset;
const LEVELS = 5;
const START_LEVEL = 5; // Highest level
const PROBABILITY = 0.7;
let tile_map = [];

async function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  //cell_template = await loadImage("shape.png");
  CELL_WIDTH_HEIGHT = 200;
  //TODO: Compute NUM_CELLS based on specified CELL_WIDTH
  NUM_CELLS = floor((WIDTH_HEIGHT - 2 * BORDER) / (CELL_WIDTH_HEIGHT / 2)) - 1;
  //print(NUM_CELLS);
  draw_square_length = (NUM_CELLS * CELL_WIDTH_HEIGHT) / 2;
  // offset from border
  draw_square_offset = CELL_WIDTH_HEIGHT / 4;
  noLoop();
}

function draw() {
  let color_palette = ["#000000", "#fffdd0"];
  let foreground_color = color(color_palette[0]);
  let background_color = color(color_palette[1]);
  background("#fffdd0");
  push();
  translate(BORDER, BORDER);
  translate(draw_square_offset, draw_square_offset);
  noFill();
  stroke("#000000");
  rect(0, 0, draw_square_length, draw_square_length);
  let start_pos = createVector(0, 0);
  // Create divisions
  square_divide(LEVELS, start_pos, draw_square_length);
  let square_size_array = [];
  tile_map.forEach((tile) => {
    //console.log(`Position: ${tile.pos}, Length: ${tile.len}`);
    square_size_array.push(tile.len);
    /*
    let random_color = color(
      floor(random(0, 256)),
      floor(random(0, 256)),
      floor(random(0, 256)),
    );
    fill(random_color);
    rect(tile.pos.x, tile.pos.y, tile.len, tile.len);
    */
  });
  square_size_array = Array.from(new Set(square_size_array));
  // Sort big squares down to small squares:
  square_size_array.sort((a, b) => b - a);
  // Make tiles to match the sizes
  let tile_array = Array.from({ length: square_size_array.length }, () => []);
  for (let i = 0; i < tile_array.length; i++) {
    if (i % 2 == 0) {
      make_tiles(
        tile_array[i],
        square_size_array[i],
        background_color,
        foreground_color,
        square_size_array[i],
      );
    } else {
      make_tiles(
        tile_array[i],
        square_size_array[i],
        foreground_color,
        background_color,
      );
    }
  }
  // Need to draw largest tiles first, then the smaller tiles
  tile_map.sort((a, b) => b.len - a.len);
  tile_map.forEach((tile) => {
    //console.log(`Position: ${tile.pos}, Length: ${tile.len}`);
    push();
    imageMode(CENTER);
    let image_scaling = 2.0;
    image(
      tile_array[square_size_array.indexOf(tile.len)][floor(random(0, 15))],
      tile.pos.x + tile.len / 2,
      tile.pos.y + tile.len / 2,
      tile.len * image_scaling,
      tile.len * image_scaling,
    );
    pop();
  });

  pop();
}

function make_tiles(
  tile_array,
  tile_width_height,
  background_color,
  foreground_color,
) {
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
}

function square_divide(levels, position, square_length) {
  let ul = p5.Vector.add(position, createVector(0, 0));
  let ur = p5.Vector.add(position, createVector(square_length / 2, 0));
  let ll = p5.Vector.add(position, createVector(0, square_length / 2));
  let lr = p5.Vector.add(
    position,
    createVector(square_length / 2, square_length / 2),
  );
  if (levels == 1) {
    tile_map.push({ pos: ul, len: square_length / 2 });
    tile_map.push({ pos: ur, len: square_length / 2 });
    tile_map.push({ pos: ll, len: square_length / 2 });
    tile_map.push({ pos: lr, len: square_length / 2 });
    return;
  } else {
    if (levels == START_LEVEL) {
      rect(ul.x, ul.y, square_length / 2, square_length / 2);
      square_divide(levels - 1, ul, square_length / 2);
      rect(ur.x, ur.y, square_length / 2, square_length / 2);
      square_divide(levels - 1, ur, square_length / 2);
      rect(ll.x, ll.y, square_length / 2, square_length / 2);
      square_divide(levels - 1, ll, square_length / 2);
      rect(lr.x, lr.y, square_length / 2, square_length / 2);
      square_divide(levels - 1, lr, square_length / 2);
    } else {
      if (PROBABILITY > random()) {
        rect(ul.x, ul.y, square_length / 2, square_length / 2);
        square_divide(levels - 1, ul, square_length / 2);
      } else {
        tile_map.push({ pos: ul, len: square_length / 2 });
      }
      if (PROBABILITY > random()) {
        rect(ur.x, ur.y, square_length / 2, square_length / 2);
        square_divide(levels - 1, ur, square_length / 2);
      } else {
        tile_map.push({ pos: ur, len: square_length / 2 });
      }
      if (PROBABILITY > random()) {
        rect(ll.x, ll.y, square_length / 2, square_length / 2);
        square_divide(levels - 1, ll, square_length / 2);
      } else {
        tile_map.push({ pos: ll, len: square_length / 2 });
      }
      if (PROBABILITY > random()) {
        rect(lr.x, lr.y, square_length / 2, square_length / 2);
        square_divide(levels - 1, lr, square_length / 2);
      } else {
        tile_map.push({ pos: lr, len: square_length / 2 });
      }
    }
  }
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
