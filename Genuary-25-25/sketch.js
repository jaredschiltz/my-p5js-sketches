/*
Genuary 2025 - January 25th Prompt: One line that may or may not intersect itself
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
const NUM_CELLS = 30;
let my_font;
let border_size;

let background_color;
let foreground_color;

const order = 5;
let N;
let total;

let path = [];

let counter = 0;

function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
}

function draw() {
  background_color = color("#000000");
  foreground_color = color("#ffffff");

  background(background_color);

  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;

  // Draw Hilbert curve
  N = int(pow(2, order));
  total = N * N;
  let len = border_size / N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
  push();
  translate(border_start, border_start);
  strokeWeight(10);
  noFill();
  stroke(foreground_color);
  //beginShape();
  let color_palette = ["#f5542e", "#f2c327", "#008b6e", "#00aede", "#0067ad"];
  for (let i = 1; i < counter - 50; i++) {
    try {
      stroke(color(color_palette[floor(random(color_palette.length))]));
      line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
    } catch (error) {}
  }
  //endShape();

  counter += 100;
  if (counter >= path.length + 100) {
    counter = 0;
    noLoop();
  }
  pop();

  // Draw border
  // noFill();
  // stroke(foreground_color);
  // rect(border_start, border_start, border_size, border_size);

  // Draw border
  noStroke();
  // Draw Text
  noStroke();
  fill(foreground_color);
  fill(color_palette[4]);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.25",
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

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0),
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}
