/*
Genuary 2025 - January 24th Prompt: Geometric art - pick either a circle, rectangle,
 or a triangle, and use only that geometric shape.
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;

let my_font;
let border_size;

let background_color;
let foreground_color;

function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background_color = color("#e6dbcd");
  foreground_color = color("#000000");

  background(background_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;

  // Draw border
  noFill();
  stroke(foreground_color);
  rect(border_start, border_start, border_size, border_size);

  fill(foreground_color);
  draw_recursive(
    {
      x: border_start,
      y: border_start,
      width: border_size,
      height: border_size,
    },
    9
  );
  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.26",
    (WIDTH_HEIGHT - border_size) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - border_size) / 2 + 25
  );
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function draw_recursive(box, level) {
  if (level == 0) {
    return;
  } else {
    // what to draw
    if (floor(random(2)) == 1) {
      //rect(box.x, box.y, box.width, box.height);
      circle(box.x + box.width / 2, box.y + box.height / 2, box.width / 4);
    }

    level -= 1;
    draw_recursive(
      { x: box.x, y: box.y, width: box.width / 2, height: box.height / 2 },
      level
    );
    draw_recursive(
      {
        x: box.x + box.width / 2,
        y: box.y + box.height / 2,
        width: box.width / 2,
        height: box.height / 2,
      },
      level
    );
    draw_recursive(
      {
        x: box.x + box.width / 2,
        y: box.y,
        width: box.width / 2,
        height: box.height / 2,
      },
      level
    );
    draw_recursive(
      {
        x: box.x,
        y: box.y + box.width / 2,
        width: box.width / 2,
        height: box.height / 2,
      },
      level
    );
  }
}
