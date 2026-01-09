/*
Genuary 2026 - January 15th: Create an invisible object where only the 
shadows can be seen.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let font;
let pg;
let background_color;
let foreground_color;

function preload() {
  font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  pg = createGraphics(width, height);
  foreground_color = color("#ffc917");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  pg.textFont(font);
  pg.textAlign(CENTER, CENTER);

  //noLoop();
}

function draw() {
  background(background_color);
  background(245);

  // Clear shadow buffer
  pg.clear();

  // Fake light direction
  let dx = map(sin(frameCount * 0.01), -1, 1, -20, 20);
  let dy = 20;

  // Draw shadow text ONLY
  pg.push();
  pg.translate(width / 2 + dx - 20, height / 2 + dy - 20);
  pg.shearX(map(sin(frameCount * 0.05), -1, 1, -1.0, 1.0));
  pg.shearY(map(sin(frameCount * 0.05), -1, 1, -1.0, 1.0));
  pg.fill(0, 0, 0);
  pg.noStroke();
  pg.textSize(25);
  pg.text("GENUARY", 0, 0);
  pg.pop();

  // Slight blur for softness
  drawingContext.filter = "blur(2px)";
  image(pg, 0, 0);
  drawingContext.filter = "none";
  // Draw Border
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
  fill("#000000");
  textSize(12);
  textFont(font);
  text(">> 26.15", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    //saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 5);
  }
}
