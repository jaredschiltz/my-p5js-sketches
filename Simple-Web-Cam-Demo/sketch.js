var video;
var button;
let canvas;

function setup() {
  canvas = createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  //video.hide();
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function draw() {
  //image(video,0,0);
}

function takesnap()
{
  image(video, 0, 0);
  saveCanvas(canvas, 'jared', 'png');
}