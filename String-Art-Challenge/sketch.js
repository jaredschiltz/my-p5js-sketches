let spacing
function setup() {
  createCanvas(400, 400);
  spacing = height / 9
}

function draw() {
  background(220);
  strokeWeight(3)
  for (let i = 0; i < 8; i++) {
     line(spacing, (i + 1) * spacing, (i + 1) * spacing, height - spacing)
  }
}