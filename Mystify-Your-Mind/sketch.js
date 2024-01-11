const WIDTH_HEIGHT = 800;
const SPEED = 1.2;
const OFFSET = 5;
const NUM_LINES = 6;
const NUM_POINTS = 4;
let cnv;
function preload() {}
let particle_array1;
let particle_array2;
let particle_array3;
function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  particle_array1 = new Array(NUM_POINTS);
  particle_array2 = new Array(NUM_POINTS);
  particle_array3 = new Array(NUM_POINTS);
  for (let i = 0; i < particle_array1.length; i++) {
    particle_array1[i] = {
      pos: createVector(random(0, width), random(0, height)),
      vel: createVector(random(-1.0, 1.0), random(-1.0, 1.0)),
    };
    particle_array1[i].vel.normalize().mult(SPEED);
    particle_array2[i] = {
      pos: createVector(random(0, width), random(0, height)),
      vel: createVector(random(-1.0, 1.0), random(-1.0, 1.0)),
    };
    particle_array2[i].vel.normalize().mult(SPEED);
    particle_array3[i] = {
      pos: createVector(random(0, width), random(0, height)),
      vel: createVector(random(-1.0, 1.0), random(-1.0, 1.0)),
    };
    particle_array3[i].vel.normalize().mult(SPEED);
  }
}

function draw() {
  background(20);
  noFill();
  for (let i = 0; i < NUM_LINES; i++) {
    push();
    translate(i * OFFSET, i * OFFSET);
    beginShape();
    for (let i = 0; i < particle_array1.length; i++) {
      stroke(color("#e10086"));
      strokeWeight(2);

      vertex(particle_array1[i].pos.x, particle_array1[i].pos.y);
      particle_array1[i].pos.add(particle_array1[i].vel);
      if (particle_array1[i].pos.x < 0 * NUM_LINES) {
        particle_array1[i].vel.x *= -1.0;
      }
      if (particle_array1[i].pos.x > width - OFFSET * NUM_LINES) {
        particle_array1[i].vel.x *= -1.0;
      }
      if (particle_array1[i].pos.y < 0) {
        particle_array1[i].vel.y *= -1.0;
      }
      if (particle_array1[i].pos.y > height - OFFSET * NUM_LINES) {
        particle_array1[i].vel.y *= -1.0;
      }
    }
    endShape(CLOSE);
    pop();
  }
  for (let i = 0; i < NUM_LINES; i++) {
    push();
    translate(i * OFFSET, i * OFFSET);
    beginShape();
    for (let i = 0; i < particle_array1.length; i++) {
      stroke(color("#fdfb76"));
      strokeWeight(2);

      vertex(particle_array2[i].pos.x, particle_array2[i].pos.y);
      particle_array2[i].pos.add(particle_array2[i].vel);
      if (particle_array2[i].pos.x < 0 * NUM_LINES) {
        particle_array2[i].vel.x *= -1.0;
      }
      if (particle_array2[i].pos.x > width - OFFSET * NUM_LINES) {
        particle_array2[i].vel.x *= -1.0;
      }
      if (particle_array2[i].pos.y < 0) {
        particle_array2[i].vel.y *= -1.0;
      }
      if (particle_array2[i].pos.y > height - OFFSET * NUM_LINES) {
        particle_array2[i].vel.y *= -1.0;
      }
    }
    endShape(CLOSE);
    pop();
  }
  for (let i = 0; i < NUM_LINES; i++) {
    push();
    translate(i * OFFSET, i * OFFSET);
    beginShape();
    for (let i = 0; i < particle_array1.length; i++) {
      stroke(color("#00db96"));
      strokeWeight(2);

      vertex(particle_array3[i].pos.x, particle_array3[i].pos.y);
      particle_array3[i].pos.add(particle_array3[i].vel);
      if (particle_array3[i].pos.x < 0 * NUM_LINES) {
        particle_array3[i].vel.x *= -1.0;
      }
      if (particle_array3[i].pos.x > width - OFFSET * NUM_LINES) {
        particle_array3[i].vel.x *= -1.0;
      }
      if (particle_array3[i].pos.y < 0) {
        particle_array3[i].vel.y *= -1.0;
      }
      if (particle_array3[i].pos.y > height - OFFSET * NUM_LINES) {
        particle_array3[i].vel.y *= -1.0;
      }
    }
    endShape(CLOSE);
    pop();
  }
}

function keyPressed() {
  if (key == "s") {
    saveGif("mygif", 10);
  }
}
