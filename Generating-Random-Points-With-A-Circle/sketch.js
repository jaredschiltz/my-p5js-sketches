function setup() {
  createCanvas(400, 400);
  noLoop()

  num_points = 100000;
  point_size = 5
  noStroke()
  fill(0)

}

/*
Step 1: Create the cumulative distribution function (CDF)
The CDF is, as the name suggests, the cumulative version of the PDF. Since we're working with reals, the CDF is expressed as an integral.

CDF(x) = ∫PDF = ∫2x = x2
Step 2: Mirror the CDF along y = x
Mathematically this boils down to swapping x and y and solving for y:

CDF:y = x2
Swap:x = y2
Solve:y = √x
CDF-1:y = √x
Step 3: Apply the resulting function to a uniform value between 0 and 1
CDF-1(random()) = √random()
And that's where sqrt(random()) comes from.
*/

function draw() {
  background(0);
    translate(width/2, height/2)
    for (let i = 0; i < num_points; i++) {
      fill(random(0,255), random(0,255), random(0,255))
      angle = random() * 2 * PI
      radius = width / 2.0 * sqrt(random())
      x = radius * cos(angle)
      y = radius * sin(angle)
      ellipse(x,y,point_size)
    }


    filter(BLUR, 1);
}