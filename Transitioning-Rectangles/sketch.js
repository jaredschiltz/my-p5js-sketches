let spacing
function setup() {
  createCanvas(400, 400);
  spacing = width / 16
}

function draw() {
    background(255);
  fill(200)
  stroke(0)
  translate(spacing,0)
  for(let i = 0; i < 14; i++) {
    fill(i * 255/14)
    rect(0,height-spacing,spacing,-spacing - i * spacing)
    translate(spacing,0)
  }

}