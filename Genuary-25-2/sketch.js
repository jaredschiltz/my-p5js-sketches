/*
Genuary 2025 - January 2nd Prompt: Layers upon layers upon layers
*/

const WIDTH_HEIGHT = 800;
const NUMBER_LAYER_ONE_IMAGES = 11;
const NUMBER_LAYER_TWO_IMAGES = 5;
const NUMBER_LAYER_THREE_IMAGES = 14;

let layer_1_array = [];
let layer_2_array = [];
let layer_3_array = [];

function preload() {
  for (i = 0; i < NUMBER_LAYER_ONE_IMAGES; i++) {
    layer_1_array.push(
      loadImage(`./Assets/layer1_${String(i + 1).padStart(2, "0")}.png`)
    );
  }
  for (i = 0; i < NUMBER_LAYER_TWO_IMAGES; i++) {
    layer_2_array.push(
      loadImage(`./Assets/layer2_${String(i + 1).padStart(2, "0")}.png`)
    );
  }
  for (i = 0; i < NUMBER_LAYER_THREE_IMAGES; i++) {
    layer_3_array.push(
      loadImage(`./Assets/layer3_${String(i + 1).padStart(2, "0")}.png`)
    );
  }
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function mousePressed() {
  draw();
}

function draw() {
  background(255);
  background(255, 0, 255);
  const NUMBER_OF_CLOUDS = 20;
  const NUMBER_OF_PAPER_SCRAPS = 50;
  const NUMBER_OF_STREET_OBJECTS = 25;

  // Generate Cloud Layer (Layer 1)
  for (let i = 0; i < NUMBER_OF_CLOUDS; i++) {
    push();
    translate(random(0, width), random(0, height / 4));
    rotate(random(-PI, PI));
    let image_one_selected = floor(random(NUMBER_LAYER_ONE_IMAGES));
    scale(0.6);
    image(
      layer_1_array[image_one_selected],
      -layer_1_array[image_one_selected].width / 2,
      -layer_1_array[image_one_selected].height / 2
    );
    pop();
  }
  // Generate Scrapes Of Paper Layer (Layer 2)
  for (let i = 0; i < NUMBER_OF_PAPER_SCRAPS; i++) {
    push();
    translate(random(0, width), random(height / 2, height));
    rotate(random(-PI, PI));
    let image_two_selected = floor(random(NUMBER_LAYER_TWO_IMAGES));
    scale(1);
    image(
      layer_2_array[image_two_selected],
      -layer_2_array[image_two_selected].width / 2,
      -layer_2_array[image_two_selected].height / 2
    );
    pop();
  }

  // Generate Street Layer (Layer 3)
  for (let i = 0; i < NUMBER_OF_STREET_OBJECTS; i++) {
    push();
    translate(random(0, width), random(height / 2, height));
    //rotate(random(-PI, PI));
    let image_three_selected = floor(random(NUMBER_LAYER_THREE_IMAGES));
    scale(0.8);
    image(
      layer_3_array[image_three_selected],
      -layer_3_array[image_three_selected].width / 2,
      -layer_3_array[image_three_selected].height / 2
    );
    pop();
  }

  noFill();
  noStroke();
  fill(0);
  textSize(12);
  textFont("Playwrite CU");
  text(">> 25.2", 25, 20);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
