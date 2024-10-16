let easycam;
let vertex_vector;
let a = 32.48
let b = 45.84;
let c = 1.18;
let d = 0.13;
let e = 0.57;
let f = 14.7

let x = 1;
let y = 1;
let z = 1;
let dt = 0.0004;
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
  for (i = 0; i < 12000; i++) {
    let dx = (a * (y - x) + d * x * z) * dt;
    let dy = (b * x - x * z + f * y) * dt;
    let dz =
      (c * z + x * y - e * x ** 2) *
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
        createVector(random(-20, 20), random(-20, 20), random(-20, 20)),
        particle_color,
        a, b, c, d, e, f,
        0.0012
      )
    );
  }
 
}

function draw() {
  background(0);
  strokeWeight(1);
  noFill();
  scale(1)
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
