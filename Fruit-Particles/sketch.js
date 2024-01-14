let cnv;
let emitter_radius = 200;
let emitter_angle = 0;
let emitter_angular_speed = 0.001;
let img_sprite_sheet;
let image_array;

let particle_array;
let num_particles = 500;

function preload() {
  img_sprite_sheet = loadImage("fruit-sprite-sheet.png");
}
function setup() {
  cnv = createCanvas(800, 800);
  // Load Sprite Sheet
  image_array = new Array(20);
  let image_array_index = 0;
  for (let rows = 0; rows < 2; rows++) {
    for (let cols = 0; cols < 10; cols++) {
      image_array[image_array_index] = createImage(80, 80);
      image_array[image_array_index].copy(
        img_sprite_sheet,
        cols * 80,
        rows * 80,
        80,
        80,
        0,
        0,
        80,
        80
      );
      image_array_index++;
    }
    particle_array = new Array(num_particles);
    for (let i = 0; i < particle_array.length; i++) {
      particle_array[i] = new Particle(
        width / 2,
        height / 2,
        random(image_array)
      );
      particle_array[i].lifespan = -1.0; // Set inital particles to "dead"
    }
  }
  image_array.splice(-5); // Remove last 5 unused images in the image array
  console.log();
}

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);
  let delta = deltaTime * emitter_angular_speed;
  emitter_angle += delta;
  pop();
  for (let p = 0; p < particle_array.length; p++) {
    if (particle_array[p].isDead()) {
      particle_array[p] = new Particle(
        cos(emitter_angle) * emitter_radius + width/2,
        sin(emitter_angle) * emitter_radius + height/2,
        random(image_array)
      );
      break;
    }
  }
  for (p of particle_array) {
    p.update();
    p.show();

  }

}

function keyPressed() {
  if (key == "s") {
    saveGif('fruit-particles', 10);
  }
}
