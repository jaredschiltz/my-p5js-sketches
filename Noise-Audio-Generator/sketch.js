let myNoiseObject = new p5.Noise();
let chooseNoise, setVolume, toggleOnOff;
let fft;

function setup() {
  createCanvas(600, 400);
  noStroke();

  toggleOnOff = createButton('play');
  toggleOnOff.position(10, 10).style('font-family', 'courier');
  toggleOnOff.mousePressed(() => {
    if (myNoiseObject.started) {
      myNoiseObject.stop();
      toggleOnOff.html('play');
    } else {
      myNoiseObject.start();
      toggleOnOff.html('stop');
    }
  });

  myNoiseObject.amp(0);
  myNoiseObject.setType('white');

  chooseNoise = createSelect();
  chooseNoise.position(60, 10).style('font-family', 'courier');;
  chooseNoise.option('white');
  chooseNoise.option('pink');
  chooseNoise.option('brown');
  chooseNoise.changed(() => {
    myNoiseObject.setType(chooseNoise.value());
    fill(chooseNoise.value());
  });
  setVolume = createSlider(-60, 0, -60, 1); //-60dB -> 0dB
  setVolume.position(130, 10).style('font-family', 'courier');;
  setVolume.input(() => {
    if (setVolume.value() > -56) {
      myNoiseObject.amp(pow(10, setVolume.value() / 20), 0.01); //add 0.01 slew
    } else {
      myNoiseObject.amp(map(setVolume.value(), -60, -50, 0, 0.0016), 0.1);
      //linearize down to zero
    }
  });

  fft = new p5.FFT();
}

function draw() {
  background(80);
  let spectrum = fft.analyze();
  beginShape();
  vertex(0, height);
  for (let i = 0; i < spectrum.length; ++i) {
    vertex(map(log(i), 0, log(spectrum.length), 0, width), map(spectrum[i], 0, 255, height, 0));
  }
  vertex(width, height);
  endShape();
}

function touchStarted() {
  if (getAudioContext().state != 'running') {
    getAudioContext().resume(); //allows audio to start playing when page is loaded
  }
}