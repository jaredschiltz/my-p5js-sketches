let sphere_texture;
let space_texture;
let number_spheres = 32;
let frame_mult = 0.05
function preload() {
  sphere_texture = loadImage("texture.jpg");
  space_texture = loadImage("space.jpeg");
}
function setup() {
  createCanvas(1080 / 2, 1350 / 2, WEBGL); // 4:5 aspect ratio
  frameRate(20)
}

function draw() {
  noStroke();
  background(0);
  translate(0,0,-50)
  rotateZ(PI / 4);
  texture(sphere_texture);
  push();
  rotateY(frameCount * frame_mult);
  sphere(50);
  pop();
  push();
  rotateY(frameCount * frame_mult);
  for (let i = 0; i < number_spheres; i++) {
    rotateY((float(i) / float(number_spheres)) * TWO_PI);
    push();
    translate(300, 20 * sin(i + frameCount * 0.1), 0);
    rotateY(frameCount * frame_mult)
    sphere(10);
    pop();
  }
  pop();
  let factor = 4
  textureWrap(REPEAT, REPEAT);
  texture(space_texture);
  let depth = -2500
  push();
  translate(0, 0, depth);
  plane(width * factor, height * factor);
  pop();
  push();
  translate(factor * width, 0, depth);
  plane(width * factor, height * factor);
  pop();
  push();
  translate(-factor * width, 0, depth);
  plane(width * factor, height * factor);
  pop();
    push();
  translate(0,-factor * height, depth);
  plane(width * factor, height * factor);
  pop();
      push();
  translate(0,factor * height, depth);
  plane(width * factor, height * factor);
  pop();
}
// you can put it in the mousePressed function,
// or keyPressed for example
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('mySketch', 10);
  }
}
