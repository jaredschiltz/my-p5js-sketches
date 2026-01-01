/*
Genuary 2026 - January 26th: Recursive Grids. Split the canvas into a 
grid of some kind and recurse on each cell again and again.
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  foreground_color = color("#000000");
  background_color = color("#ffffff");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;

  noLoop();
}

function draw() {
  background(background_color);
  noStroke();

  // Draw recursive boxes
  let levels = 7;

  // Draw Border
  /*
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);
  */
  draw_recurse(levels, {
    x: start_pos,
    y: start_pos,
    w: border_size,
    h: border_size,
  });
  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.26", start_pos, WIDTH_HEIGHT - 15);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function draw_recurse(levels, rect_ob) {
  if (levels == 0) {
    return;
  } else {
    noFill();
    stroke("#000000");
    rect(rect_ob.x, rect_ob.y, rect_ob.w, rect_ob.h);
    fill("#000000");
    rect(rect_ob.x, rect_ob.y, rect_ob.w / 2, rect_ob.h / 2);
    draw_recurse(levels - 1, {
      x: rect_ob.x,
      y: rect_ob.y,
      w: rect_ob.w / 2,
      h: rect_ob.h / 2,
    });
    draw_recurse(levels - 1, {
      x: rect_ob.x + rect_ob.w / 2,
      y: rect_ob.y,
      w: rect_ob.w / 2,
      h: rect_ob.h / 2,
    });
    draw_recurse(levels - 1, {
      x: rect_ob.x,
      y: rect_ob.y + rect_ob.h / 2,
      w: rect_ob.w / 2,
      h: rect_ob.h / 2,
    });
    draw_recurse(levels - 1, {
      x: rect_ob.x + rect_ob.w / 2,
      y: rect_ob.y + rect_ob.h / 2,
      w: rect_ob.w / 2,
      h: rect_ob.h / 2,
    });
  }
}
