var video;
var button;
let canvas;
let pixelDensityNum;
let WIDTH = 640;
let HEIGHT = 480;
let pixelSize = 16;
let components;

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  video = createCapture(VIDEO);
  video.size(WIDTH, HEIGHT);
  video.hide();
  //button = createButton('snap');
  //button.mousePressed(takesnap);
  pixelDensityNum = 1
  noStroke()
  fill(255,0,0)
}

function draw() {
  image(video,0,0);
  video.loadPixels();
 
  for (let y = 0; y < HEIGHT; y = y + pixelSize)
    {
       for (let x = 0; x < WIDTH; x = x + pixelSize)
         {
            let off = (y * WIDTH + x) * pixelDensityNum * 4;
           fill(  
             video.pixels[off], 
             video.pixels[off + 1],
             video.pixels[off + 2],
             video.pixels[off + 3])
           rect(x, y, pixelSize, pixelSize)
         }
    }
}

function mousePressed()
{
  saveCanvas(canvas, 'jared', 'png');
}


/*
function takesnap()
{
  image(video, 0, 0);
  saveCanvas(canvas, 'jared', 'png');
}
*/