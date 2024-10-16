const red = 'rgb(228,28,35)'
const orange = 'rgb(246,155,27)'
const yellow = 'rgb(245,235,3)'
const green = 'rgb(96,184,71)'
const indigo = 'rgb(69,137,201)'
const violet = 'rgb(92,85,163)'
const color_list = [red, orange, yellow, green, indigo, violet]

function setup() {
  createCanvas(600, 300);
}

function draw() {
  background('#004477');
  stroke(red)
  strokeWeight(30)
  noFill()
  start_proportion = 1.8
  for (let i = 0; i < 6; i++){
    stroke(color_list[i])
    arc(width/2,height,height*start_proportion, height*start_proportion, 0, TWO_PI, OPEN)
    start_proportion -= 0.2
  }
}