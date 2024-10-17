
let points = 50;
let myGlobe = new Array(points);

function setup() {
  createCanvas(800, 800, WEBGL);
  createEasyCam()
  globe = createVector()

  for (let i = 0; i < myGlobe.length; i++)
    {
      myGlobe[i] = new Array(points)
    }
}

function draw() {
  background(0);
  fill(255)
  stroke(255);
  lights();
  let radius = 200

  for (let i = 0; i < points; i++)
    {
      let lat = map(i, 0, points, -HALF_PI, HALF_PI)

      for (let j = 0; j < points; j++)
        {
                
          let lon = map(j, 0, points, -PI, PI)
          let x = radius * sin(lon) * cos(lat)
          let y = radius * sin(lon) * sin(lat)
          let z = radius * cos(lon)
          myGlobe[i][j] = createVector(x, y, z)
        }
    }
  
    for (let i = 0; i < points; i++)
    {
            for (let j = 0; j < points; j++)
        {
          let v = myGlobe[i][j]
          point(v.x, v.y, v.z)
        }
    }
}
