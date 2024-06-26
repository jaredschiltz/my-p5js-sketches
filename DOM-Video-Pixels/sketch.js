/*
 * @name Video Pixels
 * @frame 320,240
 * @description Load a video, manipulate its pixels and draw to canvas.
 * To run this example locally, you will need a running
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.
 */
let fingers;

function setup() {
  createCanvas(600, 600);
  // specify multiple formats for different browsers
  fingers = createVideo(["assets/fingers.mov"]);
  fingers.autoplay();
  fingers.loop();
  fingers.hide();
  fingers.size(width, height);
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  fingers.loadPixels();
  const stepSize = round(constrain(mouseX / 8, 6, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - fingers.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}
