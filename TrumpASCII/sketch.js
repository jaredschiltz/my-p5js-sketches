let img
let img_width
let img_height
let cell_size = 10
let my_font
const string = "BIGOT RACIST DISHONEST CLOWN DISGUSTING NARCISSIST BULLY MAN-CHILD STUPID EGOTISTICAL IGNORANT LIAR "+
"INCOMPETENT IDIOT INSECURE SHALLOW SIMPLEMINDED POMPOUS RECKLESS SELFISH XENOPHOBIC WOMANIZER LOSER FRAUD REPREHENSIBLE " +
"IRREDEEMABLE IMMORAL DESPICABLE OBSTINATE OSTENTATIOUS OBSTRUCTIVE OBSCENE CRIMINAL MEGALOMANIAC TAX-EVADER VAIN BRAGGART " +
"MISANTHROPE SPOILED SIMPLETON TOXIC CORRUPT INFANTILE SEXIST TODDLER DESPICABLE RAGING LOW-IQ DANGEROUS CONTEMPTUOUS " +
"IMMATURE PETULANT THREAT TO DEMOCRACY "
let image_processed
let text_horiz_offset = -2
let text_vert_offset = 8
function preload() {
  img = loadImage('Trump.jpeg')
  my_font = loadFont('C64_Pro_Mono-STYLE.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img_width = img.width
  img_height = img.height
  textFont(my_font)
  textSize(10)
  noLoop();
}

function draw() {
  background(0)
  string_length = string.length
  let current_letter = 0
  translate(20,20)
  noStroke()
  img.loadPixels()
  for (row = 0; row < img_height; row = row + cell_size) {
      for (col = 0; col < img_width; col = col + cell_size) {
        // Get Center Pixel Value
        let pixel_color = img.get(col + cell_size/2, row + cell_size/2)
        fill(pixel_color)
        //rect(col, row, cell_size, cell_size)
        //fill(255,0,0)
        textAlign(LEFT)
        text(string[current_letter % string.length],col + text_horiz_offset, row + text_vert_offset)
        current_letter++
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
