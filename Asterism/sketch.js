let NUM_VERY_TINY_STARS = 1000
let VERY_TINY_STAR_RADIUS = 1.25
let NUM_TINY_STARS = 25
let TINY_STAR_RADIUS = 3
function setup() {
  createCanvas(600, 600);
  noLoop()
}

function draw() {
  background(0);
  noStroke()
  fill(255)
  for (let i = 0; i < NUM_VERY_TINY_STARS; i++) {
    fill(random(0,255))
    circle(random(0,width), random(0,height), VERY_TINY_STAR_RADIUS )
  }
    for (let i = 0; i < NUM_TINY_STARS; i++) {
    fill(random(0,255))
    circle(random(0,width), random(0,height), TINY_STAR_RADIUS )
  }
  filter(BLUR,2)
}