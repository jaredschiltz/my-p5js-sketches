const k = 30; // Maximum samples before rejection
const n = 2; // Number of dimensions in background (2D canvas!)
const MAX_CANVAS_SIZE = 400;

let r; // Minimum distance between sample points
let cols;
let rows;

let w; // Grid cell dimensions
let grid;
let active;

let distance_bw_points = 7;
let aSlider; // Radius alpha
let cSlider; // Cell alpha

let speedSlider;
let point_size;

let hash_distance = distance_bw_points * 3/8

let img

function preload(){
  img = loadImage('tao.jpg')
}

function setup() {
  createCanvas(800, 800);
  //colorMode(HSB,255,255,255)
  aSlider = 0.0
  cSlider = 0.0

  speedSlider = 200000
  point_size = 10
  /*
  distance_bw_points = new Slider('Distance between points', 4, 7, 7, 2, initialize);
  aSlider = new Slider('Radius alpha', 0, 0.25, 0.1, 0.01);
  cSlider = new Slider('Cell alpha', 0, 0.25, 0.0, 0.01);
  gSlider = new Slider('Grid alpha', 0, 0.25, 0.1, 0.01);
  speedSlider = new Slider('Simulation speed', 1, 10, 1);
  point_size = new Slider('Point size', 1, 10, 4);
  */
  
  initialize();
  create_distribution()
  noLoop()
}

function initialize() {
  r = distance_bw_points ;
  w = r;// / sqrt(n); // Algorithm says r/sqrt(n) but then you have to search a 5x5 area?
  cols = floor(width / w);
  rows = floor(height / w);
  resizeCanvas(cols * w, rows * w);
  
  grid = [];
  for (let i = 0; i < cols*rows; ++i) {
    grid[i] = undefined;
  }
  
  // STEP 1 - Begin with a random point
  let pos = createVector(random(width), random(height));
  let ix = floor(pos.x / w);
  let iy = floor(pos.y / w);
  grid[ix + iy * cols] = pos;
  active = [ pos ];
}

function draw(){
  background(0)
  let max_radius = max(width,height)/2
  //strokeWeight(point_size );
  rotation = PI / 4
  
  img.loadPixels()

  for(let points of grid){
    if(points != undefined){
    //  let colour = dist(points.x, points.y, width/2, height/2) / max_radius * 255
     //   stroke(colour,255,255)
      let pixel_color = img.get(points.x, points.y)
      stroke(pixel_color)
      push()
      translate(points.x, points.y)
      rotate(random(0, TWO_PI))
      strokeWeight(1)
      let r_scaling_factor = 0.6
      let radius = r * r_scaling_factor
      line(-radius,0,radius,0)
      line(-radius,hash_distance,radius,hash_distance)
      line(-radius,-hash_distance,radius,-hash_distance)
      point(0, 0);
      pop()
    }
  }
     
}

function create_distribution() {
  //background(0);
  //drawGrid();
  
  for (let iter = 0; iter < speedSlider ; ++iter) {
    // STEP 2 - While active points, continue generating
    if (active.length > 0) {
      let sampleFound = false;
      let activeIndex = floor(random(active.length));
      let p1 = active[activeIndex];
      for (let i = 0; i < k; ++i) {
        let p2 = p5.Vector.random2D();
        p2.setMag(random(r, 2*r));
        p2.add(p1);
        
        let valid = true;
        let ix = floor(p2.x / w);
        let iy = floor(p2.y / w);
        
        if (ix < 0 || ix >= cols || iy < 0 || iy >= rows) {
          --i;
          continue;
        }
        
        for (let y = max(iy - 1, 0); y < min(iy + 2, rows); ++y) {
          for (let x = max(ix - 1, 0); x < min(ix + 2, cols); ++x) {
            let test = grid[x + y * cols];
            if (test && test.dist(p2) < r) {
              valid = false;
            }
          }
        }
        
        if (valid) {
          sampleFound = true;
          grid[ix + iy * cols] = p2;
          active.push(p2);
          break;
        }
      }
      
      if (!sampleFound) {
        active.splice(activeIndex, 1);
      }
    }
  }
  
  /*
  stroke(255);

  grid.forEach(p => {
    if (p) {
      
      //strokeWeight(0);
      //fill(255, 255, 255, 255 * aSlider );
      //circle(p.x, p.y, r);
      //fill(255, 255, 255, 255 * cSlider );
      //rect(floor(p.x / w) * w, floor(p.y / w) * w, w, w);
      
      strokeWeight(point_size );
      point(p.x, p.y);
    }
  });
  
  stroke(0, 255, 0);
  active.forEach(p => {
    point(p.x, p.y);
  });
  */
  
  if (active.length == 0){
    print("done")
    //print(grid)
    noLoop()
  }
}

function drawGrid() {
  strokeWeight(1);
  stroke(255 * gSlider );
  for (let d = 0; d <= width; d += w) {
    line(d, 0, d, height);
    line(0, d, width, d);
  }
}

function keyPressed() {
  saveCanvas(canvas, "tao", "jpg");
}