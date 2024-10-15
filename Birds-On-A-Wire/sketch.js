"use strict";
let num_birds_per_line = 24; // 4 bird spaces + 16 birds + 4 bird spaces
let num_of_lines = 5;
let line_spacing;
let wire_start_position;
let bird_size;
let bird_start_position;

let bird_array = new Array(num_of_lines);

// Part and phrases work together. Attach phrase to the part,
// which will serve as our transport to drive the phrase
let drums; // Part.
let hh_open_phrase;
let hh_phrase;
let bd_phrase;
let sd_phrase;
let rim_phrase;
let dummy_phrase;

let hh;
let hh_open;
let bd;
let sd;
let rim;
let step_count = 15;
let color_array;
let dummy_pattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function preload() {
  // Can't do this. Chrome security now makes it so audio can't load
  // on load. Have to have some user interaction (e.g. mouse click) before
  // we can do audio stuff
  /*
  hh_open = loadSound("HH_OPEN.mp3", () => {});
  hh = loadSound("HH.mp3", () => {});
  bd = loadSound("BD.mp3", () => {});
  sd = loadSound("SD.mp3", () => {});
  rim = loadSound("RIM.mp3", () => {});
  */
}

function setup() {
  createCanvas(852, 615);
  bird_size = width / num_birds_per_line;
  bird_start_position = 4 * bird_size; // start 4 bird spaces in
  line_spacing = bird_size * 2;
  wire_start_position =
    (height - (num_of_lines * line_spacing - line_spacing / 2.0)) / 2.0;

  // Create Music Grid 5 line x 16 notes per line
  for (let line = 0; line < 5; line += 1) {
    bird_array[line] = new Array(16);
  }

  // Initialize array to all zeros
  for (let line = 0; line < 5; line++) {
    for (let note = 0; note < 16; note++) {
      bird_array[line][note] = { note: 0, bird_object: undefined };
    }
  }
  // Make sequence
  bird_array[0][2] = { note: 1, bird_object: undefined };
  bird_array[0][6] = { note: 1, bird_object: undefined };
  bird_array[0][10] = { note: 1, bird_object: undefined };
  bird_array[0][14] = { note: 1, bird_object: undefined };
  for (let note = 0; note < 16; note += 1) {
    bird_array[1][note] = { note: 1, bird_object: undefined };
  }
  bird_array[2][4] = { note: 1, bird_object: undefined };
  bird_array[2][12] = { note: 1, bird_object: undefined };
  bird_array[3][14] = { note: 1, bird_object: undefined };
  bird_array[4][0] = { note: 1, bird_object: undefined };
  bird_array[4][4] = { note: 1, bird_object: undefined };
  bird_array[4][8] = { note: 1, bird_object: undefined };
  bird_array[4][12] = { note: 1, bird_object: undefined };

  bird_array = BirdFactory.return_bird(
    bird_array,
    bird_size,
    bird_start_position,
    wire_start_position,
    line_spacing,
    color(0, 0, 0)
  );

  color_array = new Array(7);
  // Load color_array
  color_array[0] = color(255, 0, 0); // Red
  color_array[1] = color(255, 127, 0); // Orange
  color_array[2] = color(255, 255, 0); // Yellow
  color_array[3] = color(0, 255, 0); // Green
  color_array[4] = color(0, 0, 255); // Blue
  color_array[5] = color(75, 0, 130); // Indigo
  color_array[6] = color(148, 0, 211); // Violet
}

function get_pattern(array_line) {
  let pattern = new Array(array_line.length);
  for (let i = 0; i < array_line.length; i++) {
    pattern[i] = array_line[i].note;
  }
  return pattern;
}

function mouseClicked() {
  print("click");
  hh_open = loadSound("HH_OPEN.mp3", () => {});
  hh = loadSound("HH.mp3", () => {});
  bd = loadSound("BD.mp3", () => {});
  sd = loadSound("SD.mp3", () => {});
  rim = loadSound("RIM.mp3", () => {});
  dummy_phrase = new p5.Phrase(
    "dummy",
    (time) => {
      step_count = (step_count + 1) % 16;
    },
    dummy_pattern
  );

  hh_open_phrase = new p5.Phrase(
    "hh_open",
    (time) => {
      hh_open.play(time);
    },
    get_pattern(bird_array[0])
  );
  hh_phrase = new p5.Phrase(
    "hh",
    (time) => {
      hh.play(time);
    },
    get_pattern(bird_array[1])
  );

  sd_phrase = new p5.Phrase(
    "sd",
    (time) => {
      sd.play(time);
    },
    get_pattern(bird_array[2])
  );

  rim_phrase = new p5.Phrase(
    "rim",
    (time) => {
      rim.play(time);
    },
    get_pattern(bird_array[3])
  );

  bd_phrase = new p5.Phrase(
    "bd",
    (time) => {
      bd.play(time);
    },
    get_pattern(bird_array[4])
  );

  drums = new p5.Part();
  drums.addPhrase(hh_open_phrase);
  drums.addPhrase(hh_phrase);
  drums.addPhrase(sd_phrase);
  drums.addPhrase(rim_phrase);
  drums.addPhrase(bd_phrase);
  drums.addPhrase(dummy_phrase);
  setBPM(60);
  drums.loop();
}

function draw() {
  background(200);

  // Draw cell boxes

  //noFill();
  //stroke(255, 0, 0);
  //strokeWeight(0.5);
  //for (let rows = 0; rows < num_of_lines; rows++) {
  //   for (let i = 0; i < num_birds_per_line; i++) {
  //    rect(i * bird_size, rows * line_spacing + wire_start_position, bird_size, //bird_size);
  //   }
  // }

  // Draw wire

  for (let rows = 0; rows < num_of_lines; rows++) {
    stroke(0);
    strokeWeight(2);

    line(
      0,
      (47 / 80) * bird_size + line_spacing * rows + wire_start_position,
      width,
      (47 / 80) * bird_size + line_spacing * rows + wire_start_position
    );
  }

  for (let row = 0; row < bird_array.length; row++) {
    for (let col = 0; col < bird_array[0].length; col++) {
      if (bird_array[row][col].note == 1) {
        if (step_count == col) {
          bird_array[row][col].bird_object.set_colour(color(color_array[row]));
        } else {
          bird_array[row][col].bird_object.set_colour(color(0, 0, 0));
        }
        //only draw note if it exists
        bird_array[row][col].bird_object.draw();
      }
    }
  }
}
