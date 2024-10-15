let r = 255;
let g = 0;
let b = 0;
let a = 255;
let pixelSize = 1
function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(0);
  noStroke();
  let lightPosX = 0.5;
  let lightPosY = 0.5;

  // -- create the light
  pointLight(200, 200, 200, lightPosX, lightPosY, 350);
  specularMaterial(20);
  shininess(220);
  rotateX(frameCount * 0.05);
  rotateY(frameCount * 0.05);
  torus(width /4, width / 8);

}

// you can put it in the mousePressed function,
// or keyPressed for example
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('Donut', 10);
  }
}