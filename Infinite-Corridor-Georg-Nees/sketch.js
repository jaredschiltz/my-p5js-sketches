// a shader variable
let theShader;
let screen;
let street_array;

let VELOCITY = 30;
let street_spacing = 150;
let street_width = 500;

let TOP_HEIGHT = 500;
let NUMBER_OF_BOXES = 500;
let MAX_BOX_WIDTH = 100;
let MIN_BOX_WIDTH = 5;
let MAX_BOX_HEIGHT = 100;
let MIN_BOX_HEIGHT = 5;
let MAX_BOX_DEPTH = 100;
let MIN_BOX_DEPTH = 5;

const START_Z_POS = -15000;

let top_boxes;
let left_boxes;
let right_boxes;

function preload() {
  // load the shader
  theShader = loadShader("basic.vert", "basic.frag");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height, WEBGL);
  screen.camera(0, -150, 15000);
  screen.frustum(-0.1, 0.1, 0.1, -0.1, 0.2, -15);
  // shader() sets the active shader with our shader
  shader(theShader);
  street_array = new Array(100);
  for (let i = 0; i < street_array.length; i++) {
    street_array[i] = { zpos: i * street_spacing };
  }
  top_boxes = new Array(NUMBER_OF_BOXES);
  left_boxes = new Array(NUMBER_OF_BOXES);
  right_boxes = new Array(NUMBER_OF_BOXES);
  for (let i = 0; i < top_boxes.length; i++) {
    let random_width = random(MIN_BOX_WIDTH, MAX_BOX_WIDTH);
    top_boxes[i] = new Boxes(
      random(-street_width, street_width - random_width),
      random(-TOP_HEIGHT, -TOP_HEIGHT - 200),
      random(START_Z_POS, 15000),
      random_width,
      random(MIN_BOX_HEIGHT, MAX_BOX_HEIGHT),
      random(MIN_BOX_DEPTH, MAX_BOX_DEPTH),
      VELOCITY
    );
    let random_height = random(5, 50);
    left_boxes[i] = new Boxes(
      -street_width,
      random(0, -TOP_HEIGHT + 150 + random_height),
      random(START_Z_POS, 15000),
      0,
      random_height,
      random(5, 300),
      VELOCITY
    );
        random_height = random(5, 50);
    right_boxes[i] = new Boxes(
      street_width,
      random(0, -TOP_HEIGHT + 150 + random_height),
      random(START_Z_POS, 15000),
      0,
      random_height,
      random(5, 300),
      VELOCITY
    );
  }
}

function draw() {
  screen.background(0);
  screen.fill(255)
  screen.box(500,1000,0)
  screen.noFill();
  screen.stroke(255);
  screen.strokeWeight(3);

  //screen.rotateY(frameRate()/1000)
  for (let i = 0; i < street_array.length; i++) {
    screen.push();
    screen.translate(0, 0, street_array[i].zpos);
    if (street_array[i].zpos >= 15000) {
      street_array[i].zpos = 0;
    }
    street_array[i].zpos += VELOCITY;
    screen.box(street_width, 0, street_spacing);
    screen.pop();
    screen.line(0, 0, 0, 0, 0, 15000);
    screen.line(-street_width / 4, 0, 0, -street_width / 4, 0, 15000);
    screen.line(street_width / 4, 0, 0, street_width / 4, 0, 15000);
  }
  for (let i = 0; i < top_boxes.length; i++) {
    screen.push();
    screen.translate(
      top_boxes[i].pos.x,
      top_boxes[i].pos.y,
      top_boxes[i].pos.z
    );
    screen.box(top_boxes[i].dim.x, top_boxes[i].dim.y, top_boxes[i].dim.z);
    top_boxes[i].update();
    if (top_boxes[i].pos.z >= 15000) {
      top_boxes[i].pos.z = START_Z_POS;
    }
    screen.pop();
  }
  for (let i = 0; i < left_boxes.length; i++) {
    screen.push();
    screen.translate(
      left_boxes[i].pos.x,
      left_boxes[i].pos.y,
      left_boxes[i].pos.z
    );
    screen.box(left_boxes[i].dim.x, left_boxes[i].dim.y, left_boxes[i].dim.z);
    left_boxes[i].update();
    if (left_boxes[i].pos.z >= 15000) {
      left_boxes[i].pos.z = START_Z_POS;
    }
    screen.pop();
  }
  
    for (let i = 0; i < right_boxes.length; i++) {
    screen.push();
    screen.translate(
      right_boxes[i].pos.x,
      right_boxes[i].pos.y,
      right_boxes[i].pos.z
    );
    screen.box(right_boxes[i].dim.x, right_boxes[i].dim.y, right_boxes[i].dim.z);
    right_boxes[i].update();
    if (right_boxes[i].pos.z >= 15000) {
      right_boxes[i].pos.z = START_Z_POS;
    }
    screen.pop();
  }
  draw_screen();
  /*
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, windowHeight]);


  // rect gives us some geometry on the screen
  rect(0,0,windowWidth, height);
  */
}

function draw_screen() {
  theShader.setUniform("texture", screen);
  theShader.setUniform("noise", get_noise_value());
  theShader.setUniform("FrameCount", frameCount);
  theShader.setUniform("OutputSize", [width, height]);
  theShader.setUniform("TextureSize", [width, height]);
  theShader.setUniform("InputSize", [width, height]);
  rect(-width / 2, -height / 2, width, height);
}

function get_noise_value() {
  let v = noise(millis() / 70);
  const cutoff = 0.5;
  if (v < cutoff) {
    return 0;
  }

  v = pow(((v - cutoff) * 1) / (1 - cutoff), 2);
  return v;
}

function keyPressed() {
  // this will download the first 10 seconds of the animation!
  if (key === "s") {
    saveGif("infinite_corridor", 10);
  }
}
