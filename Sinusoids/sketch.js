let amplitude = 40
let frequency_start = 10
let frequency_end =  5
let repetitions = 100
let line_offset = 5
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2)
   noLoop();
}

function draw() {
  background(255)
  smooth()
  stroke(0)
  strokeCap(ROUND)
  strokeJoin(ROUND)
  strokeWeight(2)
  translate(0, amplitude + 30)
  for (j = 0; j < repetitions; j++){
    for(i = 0; i < width; i=i+1) {
      line(i, amplitude*sin(TWO_PI*map(i,0,width,frequency_start,frequency_end)*i/(width)), i+1,amplitude*sin(TWO_PI*map(i+1,0,width,frequency_start,frequency_end)*(i + 1)/(width)))
    }
    translate(0, line_offset)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
