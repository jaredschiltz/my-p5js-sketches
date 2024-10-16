let imageArray = [];
let numJellyBeans = 5000;

function preload() {
  imageArray.push(loadImage("2253.png"));
  imageArray.push(loadImage("839.png"));
  imageArray.push(loadImage("861.png"));
  imageArray.push(loadImage("862.png"));
  imageArray.push(loadImage("866.png"));
  imageArray.push(loadImage("867.png"));
  imageArray.push(loadImage("872.png"));
  imageArray.push(loadImage("874.png"));
  imageArray.push(loadImage("875.png"));
  imageArray.push(loadImage("876.png"));
  imageArray.push(loadImage("878.png"));
  imageArray.push(loadImage("883.png"));
  imageArray.push(loadImage("886.png"));
  imageArray.push(loadImage("889.png"));
  imageArray.push(loadImage("891.png"));
  imageArray.push(loadImage("893.png"));
  imageArray.push(loadImage("894.png"));
  imageArray.push(loadImage("895.png"));
  imageArray.push(loadImage("897.png"));
  imageArray.push(loadImage("900.png"));
  imageArray.push(loadImage("902.png"));
  imageArray.push(loadImage("903.png"));
  imageArray.push(loadImage("904.png"));
  imageArray.push(loadImage("906.png"));
  imageArray.push(loadImage("908.png"));
  imageArray.push(loadImage("909.png"));
  imageArray.push(loadImage("910.png"));
  imageArray.push(loadImage("914.png"));
  imageArray.push(loadImage("915.png"));
  imageArray.push(loadImage("917.png"));
  imageArray.push(loadImage("918.png"));
  imageArray.push(loadImage("919.png"));
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  angleMode(DEGREES);
  resizeImages(75, 50);
  noLoop();
}

function draw() {
  background(255);
  for (let i = 0; i < numJellyBeans; i++) {
    push();
    translate(random(0,width), random(0,height));
    rotate(random(0, 360));
    image(imageArray[Math.floor(Math.random() * imageArray.length)], 0, 0);
    pop();
  }
}

function resizeImages(x, y) {
  for (let i = 0; i < imageArray.length; i++) {
    imageArray[i].resize(x, y);
  }
}
