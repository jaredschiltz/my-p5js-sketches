let headsOrTails = 'H'
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
   fill(100)
  circle(width/2 + width/128,height/2,width/2)
  fill(170)
  noStroke()
  circle(width/2,height/2,width/2)
  fill(224)
  textSize(width/3)
  text(headsOrTails, width/2 - width/10,height/2 + height/8)
 

  
}

function mousePressed() {
  if (random() >= 0.5) { // Heads
    headsOrTails = 'H'
  }
  else { // Tails
    headsOrTails = 'T'
  }
}