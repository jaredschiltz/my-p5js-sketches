function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 1)
}

function draw() {
  background(255);
  let hue1 = map(mouseY, 0, height, 0, 360)
  fill(hue1,100,100)
  noStroke()
  rect(0,0,width/2,height)
  fill((hue1 + 180) % 360,100,100)
  rect(width/2,0,width/2,height)
}