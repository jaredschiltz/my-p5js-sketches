function setup() {
  createCanvas(400, 400);
}

function draw() {
  // Background
  strokeCap(SQUARE)
  fill('#cbcab6')
  noStroke()
  rect(0,0,width, 170)
  fill('#d7d1b9')
  rect(0,170,width, height)
  fill('#e2d8bc')
  rect(0,300,width, height)
  // Thick Dark Grey Stripes
  fill('#9f9e8c')
  beginShape()
  vertex(200,0)
  vertex(320,height)
  vertex(350,height)
  vertex(215,0)
  endShape(CLOSE)
  beginShape()
  vertex(60,0)
  vertex(-30,275)
  vertex(0,275)
  vertex(75,0)
  endShape(CLOSE)
  beginShape()
  vertex(350,0)
  vertex(width,60)
  vertex(width+20,60)
  vertex(370,0)
  endShape(CLOSE)
  // Dark Grey Lines
  stroke('#9b9a88')
  strokeWeight(2)
  line(0,250,width,250)
  line(0,190,width,190)
  line(250,0,250,190)
  line(90,0,90,190)
  noFill()
  bezier(0,50,200,60,width,50,width,50)
  // Orange Line
  stroke('#e16d33')
  strokeWeight(4)
  line(0,20,130,25)
  // Yellow Ellipse
  noStroke()
  fill('#f9b934')
  ellipse(200,150,275,110)
  noFill()
  // Black Lines
  stroke(0)
  line(175,0,220,213)
  line(330,height + 10,width,380)
  strokeWeight(8)
  line(0,235,width,227)
  line(370,140,width,139)
  // Blue Curve
  stroke('#486577')
  bezier(-30,160,120,height + 50,width,height,width + 40,height)
  
  
  
  
  
}