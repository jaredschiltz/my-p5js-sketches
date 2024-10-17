let elapsedTime;
let audio_init = false;
function setup() {
  createCanvas(400, 400);
  elapsedTime = 0;
}

function draw() {
  background(220);
  text("audio context clock: " + Tone.now().toFixed(3), 10, 20);
  text("transport clock: " + Tone.Transport.seconds.toFixed(3), 10, 30);
  text("elapsed time: " + elapsedTime.toFixed(3), 10, 40);
  text("BPM: " + (60 / elapsedTime).toFixed(3), 10, 50);
}

function keyPressed() {
  if (audio_init == false) {
    Tone.Transport.start();
    elapsedTime = 0;
    audio_init = true;
  } else {
    elapsedTime = Tone.Transport.seconds;
    Tone.Transport.stop().start();
  }
}
