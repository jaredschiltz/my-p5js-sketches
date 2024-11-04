const WIDTH_HEIGHT = 800;
let rings = 20;
let start_arc_radius = 1;
let arc_radius_delta_each_ring = 8;

let noise_init = 0.2;
let noise_delta = 0.1; // controls how smooth the noise is
let max_noise_amplitude = 60;

let ox;
let oy;
let oz;

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  strokeWeight(1);
  smooth();
  noFill();
  ox = random(10000);
  oy = random(10000);
  //oz = random(10000);
  oz = 1;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  display();
}

function keyPressed() {
  if (key == "s") {
    //saveCanvas("outt", "j");
    //image.save("image_mask", "g"); // This saves a transrent mask g file
    //saveGif("outt_gif", 10);
  }
}
function display() {
  //ox += 0.02;
  //oy += 0.02;
  oz += 0.01;
  oy = 2 * oz;
  for (let i = 0; i < rings; i++) {
    let stroke_opacity = ("00" + floor((i / rings) * 256).toString(16)).slice(
      -2
    );
    stroke_opacity = `#ffffff${stroke_opacity}`;
    stroke(stroke_opacity);
    beginShape();
    for (let angle = 0; angle < 360; angle++) {
      let radian = radians(angle);
      let radius =
        max_noise_amplitude *
          getNoiseWithTime(radian, noise_delta * i + noise_init, oz) +
        (arc_radius_delta_each_ring * i + start_arc_radius);
      vertex(radius * cos(radian), radius * sin(radian));
    }
    endShape(CLOSE);
  }
}

function getNoiseWithTime(radian, dim, time) {
  let r = radian % TWO_PI;
  return noise(ox + cos(r) * dim, oy + sin(r) * dim, oz + time);
}
