const WIDTH_HEIGHT = 800;
let ugly_mf;

function preload() {
  ugly_mf = loadImage("ugly.png");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  imageMode(CENTER);
}

function draw() {
  background(0);
  translate(WIDTH_HEIGHT / 2, WIDTH_HEIGHT / 2);
  rotate((sin(frameCount * 0.03) * PI) / 2 + PI / 2);
  image(ugly_mf, 0, 0);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
