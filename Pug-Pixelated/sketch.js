let img
let img_width
let img_height
let cell_size = 20
let image_processed

function preload() {
  img = loadImage('pug.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img_width = img.width
  img_height = img.height
   noLoop();
}

function draw() {
  background(0)
  noStroke()
  img.loadPixels()
  for (row = 0; row < img_height; row = row + cell_size) {
      for (col = 0; col < img_width; col = col + cell_size) {
        // Get Center Pixel Value
        let pixel_color = img.get(col + cell_size/2, row + cell_size/2)
        fill(pixel_color)
        rect(col, row, cell_size, cell_size)
      }
  } 
  img.updatePixels()
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
