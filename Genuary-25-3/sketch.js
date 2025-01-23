//Genuary 2025 - January 3rd Prompt: Exactly 42 lines of code
color_palette = ["#f5542e", "#f2c327", "#008b6e", "#00aede", "#0067ad"];
let my_font, img;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  img = loadImage("forty-two.png");
}
function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  background(0);
  img.loadPixels();
  let pixel_array = [];
  for (let pixel = 0; pixel < 5000; pixel++) {
    let random_x = floor(random(30, 30 + 720));
    let random_y = floor(random(30, 30 + 720));
    let pixel_color = img.get(random_x, random_y);
    if (pixel_color[0] < 255) {
      pixel_array.push({ x: random_x, y: random_y });
    }
  }
  noStroke();
  for (pixel of pixel_array) {
    fill(color(color_palette[floor(random(color_palette.length))]));
    circle(pixel.x, pixel.y, random(1, 20));
  }
  // Draw Text
  noStroke();
  fill(color_palette[4]);
  textSize(12);
  textFont(my_font);
  text(">> 25.3", 30, 780);
}
function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
