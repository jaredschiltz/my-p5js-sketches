let easycam;
let vertex_vector;
let a = 0.95;
let b = 0.7;
let c = 0.6;
let d = 3.5;
let e = 0.25;
let f = 0.1;

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
  for (i = 0; i < 6000; i++) {
    let dx = ((z - b) * x - d * y) * dt;
    let dy = (d * x + (z - b) * y) * dt;
    let dz =
      (c +
        a * z -
        (z ** 3 / 3.0) -
        ((x ** 2 + y ** 2) * (1 + e * z)) +
        f * z * (x ** 3)) *
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
        a, b, c, d, e, f,
        0.01
      )
    );
  }
  
}

function draw() {
  background(0);
  strokeWeight(1);
  noFill();
  scale(60)
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
