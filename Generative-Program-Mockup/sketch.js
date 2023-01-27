let card_texture;
let drop_shadow;
let heavy_font;

let random_color;
let random_color_alpha = 170;

const card_x = 269;
const card_y = 18;
const card_width = 853;
const card_height = 594;

const border_height_percentage = 0.25; // This is how thick border strip should be w.r.t. to card height
const top_border_x = card_x;
const top_border_y = card_y;
const top_border_width = card_width;
const top_border_height = card_height * border_height_percentage;
const bottom_border_x = card_x;
const bottom_border_y = card_y + top_border_height * 3.0;
const bottom_border_width = card_width;
const bottom_border_height = top_border_height;

let noun_strings;
let adjective_strings;
let title;

let flip_sound;
let click_sound;

let selector_manager;

function preload() {
  card_texture = loadImage("card-texture.png");
  drop_shadow = loadImage("drop-shadow.png");
  heavy_font = loadFont("SFMOMADisplay-Heavy.ttf");
  noun_strings = loadStrings("nounlist.txt");
  adjective_strings = loadStrings("adjectivelist.txt");
  flip_sound = loadSound("flip-card.mp3");
  click_sound = loadSound("button-click.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  title = get_title();
  random_color = color(
    random(0, 255),
    random(0, 255),
    random(0, 255),
    random_color_alpha
  );

  let selector_max_width = 220;
  let selector_height = 50;
  let selector_color = (0, 0, 0);
  let selector_font_color_selected = color(255, 255, 255);
  let selector_font_color_unselected = color(50, 50, 50);
  let selector_radio_button_color = color(255, 255, 255);
  let num_selections = 5;

  selector_manager = new SelectorManager(
    card_y,
    card_height,
    selector_max_width, // Button width will go from 0 to max_width
    selector_height,
    selector_color,
    heavy_font,
    selector_font_color_selected,
    selector_font_color_unselected,
    selector_radio_button_color,
    num_selections
  );
}

function draw() {
  background(20);
  image(card_texture, card_x, card_y, card_width, card_height);

  noStroke();
  fill(random_color);
  rectMode(CORNER);
  rect(top_border_x, top_border_y, top_border_width, top_border_height);
  rect(
    bottom_border_x,
    bottom_border_y,
    bottom_border_width,
    bottom_border_height
  );

  draw_frame(color(255, 255, 255));
  noStroke();
  image(drop_shadow, card_x, card_y, card_width, card_height + 18);

  fill(0, 0, 0, 255);
  textFont(heavy_font);
  textSize(50);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  text(title, card_x + card_width / 2, card_y + card_height / 2 - 10);

  let selector_array = selector_manager.get_selector_array();
  for (let s of selector_array) {
    s.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  if (mouseX > 269) {
    title = get_title();
    flip_sound.play();
    random_color = color(
      random(0, 255),
      random(0, 255),
      random(0, 255),
      random_color_alpha
    );
  }
  let selector_array = selector_manager.get_selector_array();
  for (let i = 0; i < 5; i++) {
    if (
      selector_array[i].get_mouse_over(createVector(mouseX, mouseY)) == true
    ) {
      click_sound.play();
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

  /*
  for (let i = 0; i < num_selections; i++) {
    selector_array[i].get_mouse_over(createVector(mouseX, mouseY));
  }
  */
}

function get_title() {
  let adjective = get_adjective();
  let noun = get_noun();
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
  scale(6, 6);
  strokeJoin(ROUND);
  stroke("rgba(0,0,0,0)");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill(frame_color);
  beginShape();
  vertex(87.48, 108);
  vertex(0, 108);
  vertex(0, 0);
  vertex(87.48, 0);
  vertex(87.48, 3.065);
  vertex(50.959, 3.065);
  bezierVertex(47.617, 3.065, 44.904, 5.778, 44.904, 9.12);
  vertex(44.904, 98.88);
  bezierVertex(44.904, 102.222, 47.617, 104.935, 50.959, 104.935);
  vertex(87.48, 104.935);
  vertex(87.48, 108);
  endShape();
  beginShape();
  vertex(87.48, 0);
  vertex(192, 0);
  vertex(192, 108);
  vertex(87.48, 108);
  vertex(87.48, 104.935);
  vertex(180.821, 104.935);
  bezierVertex(184.162, 104.935, 186.876, 102.222, 186.876, 98.88);
  vertex(186.876, 9.12);
  bezierVertex(186.876, 5.778, 184.162, 3.065, 180.821, 3.065);
  vertex(87.48, 3.065);
  vertex(87.48, 0);
  endShape();
  pop();
}
