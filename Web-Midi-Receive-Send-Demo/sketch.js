// Web MIDI documentation is found here:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API
// Example for using this: https://webmidi-examples.glitch.me/
//
// This works with the builtin Mac IAC Driver
// In order to get this to work, I had to go into Audio MIDI Setup
// Name the IAC Driver device with a name and
// click on 'Device is Online' box to get it to show up
// Works with Ableton when the IAC MIDI device inputs and output are enabled

let midi = null;
let midiIn;
let midiOut;

function setup() {
  createCanvas(400, 400);
  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  setInterval(sendMidiMessage, 500);
}

function draw() {
  background(220);
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

    // One note can only be on at once.
    //notesOn.set(pitch, timestamp);
  } else if (cmd == CC) {
    let channel_number = event.data[1];
    let cc_value = event.data[2];
  }
}

function sendMidiMessage() {
  console.log("MIDI message sent");
  let pitch = floor(random(20, 70));
  let velocity = 100;
  let duration = 10; //ms

  const NOTE_ON = 0x90;
  const NOTE_OFF = 0x80;

  const device = midiOut[1]; // This happens to be IAC output device
  console.log(device);
  const msgOn = [NOTE_ON, pitch, velocity];
  const msgOff = [NOTE_ON, pitch, velocity];

  // First send the note on;
  device.send(msgOn);

  // Then send the note off. You can send this separately if you want
  // (i.e. when the button is released)
  device.send(msgOff, Date.now() + duration);
}
