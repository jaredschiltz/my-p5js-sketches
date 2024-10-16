let osc;
let frequency;
let waveformArray;
let amplitude = 20;
let start_audio = false;

function setup() {
  createCanvas(400, 400);
  waveformArray = new Array(width);
  for (let i = 0; i < waveformArray.length; i++) {
    waveformArray[i] = 0;
  }
}

function mousePressed() {
  osc = new p5.Oscillator("sine");
  osc.start();
  start_audio = true;
}

function draw() {
  background(220);
  strokeWeight(3);
  frequency = height - mouseY;
  for (let i = 0; i < waveformArray.length; i++) {
    waveformArray[i] = sin(
      (((2 * PI * frequency) / 20) * i) / waveformArray.length
    );
  }
  line(30, 30, 30, (height * 3) / 4);
  line(30, (height * 3) / 4, width - 30, (height * 3) / 4);
  fill(0);
  triangle(30, 30, 25, 40, 35, 40);
  triangle(
    width - 30,
    (height * 3) / 4,
    width - 40,
    (height * 3) / 4 + 5,
    width - 40,
    (height * 3) / 4 + -5
  );
  textSize(30);
  text("Frequency", 50, 40);
  text("Volume", width - 150, (height * 3) / 4 - 15);
  translate(0, height - 2 * amplitude);
  for (let i = 1; i < waveformArray.length; i++) {
    line(
      i,
      waveformArray[i] * amplitude,
      i - 1,
      waveformArray[i - 1] * amplitude
    );
  }
  if (start_audio === true) {
    osc.freq(frequency, 0.1);
    osc.amp(map(mouseX, 0, width, 0, 1), 0.1);
  }
}
