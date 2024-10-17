let spacing  
let color1
let color2
    
function setup() {
  createCanvas(400, 400);
  spacing = width / 19
  color1 = color(255,255,0)
  color2 = color(255,0,255)
}

function draw() {
  background(255);
  stroke(255)
  translate(spacing, 0)
  for (let i = 0; i < 17; i++) {
    fill(lerpColor(color1, color2, i / 16))
    rect(0, spacing, spacing, height - 2 * spacing)
    translate(spacing, 0)
  }
}

function mousePressed() {
  color1 = color(random(0, 256), random(0, 256), random(0, 256))
  color2 = color(random(0, 256), random(0, 256), random(0, 256))
}