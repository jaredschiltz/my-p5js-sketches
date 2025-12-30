/* Genuary 2025 - January 13th Prompt: 
Self portrait. For example, get started with a very basic 
human face, a few circles or oval shapes. How far can you 
improve this by adding features that actually look like you. 
Try adding eyes, eyelashes, hair, and make a few parameters 
or colors variable. Even though you are aiming for a self 
portrait, it might be fun to render some random variations as well.
*/

//color_palette = ["#ffffff", "#ff009a", "#009aff"];
let my_font, img;
function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  img = loadImage("jared.png");
}
function setup() {
  createCanvas(800, 800);
  noLoop();
}
function draw() {
  background("#ffffff");
  img.loadPixels();
  let pixel_array = [];
  for (let pixel = 0; pixel < 100000; pixel++) {
    let random_x = floor(random(30, 30 + 720));
    let random_y = floor(random(30, 30 + 720));
    let pixel_color = img.get(random_x, random_y);
    noStroke();
    fill(pixel_color);
    let random_side_length = random(1, 8);
    push();
    translate(random_x, random_y);
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
  }
  // Draw Text
  noStroke();
  fill("#000000");
  textSize(12);
  textFont(my_font);
  text(">> 26.13", 30, 780);
}
function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
