let img
let img_width
let img_height
let cell_size = 10
let my_font
const brightness_data = " .:;-~=+a*&$#%M@"
let image_processed
let text_horiz_offset = -2
let text_vert_offset = 8

function preload() {
  img = loadImage('pug.jpg')
  my_font = loadFont('C64_Pro_Mono-STYLE.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img_width = img.width
  img_height = img.height
  textFont(my_font)
  textSize(12)
  noLoop();
}

function draw() {
  background(0)
  noStroke()
  let brightness_levels = get_brightness_levels(img, cell_size)
  img.loadPixels()
  for (row = 0; row < img_height; row = row + cell_size) {
      for (col = 0; col < img_width; col = col + cell_size) {
        // Get Center Pixel Value
        let pixel_color = img.get(col + cell_size/2, row + cell_size/2)
        let bright = brightness(pixel_color)
        let brightness_char_index = floor(map(bright,brightness_levels.min,brightness_levels.max,15,0))
        fill(pixel_color)
        //rect(col, row, cell_size, cell_size)
        //fill(255,0,0)
        textAlign(LEFT)
        text(brightness_data[brightness_char_index],col + text_horiz_offset, row + text_vert_offset)
      }
  } 
  img.updatePixels()
}

function get_brightness_levels(img, cell_size){
  img.loadPixels()
  let min_brightness = 255
  let max_brightness = 0
  for (row = 0; row < img.height; row = row + cell_size) {
    for (col = 0; col < img_width; col = col + cell_size) { 
      let pixel_color = img.get(col + cell_size/2, row + cell_size/2)
      let bright = brightness(pixel_color) 
      if (bright < min_brightness) {
        min_brightness = bright
      }
      if (bright > max_brightness) {
        max_brightness = bright
      }
    }
  }
  img.updatePixels()
  return {min: min_brightness, max: max_brightness}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
