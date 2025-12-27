//Genuary 2025 - January 3rd Prompt: Exactly 42 lines of code
color_palette = ["#ffffff", "#ff009a", "#009aff"];
let my_font, img;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  img = loadImage("genuary.png");
}
function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  background(0);
  img.loadPixels();
  let pixel_array = [];
  for (let pixel = 0; pixel < 20000; pixel++) {
    let random_x = floor(random(30, 30 + 720));
    let random_y = floor(random(30, 30 + 720));
    let pixel_color = img.get(random_x, random_y);
    if (pixel_color[0] < 128) {
      pixel_array.push({ x: random_x, y: random_y });
    }
  }
  noStroke();
  for (pixel of pixel_array) {
    fill(color(color_palette[floor(random(color_palette.length))]));
    let random_side_length = random(1, 5);
    push();
    translate(pixel.x, pixel.y);
    rotate(random(-PI, PI));
    triangle(
      -random_side_length,
      random_side_length,
      random_side_length,
      random_side_length,
      0,
      -random_side_length
    );
    pop();
    //circle(pixel.x, pixel.y, random(1, 20));
  }
  // Draw Text
  noStroke();
  fill(color_palette[1]);
  textSize(12);
  textFont(my_font);
  text(">> 26.5", 30, 780);
}
function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
