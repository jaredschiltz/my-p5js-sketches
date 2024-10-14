let background_image;
let background_image_width;
let background_image_height;
let cyan_light;
let purple_light;
let violet_light;
let light_one;
let light_two;

let xoff = 263;
let yoff = -15;

let c;

function preload() {
  background_image = loadImage("light_background.png");
  cyan_light = loadImage("cyan.png");
  purple_light = loadImage("purple.png");
  violet_light = loadImage("violet.png");
}

function setup() {
  c = createCanvas(901, 505);
  background_image_width = background_image.width;
  background_image_height = background_image.height;
  light_one = new Array(3);
  light_two = new Array(3);
  light_one[0] = createVector(219, 176);
  light_one[1] = createVector(218, 238);
  light_one[2] = createVector(219, 298);
  light_two[0] = createVector(light_one[0].x + xoff, light_one[0].y + yoff);
  light_two[1] = createVector(light_one[1].x + xoff, light_one[1].y + yoff);
  light_two[2] = createVector(light_one[2].x + xoff, light_one[2].y + yoff);

  noLoop();
}

function draw() {
  background(0);
  image(background_image, 0, 0);
  //image(purple_light, light_one[0].x, light_one[0].y);
  // image(cyan_light, light_one[1].x, light_one[1].y);
  image(violet_light, light_one[2].x, light_one[2].y);

  //image(purple_light, light_two[0].x, light_two[0].y);
  //image(cyan_light, light_two[1].x, light_two[1].y);
  image(violet_light, light_two[2].x, light_two[2].y);
  //saveCanvas(c, "frame0003", "png");
}
