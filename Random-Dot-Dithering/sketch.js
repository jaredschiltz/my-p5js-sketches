const SIZE = 400;
const numberOfIterations = 50000;
let img;

function preload() {
  //img = loadImage("https://picsum.photos/" + str(SIZE));
  img = loadImage("allison.jpeg")
}
function setup() {
  createCanvas(SIZE, SIZE);
  noLoop();
}

function draw() {
  background(255)
  //image(img, 0, 0);
  noStroke()
  fill(0)
  for (let i = 0; i < numberOfIterations; i++) {
    let x = floor(random(SIZE));
    let y = floor(random(SIZE));
    let c = brightness(img.get(x, y));
    let r = round(random(255))
    if (c < 38) {
      circle(x,y,2)
    }
  }
}
