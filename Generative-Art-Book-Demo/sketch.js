let rotateX = 0.01

function setup() {
  createCanvas(800, 800);
  background(15)
  stroke(0, 50)
  fill(255,0,120,130)
  xstart = random(10)
  ynoise = random(10)
  translate(width/2, height/2, 0)
  for (y = -(height/8); y <= (height/8); y += 3)
    {
      ynoise += 0.03
      xnoise = xstart
      for (x = -(width/8); x <= (width/8); x +=3)
        {
          xnoise += 0.03
          drawPoint(x, y, noise(xnoise, ynoise))
        }
    }
}

function draw() {
  
}

function drawPoint(x, y, noiseFactor)
{
  push()
  translate(x * noiseFactor * 3, y * noiseFactor * 3, -y)
  edgeSize = noiseFactor * 26
  ellipse(0, 0, edgeSize, edgeSize)
  pop()
}