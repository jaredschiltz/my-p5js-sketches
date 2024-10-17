let frameArray = new Array(12)
let frameCounter = 0
let forwardDirection = true

function preload() {
  for (let i = 0; i < 12; i++) {
    frameArray[i] = loadImage('horse' + str(i + 1) + '.jpg')
  }
}
function setup() {
  createCanvas(455, 455);
  frameRate(12)
}

function draw() {
  background(220);
  image(frameArray[frameCounter], 0, 0)
  
  if (forwardDirection) {
      frameCounter++
      if (frameCounter == 12) {
      frameCounter = 0
        }
  }
  else {
          frameCounter--
      if (frameCounter == -1) {
      frameCounter = 11
      }
  }
  


}

function mousePressed() {
  forwardDirection = !forwardDirection
}