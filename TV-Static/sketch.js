
function setup() {
  createCanvas(400, 400);
  background(0);
  pixelDensity(1);
}


function draw() {
  loadPixels();
  for(let x = 0; x < width; x++)
  {
    for(let y = 0; y < height; y++)
    {
      let bright = random(255);
      pixels[4*x+0 + 4*y*width] = bright;
      pixels[4*x+1 + 4*y*width] = bright;
      pixels[4*x+2 + 4*y*width] = bright;
      pixels[4*x+3 + 4*y*width] = 255;
    }  
  }
  updatePixels();
  
}