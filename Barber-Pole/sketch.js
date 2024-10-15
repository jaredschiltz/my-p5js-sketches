let img;
let spin = 0.06

function preload() {
  img = loadImage('barber.jpg')
}
function setup() {
  createCanvas(400, 400,WEBGL);
}

function draw() {
  background(0);
  texture(img)
  push()
  rotateY(frameCount * spin);
  cylinder(65,400,24,24)
  pop()
  push()
  translate(-130,0,0)
  rotateY(frameCount * spin)
  cylinder(65,400,24,24)
  pop()
    push()
  translate(130,0,0)
  rotateY(frameCount * spin)
  cylinder(65,400,24,24)
  pop()
}