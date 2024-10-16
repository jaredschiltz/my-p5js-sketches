let img;
let img_height;
let img_width;
let position_vector;
let direction_vector;
let text_speed = 10;
let color_array;
let random_color;

function preload() {
  img = loadImage("vhs.png");
}

function setup() {
  createCanvas(960, 540);
  img_height = floor(img.height * 0.125);
  img_width = floor(img.width * 0.125);
  position_vector = createVector(width / 2, height / 2);
  direction_vector = p5.Vector.random2D();
  color_array = new Array(5);
  color_array[0] = { r: 18, g: 109, b: 173 };
  color_array[1] = { r: 155, g: 158, b: 44 };
  color_array[2] = { r: 221, g: 181, b: 51 };
  color_array[3] = { r: 229, g: 106, b: 39 };
  color_array[4] = { r: 203, g: 28, b: 85 };
  random_color = get_random_color( { r: 18, g: 109, b: 173 });

  pixelDensity(2);
}

function draw() {
  background(0);
  tint(random_color.r, random_color.g, random_color.b);
  image(img, position_vector.x, position_vector.y, img_width, img_height);
  position_vector.x += direction_vector.x * text_speed;
  position_vector.y += direction_vector.y * text_speed;
  if (position_vector.x <= 0) {
    position_vector.x = 0;
    direction_vector.x *= -1;
    random_color = get_random_color(random_color);
  }
  if (position_vector.x >= width - img_width) {
    position_vector.x = width - img_width;
    direction_vector.x *= -1;
    random_color = get_random_color(random_color);
  }
  if (position_vector.y <= 0) {
    position_vector.y = 0;
    direction_vector.y *= -1;
    random_color = get_random_color(random_color);
  }
  if (position_vector.y >= height - img_height) {
    position_vector.y = height - img_height;
    direction_vector.y *= -1;
    random_color = get_random_color(random_color);
  }
}

function get_random_color(current_color) {
  next_color = color_array[floor(random() * color_array.length)];
  while (
    (
      current_color.r == next_color.r &&
      current_color.g == next_color.g &&
      current_color.b == next_color.b
    )
  ) {
    next_color = color_array[floor(random() * color_array.length)];
  }
  return next_color;
}
