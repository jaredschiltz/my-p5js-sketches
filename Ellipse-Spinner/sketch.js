function setup() {
  createCanvas(405, 720);
  smooth();

}

function draw() {
  background(0);
  colorMode(HSB)
  translate(width / 2, height / 2);
  rotate(frameCount/20)
  for (let i = 0; i < 360; i += 1) {
    push();
    rotate(radians(i));
    translate(0, 140);
    rotate(radians(i * 3));
    scale(
      map(sin(radians(i * 6)), -1, 1, sin(0.5*frameCount/20), 1),
      map(sin(radians(i * 3)), -1, 1, sin(0.5*frameCount/70), 1)
    );
    drawEllipse();
    pop();
  }
}

function drawEllipse() {
  noFill();
  strokeWeight(0.5)
  stroke(map(sin(frameCount/50),-1,1,0,360),100,100,0.5)
  ellipse(0, 0, 120, 80);
}
