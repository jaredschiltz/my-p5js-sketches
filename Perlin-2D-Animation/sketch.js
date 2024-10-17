let inc = 0.01;

zoff = 0;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  noiseDetail(4);
}

function draw() {
  let yoff = 0;
  loadPixels();
  for (let y = 0; y < height; y++)
  {
    var xoff = 0;
     for(let x = 0; x < width; x++)
     {
       let index = (x + y * width) * 4;
       let value = noise(xoff,yoff,zoff) * 255;
       pixels[index + 0] = value;
       pixels[index + 1] = value;
       pixels[index + 2] = value;
       pixels[index + 3] = 255;
       xoff += inc;
       
     }
    yoff += inc;
  }
  updatePixels();
  zoff += inc;
}