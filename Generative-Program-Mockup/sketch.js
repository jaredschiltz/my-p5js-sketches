let card_texture;
let heavy_font;

const APP_WIDTH = 1152;
const APP_HEIGHT = 648;
// Taken from picotron color palette
// https://lospec.com/palette-list/picotron-wip-v3
const COLOR_PALETTE = [
  "#000000",
  "#1d2b53",
  "#7e2553",
  "#008751",
  "#ab5236",
  "#5f574f",
  "#c2c3c7",
  "#fff1e8",
  "#ff004d",
  "#ffa300",
  "#ffec27",
  "#00e436",
  "#29adff",
  "#83769c",
  "#ff77a8",
  "#ffccaa",
  "#672d8a",
  "#0a62be",
  "#422136",
  "#125359",
  "#742f29",
  "#d48e6f",
  "#a28879",
  "#fff57d",
  "#be1226",
  "#ff6c24",
  "#a8f12e",
  "#00b251",
  "#83ebf5",
  "#bd9adf",
  "#b937b8",
  "#ffacc5",
];

const CARD_DIMENSIONS = {
  CARD_X: 257,
  CARD_Y: 18,
  CARD_WIDTH: 852,
  CARD_HEIGHT: 615,
};

const border_height_percentage = 0.25; // This is how thick border strip should be w.r.t. to card height
let border1;

let noun_strings;
let adjective_strings;
let title;

let flip_sound_player;
let click_sound_player;

let selector_manager;

function preload() {
  card_texture = loadImage("card-texture.png");
  heavy_font = loadFont("./Assets/Fonts/SFMOMADisplay-Heavy.ttf");
  noun_strings = loadStrings("./Assets/Word-Lists/nounlist.txt");
  adjective_strings = loadStrings("./Assets/Word-Lists/adjectivelist.txt");
  flip_sound_player = new Tone.Player("flip-card.mp3").toDestination();
  click_sound_player = new Tone.Player("button-click.mp3").toDestination();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  title = get_title();

  let selector_max_width = 220;
  let selector_height = 50;
  let selector_color = (0, 0, 0);
  let selector_font_color_selected = color(255, 255, 255);
  let selector_font_color_unselected = color(50, 50, 50);
  let selector_radio_button_color = color(255, 255, 255);
  let num_selections = 5;

  selector_manager = new SelectorManager(
    CARD_DIMENSIONS.CARD_Y,
    CARD_DIMENSIONS.CARD_HEIGHT,
    selector_max_width, // Button width will go from 0 to max_width
    selector_height,
    selector_color,
    heavy_font,
    selector_font_color_selected,
    selector_font_color_unselected,
    selector_radio_button_color,
    num_selections
  );
  /*
  // create a new midi file
  let midi = new Midi();
  // add a track
  const track = midi.addTrack();
  track
    .addNote({
      midi: 60,
      time: 0,
      duration: 0.2,
    })
    .addNote({
      name: "C5",
      time: 0.3,
      duration: 0.1,
    })
    .addCC({
      number: 64,
      value: 127,
      time: 0.2,
    });
  let midi_bytes = midi.toArray();
  let midi_hex = bufferToHex(midi_bytes); // This makes ASCII hex string
  let binary_string = "";
  for (let i = 0; i < midi_hex.length; i += 2) {
    let hex = midi_hex[i] + midi_hex[i + 1];

    let charCode = parseInt(hex, 16);
    binary_string += String.fromCharCode(charCode);
  }

  let my_uint8_array = Uint8Array.from(binary_string, (c) => c.charCodeAt(0));
  let blob = new Blob([my_uint8_array], { type: "application/octet-stream" });

  downloadFile(blob, "shit.mid");
  */
  border1 = new RectangleBorder(
    CARD_DIMENSIONS,
    border_height_percentage,
    COLOR_PALETTE
  );
}

function draw() {
  background(20);
  /*
  fill(0, 255, 0);
  rectMode(CORNER);
  rect(0, 0, APP_WIDTH, APP_HEIGHT);
  */
  image(
    card_texture,
    CARD_DIMENSIONS.CARD_X,
    CARD_DIMENSIONS.CARD_Y,
    CARD_DIMENSIONS.CARD_WIDTH,
    CARD_DIMENSIONS.CARD_HEIGHT
  );

  border1.draw();
  draw_frame(color(215, 215, 215));

  // Draw Text
  fill(0, 0, 0, 255);
  textFont(heavy_font);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(
    title,
    CARD_DIMENSIONS.CARD_X + CARD_DIMENSIONS.CARD_WIDTH / 2,
    CARD_DIMENSIONS.CARD_Y + CARD_DIMENSIONS.CARD_HEIGHT / 2 - 10 // Have to add this offset to get text to center
  );

  let selector_array = selector_manager.get_selector_array();
  for (let s of selector_array) {
    s.draw();
  }

  rectMode(CENTER);
  noFill();
  stroke(0, 0, 0);
  strokeWeight(8);
  rect(
    CARD_DIMENSIONS.CARD_X + CARD_DIMENSIONS.CARD_WIDTH / 2,
    CARD_DIMENSIONS.CARD_Y + CARD_DIMENSIONS.CARD_HEIGHT / 2,
    CARD_DIMENSIONS.CARD_WIDTH,
    CARD_DIMENSIONS.CARD_HEIGHT,
    40
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  if (mouseX > CARD_DIMENSIONS.CARD_X) {
    title = get_title();
    flip_sound_player.start();
    border1 = new RectangleBorder(
      CARD_DIMENSIONS,
      border_height_percentage,
      COLOR_PALETTE
    );
  }
  let selector_array = selector_manager.get_selector_array();
  for (let i = 0; i < 5; i++) {
    if (
      selector_array[i].get_mouse_over(createVector(mouseX, mouseY)) == true
    ) {
      click_sound_player.start();
      selector_manager.set_current_selection(i);
    }
  }
}

function mouseMoved() {
  let selector_array = selector_manager.get_selector_array();
  let detected_mouse_in_selector = false;
  for (let i = 0; i < 5; i++) {
    if (
      selector_array[i].get_mouse_over(createVector(mouseX, mouseY)) == true
    ) {
      selector_manager.set_next_selection(i);
      detected_mouse_in_selector = true;
    }
  }

  if (detected_mouse_in_selector == false) {
    selector_manager.clear_next_selection();
  }
}

function get_title() {
  let adjective = get_adjective();
  let noun = get_noun();
  // Capitalize the first letter of every word
  let title =
    adjective.charAt(0).toUpperCase() +
    adjective.slice(1) +
    " " +
    noun.charAt(0).toUpperCase() +
    noun.slice(1);
  return title;
}

function get_noun() {
  return noun_strings[floor(random(0, noun_strings.length))];
}

function get_adjective() {
  return adjective_strings[floor(random(0, adjective_strings.length))];
}

function draw_frame(frame_color) {
  push();
  strokeJoin(ROUND);
  // Have to scale SVG for because p5js svg converter
  // webapp wants to use different window size?
  scale(APP_WIDTH / 1280, APP_HEIGHT / 720);
  stroke("rgba(0,0,0,0)");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill(frame_color);
  beginShape();
  vertex(351.335, 720);
  vertex(0, 720);
  vertex(0, 0);
  vertex(351.335, 0);
  vertex(351.335, 20.433);
  vertex(325.729, 20.433);
  bezierVertex(303.449, 20.433, 285.362, 38.521, 285.362, 60.8);
  vertex(285.362, 659.2);
  bezierVertex(285.362, 681.479, 303.449, 699.567, 325.729, 699.567);
  vertex(351.335, 699.567);
  vertex(351.335, 720);
  endShape();
  beginShape();
  vertex(286.724, 0);
  vertex(1280, 0);
  vertex(1280, 720);
  vertex(286.72400000000005, 720);
  vertex(286.72400000000005, 669.629);
  bezierVertex(
    291.326,
    686.86,
    307.05500000000006,
    699.567,
    325.72900000000004,
    699.567
  );
  vertex(1191.47, 699.567);
  bezierVertex(1213.749, 699.567, 1231.837, 681.479, 1231.837, 659.2);
  vertex(1231.837, 60.80000000000007);
  bezierVertex(
    1231.837,
    38.52100000000007,
    1213.749,
    20.43300000000007,
    1191.47,
    20.43300000000007
  );
  vertex(325.72900000000004, 20.43300000000007);
  bezierVertex(
    307.05500000000006,
    20.43300000000007,
    291.326,
    33.14000000000007,
    286.72400000000005,
    50.371000000000066
  );
  vertex(286.72400000000005, 6.394884621840902e-14);
  endShape();
  pop();
}

function bufferToHex(buffer) {
  var s = "",
    h = "0123456789ABCDEF";
  new Uint8Array(buffer).forEach((v) => {
    s += h[v >> 4] + h[v & 15];
  });
  return s;
}
