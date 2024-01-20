const WIDTH_HEIGHT = 800;
function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
}

function draw() {
  background(220);
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    saveGif("output_gif", 10);
  }
}
