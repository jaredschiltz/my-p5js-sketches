/*
Genuary 2025 - January 28th Prompt: Infinite Scroll
*/

const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let background_image;
let star_image_array = new Array(4);
let rainbow_trail_image_array = new Array(8);
let rainbow_trail1;
let rainbow_trail2;
let unicorn_image;
let unicorn;
let my_font;
const NUM_STARS = 30;
star_array = new Array(NUM_STARS);
let star;
let y_pos_counter = 0;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  background_image = loadImage("background.png");
  for (let i = 0; i < star_image_array.length; i++) {
    star_image_array[i] = loadImage(`star${i + 1}.png`);
  }
  for (let i = 0; i < rainbow_trail_image_array.length; i++) {
    rainbow_trail_image_array[i] = loadImage(`rainbow_animation${i + 1}.png`);
  }
  unicorn_image = loadImage("unicorn.png");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  for (let i = 0; i < star_array.length; i++) {
    star_array[i] = new Star(
      createVector(floor(random(2 * WIDTH_HEIGHT)), floor(random(WIDTH_HEIGHT)))
    );
  }
  rainbow_trail1 = new Rainbow_Trail(createVector(-199, 0));
  rainbow_trail2 = new Rainbow_Trail(createVector(0, 0));
  unicorn = new Unicorn(createVector(0, 0));
}

function draw() {
  //background(255);
  if (y_pos_counter > WIDTH_HEIGHT * 2) {
    y_pos_counter = 0;
  } else {
    y_pos_counter += 1;
  }
  image(background_image, 0, 0, WIDTH_HEIGHT, WIDTH_HEIGHT);
  border_size = parseInt(WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE);
  let border_start = parseInt(WIDTH_HEIGHT - border_size) / 2.0;
  for (let i = 0; i < star_array.length; i++) {
    star_array[i].show();
  }
  // update y positions
  push();
  translate(0, 40);
  translate(0, 200 * sin(map(y_pos_counter, 0, 1600, 0, TWO_PI) * 15));
  rainbow_trail1.show();
  rainbow_trail2.show();
  unicorn.show();
  pop();

  // Draw Text
  noStroke();
  fill(255);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.28",
    (WIDTH_HEIGHT - border_size) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - border_size) / 2 + 25
  );
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}

class Star {
  constructor(pos) {
    this.pos = pos;
    this.phase = floor(random(4));
    this.speed = 1;
    this.counter = 0;
  }

  show() {
    push();
    translate(-380, -400);
    translate(this.pos.x, this.pos.y);
    if (this.counter == this.speed) {
      image(star_image_array[this.phase], 0, 0, WIDTH_HEIGHT, WIDTH_HEIGHT);
      if (this.phase == 3) {
        this.phase = 0;
      } else {
        this.phase++;
      }
      this.counter = 0;
    } else {
      this.counter++;
    }
    pop();

    // update star position
    if (this.pos.x < -10) {
      this.pos.x = WIDTH_HEIGHT * 2;
    } else {
      this.pos.x -= 10;
    }
  }
}

class Rainbow_Trail {
  constructor(pos) {
    this.pos = pos;
    this.phase = 0;
    this.speed = 0;
    this.counter = 0;
  }

  show() {
    push();

    translate(this.pos.x, this.pos.y);
    if (this.counter == this.speed) {
      image(
        rainbow_trail_image_array[this.phase],
        0,
        0,
        WIDTH_HEIGHT,
        WIDTH_HEIGHT
      );
      if (this.phase == 7) {
        this.phase = 0;
      } else {
        this.phase++;
      }
      this.counter = 0;
    } else {
      this.counter++;
    }
    pop();
  }
}

class Unicorn {
  constructor(pos) {
    this.pos = pos;
  }

  show() {
    push();
    // Make adjustment
    translate(32, -90);
    translate(this.pos.x, this.pos.y);
    image(unicorn_image, 0, 0, WIDTH_HEIGHT, WIDTH_HEIGHT);
    pop();
  }
}
