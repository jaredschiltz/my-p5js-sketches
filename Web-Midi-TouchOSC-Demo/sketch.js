// Web MIDI documentation is found here:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
// Example for using this: https://webmidi-examples.glitch.me/
//

let midi = null;
let midiIn;
let midiOut;

let background_color;
let red_channel = 255;
let blue_channel = 255;
let green_channel = 255;
let draw_circle = false;

function setup() {
  createCanvas(400, 400);
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

function draw() {
  background_color = color(red_channel, blue_channel, green_channel);
  background(background_color);
  if (draw_circle) {
    fill(0);
    circle(width / 2, height / 2, 40, 40);
  }
}

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midi);
  initDevices(midi);
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    console.log(
      `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`
    );
  }

  for (const entry of midiAccess.outputs) {
    const output = entry[1];
    console.log(
      `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
    );
  }
}

function initDevices(midi) {
  // Reset.
  midiIn = [];
  midiOut = [];

  // MIDI devices that send you data.
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }

  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (
    let output = outputs.next();
    output && !output.done;
    output = outputs.next()
  ) {
    midiOut.push(output.value);
  }
  startListening();
}

// Start listening to MIDI messages.
function startListening() {
  for (const input of midiIn) {
    input.addEventListener("midimessage", midiMessageReceived);
  }
}

function midiMessageReceived(event) {
  // MIDI commands we care about. See
  // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
  const NOTE_ON = 9;
  const NOTE_OFF = 8;
  const CC = 11;

  const cmd = event.data[0] >> 4;
  const channel_number = event.data[0];
  const pitch = event.data[1];
  const velocity = event.data.length > 2 ? event.data[2] : 1;

  // You can use the timestamp to figure out the duration of each note.
  const timestamp = Date.now();

  // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
  if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
    console.log(
      `🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: ${velocity}`
    );

    draw_circle = false;
    // Complete the note!
    /*
    const note = notesOn.get(pitch);
    if (note) {
      console.log(`🎵 pitch:${pitch}, duration:${timestamp - note} ms.`);
      notesOn.delete(pitch);
    }
    */
  } else if (cmd === NOTE_ON) {
    console.log(
      `🎧 from ${event.srcElement.name} note on: pitch:${pitch}, velocity: ${velocity}`
    );
    draw_circle = true;
    // One note can only be on at once.
    //notesOn.set(pitch, timestamp);
  } else if (cmd == CC) {
    let channel_number = event.data[1];
    let cc_value = event.data[2];
    print(`channel: ${channel_number} cc_value: ${cc_value}`);
    if (channel_number == 0) {
      red_channel = map(cc_value, 0, 127, 0, 255);
    }
    if (channel_number == 1) {
      blue_channel = map(cc_value, 0, 127, 0, 255);
    }
    if (channel_number == 2) {
      green_channel = map(cc_value, 0, 127, 0, 255);
    }
  }
}
