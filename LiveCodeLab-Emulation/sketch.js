let cnv;
let audio_input;
let fft;
const fft_smoothing = 0.8;
const fft_bins = 1024; // Must be between 16 and 1024 and power of 2
let current_color;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  // Note: Cannot do any audio stuff with audio in other browsers due to security restrictions
  // Using Chrome, you can get access to audio devices from localhost, but you have to click in the canvas
  // window in order to allow audio to start running, which is what the line below does
  cnv.mousePressed(userStartAudio);
  audio_input = new p5.AudioIn(errorCallback);
  //Use to see all input sources
  //print(audio_input.getSources());
  //BlackHole happens to be at index 3
  audio_input.setSource(3);
  audio_input.start();
  audio_input.amp(1.0);
  fft = new p5.FFT(fft_smoothing, fft_bins);
  fft.setInput(audio_input);
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  text("tap to start", width / 2, 20);

  audio_in_level = audio_input.getLevel(); // apparently the value returned is the RMS value
  let y = height - audio_in_level * height;
  ellipse(width / 2, y, 10, 10);

  // draw amplitude waveform
  noFill();
  stroke(0, 255, 0);
  let amplitude_array = fft.waveform();
  beginShape();
  for (let sample = 0; sample < amplitude_array.length; sample++) {
    vertex(
      (sample * windowWidth) / amplitude_array.length,
      windowHeight / 2 + amplitude_array[sample] * 100
    );
  }
  endShape();

  // draw fft spectrum
  let spectrum = fft.analyze();
  stroke(255, 0, 0);
  noFill();
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    vertex((i * windowWidth) / spectrum.length, windowHeight / 3 - spectrum[i]);
  }
  endShape();
}

function errorCallback() {
  print("something went wrong!");
}
