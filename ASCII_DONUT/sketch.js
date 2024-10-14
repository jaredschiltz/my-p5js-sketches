/*
 * @name Video Pixels
 * @frame 320,240
 * @description Load a video, manipulate its pixels and draw to canvas.
 * To run this example locally, you will need a running
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.
 */
let donut;
let start_donut_draw = false;

//const density = ".,-~:;=!*#$@";
const density = "Û◤▞Åã╭:,.";

const pixel_size = 16;
let pixel_offset;
let my_font;

function preload() {
  my_font = loadFont("./assets/C64_Pro_Mono-STYLE.ttf");
}

function setup() {
  createCanvas(800, 800);
  // specify multiple formats for different browsers
  donut = createVideo("./assets/Donut.mov", handleVideo);
  noStroke();
  fill(0);
  pixel_offset = width / pixel_size;
  rectMode(CENTER);
  textFont(my_font);
  textSize(pixel_size);
  textAlign(CENTER);
}

function handleVideo() {
  donut.size(width, height);
  donut.autoplay(false);
}

/* NOTE! Must press the mouse to start the video playing!!!!
Can't do an auto load in Chrome brower, because security policy restricts it.
*/
function mousePressed() {
  donut.loop();
  donut.hide();
  donut.play();
  // Do not allow draw loop to try and draw donut without the lines above
  // setting up the donut video and playing it first!
  start_donut_draw = true;
}

function draw() {
  background(0);
  let min_bright = 1000;
  let max_bright = -10;

  /*
  for (let y = pixel_size / 2; y < height; y = y + pixel_size) {
    for (let x = pixel_size / 2; x < width; x = x + pixel_size) {
      fill(random(0, 255), random(0, 255), random(0, 255));
      rect(x, y, pixel_size, pixel_size);
      fill(255);
      text("0", x, y + pixel_size / 2.25);
    }
  }
  */

  if (start_donut_draw == true) {
    donut.loadPixels();
    for (let y = pixel_size / 2; y < donut.height; y = y + pixel_size) {
      for (let x = pixel_size / 2; x < donut.width; x = x + pixel_size) {
        const pixelIndex = (x + y * donut.width) * 4;
        const r = donut.pixels[pixelIndex + 0];
        const g = donut.pixels[pixelIndex + 1];
        const b = donut.pixels[pixelIndex + 2];
        let bright = brightness(color(r, g, b));
        /*
      if (bright > max_bright) {
        max_bright = bright;
      }
      if (bright < min_bright) {
        min_bright = bright;
      }
      */
        let char_index = floor(map(bright, 1, 225, 0, density.length));
        let c = density.charAt(char_index);
        fill(color(r + 150, g + 74, b + 0));
        text(c, x, y + pixel_size / 2.25);
        //rect(x, y, pixel_size, pixel_size);
      }
    }
  }
}
