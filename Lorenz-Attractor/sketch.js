let easycam;
let vertex_vector
const rho = 28
const beta = 8.0 / 3.0
const sigma = 10
let x = 1
let y = 1
let z = 1
let dt = 0.009
let num_particles = 500
let particle_array


function setup() {
  colorMode(HSB)
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);

  easycam = createEasyCam();
    // suppress right-click context menu
  document.oncontextmenu = function() { return false; }
  
  vertex_vector = new Array()
  for (i = 0; i < 7000; i++){
    dx = sigma * (y - x) * dt
    dy = (x * (rho - z) - y) * dt
    dz = (x * y - beta * z) * dt
    x = x + dx
    y = y + dy
    z = z + dz
    vertex_vector.push(createVector(x,y,z))
  }
  
  particle_color = color(0,100,100,1)
  particle_array = new Array()
  for (let i = 0; i < num_particles; i++){
     let particle_color = color(random(0,50),100,100,1)
  particle_array.push(new Particle(createVector(random(-20,20),random(-20,20),random(-20,40)), particle_color, rho, beta, sigma, dt))
  }
  
  
} 

function draw() {
 background(0);
  strokeWeight(0.25)
  noFill()
  stroke(220,100,40,1)
  
  beginShape();
  for (let i = 0; i < vertex_vector.length; i++) {
    vertex(vertex_vector[i].x, vertex_vector[i].y,vertex_vector[i].z)
  }
  endShape()
  
  for (i = 0; i < particle_array.length; i++) {
    particle_array[i].update()
    particle_array[i].show()
  }
}