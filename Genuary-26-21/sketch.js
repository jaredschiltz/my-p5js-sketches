/*
Genuary 2026 - January 21st: Bauhaus Poster. Create a posted design inpsired by
the German art school Bauhaus
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;
let pg;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  pg = createGraphics(width, height);
  foreground_color = color("#ffc917");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  let cols_rows = 10;
  let diameter = 30;
  let cell_size = border_size / cols_rows;
  let growth_factor = 6.5;
  pg.background(255, 255, 255, 0);
  pg.noStroke();
  pg.fill(0);
  for (let rows = 0; rows < cols_rows; rows++) {
    for (let cols = 0; cols < cols_rows; cols++) {
      pg.ellipse(
        start_pos + cols * cell_size + cell_size / 2,
        start_pos + rows * cell_size + cell_size / 2,
        diameter + rows * growth_factor,
        diameter + rows * growth_factor
      );
    }
  }
  //noLoop();
}

function draw() {
  background(background_color);

  // Draw Border
  // noFill();
  // stroke(foreground_color);
  // rect(start_pos, start_pos, border_size, border_size);
  image(pg, 0, 0);

  // Orange overlay
  blendMode(SCREEN);
  noStroke();
  fill(255, 140, 0);
  let circle_size_factor = 0.65;
  ellipse(
    mouseX,
    mouseY,
    circle_size_factor * WIDTH_HEIGHT,
    circle_size_factor * WIDTH_HEIGHT
  );

  // Reset blend mode so nothing else breaks
  blendMode(BLEND);
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill("#000000");
  textSize(12);
  textFont(google_font);
  text(">> 26.21", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
