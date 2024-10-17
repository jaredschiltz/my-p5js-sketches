let noiseVar;
let points = [];
let distance = [];
let numPoints = 75;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < numPoints; i++)
  {
    points[i] = createVector(random(width), random(height));
  }
}

function draw() {
  //background(220);
  
  noLoop();
  
  loadPixels();
  pixelDensity(1);
  for (let x = 0; x < width; x++)
  {
     for(let y = 0; y < height; y++)
     {
       for (let p = 0; p < numPoints; p++)
       {
         distance[p] = dist(x, y, points[p].x, points[p].y);
       }
       let n = 0;
       let sorted = sort(distance);
       let noiseVal = map(sorted[n],0,50,0,255);
       let index = x +  y * width * 2 ;
       let noiseVar = color(noiseVal,0,0);
       pixels[index * 4] = red(noiseVar);
       pixels[index * 4 + 1] = green(noiseVar);
       pixels[index * 4 + 2] = blue(noiseVar);
       pixels[index * 4 + 3] = alpha(noiseVar); 
       
     }
  }

  updatePixels();
  
  /*
  for (let i = 0; i < numPoints; i++)
  {
    stroke(0,255,0);
    strokeWeight(3);
    point(points[i].x, points[i].y);
  }
  */


}