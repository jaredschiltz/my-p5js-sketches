const WIDTH_HEIGHT = 800;
const BG_COLOR = "#E9E5C2";
const COLOR1 = "#F0CA39";
const COLOR2 = "#9EC7A9";
const COLOR3 = "#CF4A4B";

let texture_image;

function preload() {
  texture_image = loadImage("grunge-texture.png");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background(BG_COLOR);
  image(texture_image, 0, 0, WIDTH_HEIGHT, WIDTH_HEIGHT);
  push();
  translate(23, 60);
  scale(2.7);
  strokeWeight(1);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  fill(COLOR3);
  beginShape();
  vertex(55.0625, 182.4375);
  vertex(80.6875, 182.5625);
  vertex(151.21875, 59.84375);
  vertex(252.21615, 228.15076);
  vertex(264.76729, 205.25818);
  vertex(151.5625, 13.25);
  vertex(55.0625, 182.4375);
  endShape();

  fill(COLOR2);
  beginShape();
  vertex(15.625, 206.0625);
  vertex(27.5, 228.4375);
  vertex(252.30454, 228.28334);
  vertex(151.23246, 59.859344);
  vertex(138.54873, 81.934334);
  vertex(211.73429, 205.92661);
  vertex(15.625, 206.0625);
  endShape();
  fill(COLOR1);
  beginShape();
  vertex(124.05609, 12.990601);
  vertex(15.638759, 206.0253);
  vertex(211.76418, 205.96833);
  vertex(197.88064, 182.51185);
  vertex(54.948939, 182.532);
  vertex(151.67357, 13.253813);
  vertex(124.05609, 12.990601);
  endShape();
  pop();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
