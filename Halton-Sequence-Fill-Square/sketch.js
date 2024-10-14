function setup() {
  createCanvas(400, 400);
  ellipseMode(CENTER)
  noLoop()
}

function draw() {
  background(220);
  let number_of_points = 2048
  for (let i = 1; i < number_of_points + 1; i++) {
    let x = halton_sequence(i, 2)
     let y = halton_sequence(i, 3)
     x = map(x, 0.0, 1.0, 0, width)
    y = map(y, 0.0, 1.0, 0, height)
    noStroke()
    fill(0,0,255)
    circle(x,y,5)
  }
}

function halton_sequence (index, base) {
  let f = 1
  let result = 0
  while (index > 0) {
    f = f / base
    result += f * (index % base)
    index = Math.floor(index / base)
  }
  return result
}