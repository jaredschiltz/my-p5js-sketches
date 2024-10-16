let color_array
function setup() {
  createCanvas(1080/2, 1350/2); // 4:5 aspect ratio
    frameRate(10)
  color_array = new Array(7)
  color_array[0] = color(255,0,0); // Red
  color_array[1] = color(255,127,0); // Orange
  color_array[2] = color(255,255,0); // Yellow
  color_array[3] = color(0,255,0); // Green
  color_array[4] = color(0,0,255); // Blue
  color_array[5] = color(75,0,130); // Indigo
  color_array[6] = color(148,0,211); // Violet
}

function draw() {
    background(0);

  translate(width/2, height/2)
  rotate(frameCount/10)
  noFill(0)
  strokeWeight(3)
 
  let r = 30
  let r_increment = 31
  for(let c = 0; c < 7; c++){
  stroke(color_array[6 - c])
  beginShape()
  for(let i = 0; i < TWO_PI * 3/4; i += 0.01){
    vertex(r * sin(i),r * cos(i))
  }
  for(let i = TWO_PI * 3/4; i < TWO_PI; i += 0.01) {
    vertex((r + pulse_wave(r*0.1,map(i,TWO_PI * 3/4, TWO_PI,-3,3)) ) * sin(i),(r + pulse_wave(r*0.1,map(i,TWO_PI * 3/4, TWO_PI,-3,3) )) * cos(i))
  }
  endShape(CLOSE)
    r+=r_increment
  }
  
  
}




function pulse_wave(amplitude, x) {
  return amplitude * exp(-1 * (x)**2) * sin(3 * PI * x - frameCount*3)
}
