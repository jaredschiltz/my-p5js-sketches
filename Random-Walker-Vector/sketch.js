let numWalker = 1000;
let walkerArray = [];

function setup() {
  createCanvas(400, 400);
  for(let x = 0; x < numWalker; x++)
  {
    walkerArray.push(new Walker(random(0,width),random(0,height),color(random(0,255),random(0,255),random(0,255))));
  }
  background(0);
}

function draw() {
  for(let x = 0; x < numWalker; x++)
  {
  walkerArray[x].update();
  walkerArray[x].show();
  }
}