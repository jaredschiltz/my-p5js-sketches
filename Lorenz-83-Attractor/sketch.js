let easycam;
let vertex_vector;
let a = 0.95;
let b = 7.91;
let f = 4.83;
let g = 4.66

let x = 1;
let y = 1;
let z = 1;
let dt = 0.005;
let num_particles = 900;
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
  for (i = 0; i < 2000; i++) {
    let dx = (-a * x - y ** 2 - z ** 2 + a * f) * dt
    let dy = (-y + x * y - b * x * z + g) * dt;
    let dz =
      (-z + b * x * y + x * z) *
      dt;

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
        a, b, f, g,
        dt
      )
    );
  }
 
}

function draw() {
  background(0);
  strokeWeight(0.5);
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
