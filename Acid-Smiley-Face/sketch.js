function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  // Draw Circle
  yellowColor = color(243,227,62,255);
  fill(yellowColor);
  strokeWeight(6);
  stroke(0);
  circle(width/2, height/2, width/1.1);
  // Draw Eyes
  fill(0);
  const eyeDistance = 50;
  ellipse(width/2 - eyeDistance, height/3, 20, 60);
  ellipse(width/2 + eyeDistance, height/3, 20, 60);
  // Draw Mouth
  noFill();
  strokeWeight(10);
  const smileXOffset = 120;
  const smileYOffset = 20;
  // Mouth Ends
  arc(width/2 - smileXOffset, height/2 + smileYOffset, 50, 50, TWO_PI*3/4 - 0.5, TWO_PI*3/4 + 0.5)
  arc(width/2 + smileXOffset, height/2 + smileYOffset, 50, 50, TWO_PI*3/4 - 0.5, TWO_PI*3/4 + 0.5)
  // Mouth Arc
  arc(width/2, height/2, 240, 240
      , 0, PI);
}