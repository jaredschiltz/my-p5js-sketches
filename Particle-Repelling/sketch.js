"use strict";
let particle_array;
let num_particles = 250;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  particle_array = new Array(num_particles)
  for (let i = 0; i < num_particles; i++) {
    particle_array[i] = new Particle(
      createVector(random(width), random(height)),
      70
    );
  }
}

function draw() {
  background(0);
  for (let i = 0; i < num_particles; i++){
      particle_array[i].update(particle_array, i);
      particle_array[i].show();
  }

}
