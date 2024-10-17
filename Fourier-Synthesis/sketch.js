let sineWave;
let frequency = 3;
let phase;
let amplitude;
function setup() {
  createCanvas(400, 400);
  amplitude = height / 4;
  phase = 0;
  sineWave = new Array(width);
  for (let i = 0; i < width; i++) {
    sineWave[i] =
      amplitude * sin((2 * PI * frequency * i) / width + phase) +
      (amplitude / 3.0) * sin((2 * PI * frequency * 3 * i) / width + phase) +
      (amplitude / 5.0) * sin((2 * PI * frequency * 5 * i) / width + phase) +
      (amplitude / 7.0) * sin((2 * PI * frequency * 7 * i) / width + phase);
  }
}

function draw() {
  background(220);
  translate(0, height / 2);
  scale(1, -1);
  stroke(0);
  strokeWeight(2);
  line(0, 0, width, 0);
  strokeWeight(3);
  for (let i = 0; i < width - 1; i++) {
    line(i, sineWave[i], i + 1, sineWave[i + 1]);
  }
}
