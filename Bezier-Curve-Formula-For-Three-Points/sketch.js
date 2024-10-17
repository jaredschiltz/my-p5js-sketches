/*
 Based on formula found here:
 https://javascript.info/bezier-curve
*/

let pointColor; 
let node0;
let controlPointPos;
let node1;
function setup() {
  createCanvas(400, 400);
  pointColor = color(255, 204, 0);
    node0 = createVector(100, 100)
    node1 = createVector(300, 300)
  let controlX = (node1.x - node0.x) / 2 + node0.x
  let controlY = (node1.y - node0.y) / 2 + node0.y
  controlPointPos = createVector(controlX, controlY)
  //noLoop()
}

function draw() {
  background(0);
  fill(pointColor);
  stroke(pointColor);
  strokeWeight(1);
  circle(node0.x,node0.y,5)
  circle(node1.x,node1.y,5)
  circle(controlPointPos.x,controlPointPos.y,5)
  
  xdistance = node1.x - node0.x; // distance between the two end nodes
  
  let oldx = node0.x
  let oldy = node0.y
  
  tempPoint = createVector(300, 100)
  for(let x = node0.x; x <= node1.x; x++ )
    {
      t = map(x, node0.x, node1.x, 0, 1) // map x distance to value between 0 and 1
      bezPoint = calculateThreePointBezier(t, node0, tempPoint, node1)
      //bezPoint = calculateFourPointBezier(t, node0, controlPointPos, controlPointPos, node1)
      line(oldx, oldy, bezPoint.x, bezPoint.y)
      oldx = bezPoint.x
      oldy = bezPoint.y
      
    }
  
 // let oldx = node0.x
 // let oldy = node0.y
  
   oldx = node0.x
   oldy = node0.y
  
  for(let x = node0.x; x <= node1.x; x++ )
    {
      t = map(x, node0.x, node1.x, 0, 1) // map x distance to value between 0 and 1
      //bezPoint = calculateThreePointBezier(t, node0, controlPointPos, node1)
      bezPoint = calculateFourPointBezier(t, node0, controlPointPos, controlPointPos, node1)
      line(oldx, oldy, bezPoint.x, bezPoint.y)
      oldx = bezPoint.x
      oldy = bezPoint.y
      
    }
  
  
  
  

}

function mouseDragged()
{
  controlPointPos.x = mouseX
  controlPointPos.y = mouseY
  
  
  if(controlPointPos.x < node0.x)
    {
      controlPointPos.x = node0.x
    }
  
    if(controlPointPos.x > node1.x)
    {
      controlPointPos.x = node1.x
    }
  
    if(controlPointPos.y < node0.y)
    {
      controlPointPos.y = node0.y
    }
  
    if(controlPointPos.y > node1.y)
    {
      controlPointPos.y = node1.y
    }
    
  
  
}

function calculateThreePointBezier(t, point1, point2, point3) // 3 control points
{
    curveVector = createVector(0,0);
    curveVector.x = ((1 - t) ** 2) * point1.x + 2 * (1 - t) * t * point2.x  + (t**2) * point3.x;
    curveVector.y = ((1 - t) ** 2) * point1.y + 2 * (1 - t) * t * point2.y + (t**2) * point3.y;
  
  return curveVector;
}

function calculateFourPointBezier(t, point1, point2, point3, point4) // 4 control points
{
    curveVector = createVector(0,0);
    curveVector.x = ((1 - t) ** 3) * point1.x + 3 * ((1 - t) ** 2) * t * point2.x + 
      3 * (1 - t) * t**2 * point3.x + t**3 * point4.x;
    curveVector.y = ((1 - t) ** 3) * point1.y + 3 * ((1 - t) ** 2) * t * point2.y + 
      3 * (1 - t) * t**2 * point3.y + t**3 * point4.y;
  
  return curveVector;
}

