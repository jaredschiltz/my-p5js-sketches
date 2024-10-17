let snareNoise;
let env;

let snPattern;
let drums;

let bpFilter;

let reverb;

function setup() {}

function draw() {
  background(220);
}

function mousePressed() {
  // Have to use this to load audio, since Chrome
  // won't allow audio to start on load
  reverb = new p5.Reverb();
  bpFilter = new p5.BandPass();
  bpFilter.freq(500);
  bpFilter.res(3);

  snPattern = [1, 0, 0, 0, 1, 0, 1, 0];

  snareNoise = new p5.Noise();
  snareNoise.start();
  snareNoise.disconnect();
  snareNoise.connect(bpFilter);
  reverb.process(bpFilter, 0.5, 1);

  env = new p5.Envelope();
  env.set(0.0001, 5, 0.01, 0.001, 0.1, 0);
  snareNoise.amp(env);
  //createCanvas(400, 400);

  drums = new p5.Part();
  drums.addPhrase(
    "snare drum",
    (time) => {
      env.play(snareNoise, time, 0);
    },
    snPattern
  );
  drums.loop();
}
