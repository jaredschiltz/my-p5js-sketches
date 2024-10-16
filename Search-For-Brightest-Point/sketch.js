let bulbImage

function preload() {
  bulbImage = loadImage('lightbulb.jpeg')
}
function setup() {
  createCanvas(720, 307);
  image(bulbImage, 0, 0)
  let maxRow = 0
  let maxCol = 0
  let maxBrightness = 0
  
  for (let rows = 0; rows < height; rows++) {
    for (let cols = 0; cols < width; cols++) {
      let pixelValue = get(cols, rows)
      let brightness = pixelValue[0] + pixelValue[1] + pixelValue[2]
      if (brightness > maxBrightness) {
        maxBrightness = brightness
        maxRow = rows
        maxCol = cols
      }
    }
  }
  
  noFill()
  stroke(0)
  strokeWeight(3)
  circle(maxCol, maxRow, 30)
  line(maxCol - 15, maxRow, maxCol - 60, maxRow)
  line(maxCol, maxRow - 15, maxCol, maxRow - 60)
  strokeWeight(1)
  fill(0)
  textSize(15)
  textFont('Courier')
  text("Y: " + str(maxRow), maxCol - 70, maxRow - 5)
  text("X: " + str(maxCol), maxCol + 5, maxRow - 30)

  noLoop()
}

function draw() {

}