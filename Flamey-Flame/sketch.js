function setup() {
  createCanvas(640, 640);
  noStroke()
  background(0)
}

function draw() {
   filter(BLUR, 1);
   // draw rectangles over entire canvas width spaced by
   // 10 pixels
   for(let i = 0; i < width; i += 10) {
     // multiply noise output in range [0..1] with 255
     // because 255 is the largest color value
     fill(noise(i/10.0 + frameCount/100.0) * 255);
     // multiply noise output in range [0..1] with 15
     // because we want 15 pixels max size for rectangles
     let size = noise(0.3 + frameCount/1000.0) * 15;
     rect(i, frameCount % height, size, size);
   }

}
