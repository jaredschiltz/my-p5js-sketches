const WIDTH_HEIGHT = 764;
let img;
let glitch;

function preload() {
  //img = loadImage("venus-de-milo.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  glitch = new Glitch();
  glitch.loadQuality(0.1);
  glitch.loadImage("venus-de-milo.jpg"); // load image by path
  frameRate(10);
}

function draw() {
  //background(0, 244, 0);
  glitch.resetBytes();

  glitch.randomBytes(random(0, 5)); // add one random byte for movement
  //glitch.replaceBytes(100, 200); // swap all decimal byte 100 for 104
  glitch.pixelate(random(0, 1));

  glitch.buildImage();
  //image(glitch.image, width / 2, height / 2);
  image(glitch.image, 0, 0);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    //saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
    //glitch.saveSafe("venus_glitch", "jpg");
  }
}
