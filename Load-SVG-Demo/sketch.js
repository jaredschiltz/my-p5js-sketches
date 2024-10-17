var mySvg; 
function preload(){
	mySvg = loadImage("blocks.svg");

}

function setup() {
  createCanvas(mySvg.width, mySvg.height); // Create SVG Canvas
    print("aspect_ratio:" + mySvg.width/mySvg.height)
  noLoop()
}

function draw() {
  background(255)
  image(mySvg, 0,0)
}