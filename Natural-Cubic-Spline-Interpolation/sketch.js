
function setup() {
  createCanvas(400, 400);
  
  // Point Set
  x0 = -50
  y0 = 150
  x1 = -10
  y1 = -100
  x2 = 50
  y2 = -150
  
  a11 = 2 / (x1 - x0)
  a12 = 1 / (x1 - x0)
  a21 = 1 / (x1 - x0)
  a22 = 2 * (1 / (x1 - x0) + 1 / (x2 - x1))
  a23 = 1 / (x2 - x1)
  a32 = 1 / (x2 - x1)
  a33 = 2 / (x2 - x1)
  
  b1 = 3 * (y1 - y0) / ((x1 - x0) ** 2)
  b2 = 3 * ((y1 - y0) / (x1 - x0) ** 2 + (y2 - y1) / (x2 - x1) ** 2)
  b3 = 3 * (y2 - y1) / (x2 - x1) ** 2
  
  A = math.matrix([[a11, a12, 0],[a21, a22, a23],[0, a32, a33]]);
  A_inverse = math.inv(A);
  B = math.matrix([b1, b2, b3]);
  
  // Calculate k's
  k = math.multiply(B, A_inverse);
  //console.log(k._data)
  
  // Calculate polynomial coefficients
  a1 = k._data[0] * (x1 - x0) - (y1 - y0)
  b1 = -k._data[1] * (x1 - x0) + (y1 - y0)
  a2 = k._data[1] * (x2 - x1) - (y2 - y1)
  b2 = -1 * k._data[2] * (x2 - x1) + (y2 - y1)

  // Define test points
  
  // Construct both polynomials now and compute points

  /*
  t1 = (x - x0) / (x1 - x0)
  t2 = (x - x1) / (x2 - x1)
  q1 = (1 - t1) * y0 + t1 * y1 + t1 * (1 - t1) * ((1 - t1) * a1 + t1 * b1)
  q2 = (1 - t2) * y1 + t2 * y2 + t2 * (1 - t2) * ((1 - t2) * a2 + t2 * b2) 
  */
  
}

function draw() {
  background(0);
  pointColor = color(255, 204, 0);
  push()
  translate(width/2, height/2)

    strokeWeight(1)
    stroke(pointColor)
    let oldx = x0;
    let oldy = y0;
  
   // draw first curve
    for (let x = x0; x < x1; x = x + 1)
    {
      t1 = (x - x0) / (x1 - x0)
      q1 = (1 - t1) * y0 + t1 * y1 + t1 * (1 - t1) * ((1 - t1) * a1 + t1 * b1)
      line(oldx, oldy, x, q1)
      oldx = x;
      oldy = q1;
    }
  
   oldx = x1
   oldy = y1
  // draw second curve
      for (let x = x1; x < x2; x = x + 1)
    {
      t2 = (x - x1) / (x2 - x1)
      q2 = (1 - t2) * y1 + t2 * y2 + t2 * (1 - t2) * ((1 - t2) * a2 + t2 * b2) 
      line(oldx, oldy, x, q2)
      oldx = x;
      oldy = q2;
    }
  
    

    noStroke();
    fill(pointColor);
    circle(x1, y1, 5)
    circle(x0, y0, 5)
    circle(x2, y2, 5)
  
  //circle(3, 3, 5)
  
  pop()
  
}
