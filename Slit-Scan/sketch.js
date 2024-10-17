let video;
let x = 0;
let snapButton;
let scanButton;

function setup() {
  createCanvas(800, 400);
  background(51);
  pixelDensity(2);
  video = createCapture(VIDEO);
  snapButton = createButton('Save');
  scanButton = createButton('Scan');
  scanButton.mousePressed(scan);
  snapButton.mousePressed(takesnap);
  
  
}

function draw() {
  snapButton.position(0,25);
  scanButton.position(0,0);
  video.loadPixels();
  copy(video, video.width/2, 0, 1, video.height, x, 0, 1, video.height);
  if (x < width)
  {
    x += 1;
  }
}

function scan()
{
  x = 0;
}

function takesnap()
{
  //image(video, 0, 0);
  saveCanvas(canvas, 'jared', 'png');
}