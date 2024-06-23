// Coding Train / Daniel Shiffman
// Weighted Voronoi Stippling
// https://thecodingtrain.com/challenges/181-image-stippling

// All of the points
let points = [];
// Global variables for geometry
let delaunay, voronoi;
// Image
let image;

let number_points = 15000;

// Load image before setup
function preload() {
  image = loadImage("image.jpg");
}

function setup() {
  print(image.height);
  createCanvas(image.width, image.height);

  // Generate random points avoiding bright areas
  generateRandomPoints(number_points);

  // Calculate Delaunay triangulation and Voronoi diagram
  delaunay = calculateDelaunay(points);

  voronoi = delaunay.voronoi([0, 0, width, height]);
}

function draw() {
  fill(0, 0, 0, 0);
  //drawDelaunay(delaunay)
  //drawVoronoiDiagram(voronoi)

  //for (let i = 1; i < 40; i++) {
  background(255);
  // Display points
  displayPoints();
  // Calculate centroids and update points
  updatePoints();
  //}
  //noLoop();
}

// Generate random points avoiding bright areas
function generateRandomPoints(n) {
  for (let i = 0; i < n; i++) {
    let x = random(width);
    let y = random(height);
    let col = image.get(x, y);
    if (random(170) > brightness(col)) {
      points.push(createVector(x, y));
    } else {
      i--;
    }
  }
}

// Display points
function displayPoints() {
  for (let v of points) {
    stroke(0);
    strokeWeight(4);
    point(v.x, v.y);
  }
}

// Calculate centroids and update points
function updatePoints() {
  // Get latest polygons
  //let polygons = voronoi.cellPolygons();
  //let cells = Array.from(polygons);

  // Arrays for centroids and weights
  let centroids = new Array(number_points);
  let weights = new Array(number_points).fill(0);
  for (let i = 0; i < centroids.length; i++) {
    centroids[i] = createVector(0, 0);
  }

  // Get the weights of all the pixels and assign to cells
  image.loadPixels();
  let delaunayIndex = 0;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      let r = image.pixels[index + 0];
      let g = image.pixels[index + 1];
      let b = image.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let weight = 1 - bright / 255;
      delaunayIndex = delaunay.find(i, j, delaunayIndex);
      centroids[delaunayIndex].x += i * weight;
      centroids[delaunayIndex].y += j * weight;
      weights[delaunayIndex] += weight;
    }
  }

  // Compute weighted centroids
  for (let i = 0; i < centroids.length; i++) {
    if (weights[i] > 0) {
      centroids[i].div(weights[i]);
    } else {
      centroids[i] = points[i].copy();
    }
  }

  // Interpolate points
  for (let i = 0; i < points.length; i++) {
    points[i].lerp(centroids[i], 0.1);
  }

  // Next voronoi (relaxation)
  delaunay = calculateDelaunay(points);

  voronoi = delaunay.voronoi([0, 0, width, height]);
}

// Calculate Delaunay triangulation from p5.Vectors
function calculateDelaunay(points) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
function drawVoronoiDiagram(voronoi) {
  let polygons = voronoi.cellPolygons();
  for (let poly of polygons) {
    stroke(255, 0, 0);
    beginShape();
    for (let i = 0; i < poly.length; i++) {
      vertex(poly[i][0], poly[i][1]);
    }
    endShape();
  }
}
function drawDelaunay(delaunay) {
  //print(delaunay)
  let dp = delaunay.points;
  let triangles = delaunay.triangles;
  for (let i = 0; i < triangles.length; i += 3) {
    let a = 2 * triangles[i];
    let b = 2 * triangles[i + 1];
    let c = 2 * triangles[i + 2];
    stroke(0, 255, 0);
    triangle(dp[a], dp[a + 1], dp[b], dp[b + 1], dp[c], dp[c + 1]);
  }
}

function mousePressed() {
  delaunayIndex = delaunay.find(mouseX, mouseY);
  print(delaunayIndex);
}
