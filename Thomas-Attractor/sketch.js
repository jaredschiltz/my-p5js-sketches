let easycam;
let vertex_vector
const beta = 0.208186
let x = 0.1
let y = 1.0
let z = 2
let dt = 0.5
let num_particles = 2000
let particle_array


function setup() {
  colorMode(HSB)
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);

  easycam = createEasyCam();
    // suppress right-click context menu
  document.oncontextmenu = function() { return false; }
  
  vertex_vector = new Array()
  for (i = 0; i < 10000; i++){
    dx = (sin(y) - beta * x) * dt
    dy = (sin(z) - beta * y) * dt
    dz = (sin(x) - beta * z) * dt
    x = x + dx
    y = y + dy
    z = z + dz
    vertex_vector.push(createVector(x,y,z))
  }
  
  
  particle_color = color(0,100,100,1)
  particle_array = new Array()
  for (let i = 0; i < num_particles; i++){
     let particle_color = color(random(0,50),100,100,1)
  particle_array.push(new Particle(createVector(random(-2,2),random(-2,2),random(-2,2)), particle_color,beta, dt))
  }
  
  
} 

function draw() {
 background(0);
  scale(10)
  strokeWeight(0.1)
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