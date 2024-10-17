let video;
let x = 0
let Image
let reverseImage

function setup() {

  createCanvas(640, 480)
  video = createCapture(VIDEO);
  video.hide()
  colorMode(HSB, 100)
}

function draw() {
  //push()
  //translate(theWidth/2, theHeight / 2)
  //image(video, 0, 0, video.width, video.height)
 // pop()
  background(220)
  Image = video.get()
  reverseImage = Image
  image(Image,0,0)
  tint(100, 80, 50)
  
  //blend(reverseImage,100,0,640,480,0,0,640,480, SCREEN)

  push()
  translate(640, 0)
  scale(-1, 1)
  blend(0,0,640,480,0,0,640,480, SCREEN)
  pop()

  
  
}
