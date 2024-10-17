let xoff = 0;
let yoff = 2000;
let start = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  
  beginShape();
  let xspace = xoff;
  
  for (let x = 0; x < width; x++)
  {
    let y = noise(xspace) * height;
    vertex(x,y);
    xspace += 0.02;
    
  }
  
  xoff += 0.02;
  
  endShape();

}