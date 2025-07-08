const WIDTH_HEIGHT = 800;
let lines = [];

function preload() {
  lines = loadStrings("randomart_smile.txt");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  textFont("monospace");
  textSize(16);
  noLoop();
}

function draw() {
  background(0);
  scale(2);
  translate(54, 65);

  fill(0, 255, 0);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], 10, 30 + i * 20);
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
