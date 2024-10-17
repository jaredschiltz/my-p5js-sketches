let nodes = 5;

function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(0);
  const slopeArray = calcSlopes(nodes);
  stroke(255);
  beginShape();
  noFill();
  
  for(let x = 0; x < width; x++)
  {
      vertex(x,height/2 + 300*(samplePerlin(map(x,0,width,0,nodes-1),slopeArray)));
  }
  
  endShape();
  
  noLoop();
}

function calcSlopes(numSlopes)
{
    const slopeArray = [];
    for(let i = 0; i < numSlopes; i++)
    {
      slopeArray[i] = Math.random()*2-1; //Generates number between -1 to 1
    }
    return slopeArray; 
}

function samplePerlin(x,slopeArray)
{
   let lo = Math.floor(x);
   let hi = lo + 1;
   let dist = x - lo;
   let loSlope = slopeArray[lo];
   let hiSlope = slopeArray[hi];
   let loPos = loSlope * dist;
   let hiPos = -hiSlope * (1-dist); 
   let u = dist * dist * dist * (6 * dist * dist - 15 * dist + 10);  // cubic curve
   return (loPos*(1-u)) + (hiPos*u);  // interpolate
   
   
  
  
}