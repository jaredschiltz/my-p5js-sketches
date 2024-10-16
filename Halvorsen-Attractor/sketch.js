let easycam;
let vertex_vector;
let a = 1.89

let x = 1;
let y = -1;
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
    let dx = (-a * x - 4 * y - 4 * z - y ** 2) * dt;
    let dy = (-a * y - 4 * z - 4 * x - z ** 2) * dt;
    let dz = (-a * z - 4 * x - 4 * y - x ** 2) * dt;

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
        dt
      )
    );
  }
 
}

function draw() {
  background(0);
  strokeWeight(0.1);
  noFill();
  scale(5)
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
