let loopBeat;
let bassSynth, cymbalSynth;

let amSynth;

let counter = 0;

let audio_init = false;

function setup() {}

/*
function draw() {
  background(220);
}
*/

function song(time) {
  if (counter % 4 === 0) {
    bassSynth.triggerAttackRelease("c1", "4n", time);
  }

  if (counter % 4 !== 1) {
    if (counter === 3 || counter === 12) {
      cymbalSynth.envelope.decay = 0.5;
    } else {
      cymbalSynth.envelope.decay = 0.01;
    }
    cymbalSynth.triggerAttackRelease("32n", time, 0.3);
  }

  if (counter === 0) {
    amSynth.triggerAttackRelease("a4", "4n", time, 0.8);
  }
  counter = (counter + 1) % 4;
}

function mousePressed() {
  if (audio_init == false) {
    amSynth = new Tone.AMSynth().toMaster({
      harmonicity: 1.04,
      detune: 3,
      oscillator: {
        type: "square",
      },
      envelope: {
        attack: 0.001,
        decay: 2,
        sustain: 3,
        release: 1.5,
      },
      modulation: {
        type: "square",
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 1,
        sustain: 0.2,
        release: 1.5,
      },
    });
    cymbalSynth = new Tone.MetalSynth({
      frequency: 500,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 2,
      },
      harmonicity: 3.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 0.5,
    }).toMaster();
    bassSynth = new Tone.MembraneSynth().toMaster();
    loopBeat = new Tone.Loop(song, "4n");
    Tone.Transport.bpm.value = 190;
    Tone.Transport.start();
    loopBeat.start(0);
    //createCanvas(400, 400);
    //loopBeat = new Tone.Synth().toDestination();
    //loopBeat.triggerAttackRelease("C2", "8n");
    audio_init = true;
  }
}
