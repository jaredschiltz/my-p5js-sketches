function setup() {
  createCanvas(300, 300);
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  background(255);
  strokeWeight(5)
  translate(width / 2, height / 2);
  for (let r = 0; r < 720; r++) {
    for (let i = 0; i < 100; i++) {
      stroke(r/2, i, 100);
      point(i, 0);
    }
    rotate(0.5 * PI/180)
  }
}
