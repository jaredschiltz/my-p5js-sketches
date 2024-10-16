let easycam;
let vertex_vector;
let a = 0.14
let gamma = 0.10

let x = 1;
let y = 1;
let z = 1;
let dt = 0.01;
let num_particles = 500;
let particle_array;

function setup() {
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes("antialias", true);

  easycam = createEasyCam();
  // suppress right-click context menu
  document.oncontextmenu = function () {
    return false;
  };

  vertex_vector = new Array();
  for (i = 0; i < 7000; i++) {
    let dx = (y * (z - 1 + x **2) + gamma * x) * dt;
    let dy = (x * (3 * z + 1 - x **2) + gamma * y) * dt;
    let dz = (-2 * z * (a + x * y)) * dt;

    x = x + dx;
    y = y + dy;
    z = z + dz;
    vertex_vector.push(createVector(x, y, z));
  }
  particle_color = color(0, 100, 100, 1);
  particle_array = new Array();
  for (let i = 0; i < num_particles; i++) {
    let particle_color = color(random(0, 50), 100, 100, 1);
    particle_array.push(
      new Particle(
        createVector(random(-1, 1), random(-1, 1), random(-1, 1)),
        particle_color,
        a,
        gamma,
        dt
      )
    );
  }
 
}

function draw() {
  background(0);
  strokeWeight(0.1);
  noFill();
  scale(20)
  stroke(220, 100, 40, 1);

  beginShape();
  for (let i = 0; i < vertex_vector.length; i++) {
    vertex(vertex_vector[i].x, vertex_vector[i].y, vertex_vector[i].z);
  }
  endShape();

  
  for (i = 0; i < particle_array.length; i++) {
    particle_array[i].update();
    particle_array[i].show();
  }
  
}
