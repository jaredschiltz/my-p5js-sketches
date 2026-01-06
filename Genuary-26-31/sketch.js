/*
Genuary 2026 - January 31st: GLSL Day. Create an artwork using only shaders
*/
const WIDTH_HEIGHT = 800;
const BORDER_SIZE_PERCENTAGE = 0.9;
let border_size;
let start_pos;
let google_font;
let background_color;
let foreground_color;

let shader_program;

function preload() {
  google_font = loadFont("PlaywriteCU-Regular.ttf");
  shader_program = loadShader("shader.vert", "shader.frag");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT, WEBGL);
  foreground_color = color("#ffc917");
  background_color = color("#000000");

  border_size = WIDTH_HEIGHT * BORDER_SIZE_PERCENTAGE;
  start_pos = (WIDTH_HEIGHT - border_size) / 2;
  pixelDensity(1);
}

function draw() {
  shader(shader_program);
  shader_program.setUniform("u_time", millis() / 1000.0);
  shader_program.setUniform("u_resolution", [width, height]);
  shader_program.setUniform("u_mouse", [mouseX, mouseY]);

  rect(-width / 2, -height / 2, width, height);

  //background(background_color);
  // Draw Border
  // noFill();
  // stroke(foregroundWIDTH_HEIGHT);
  // rect(start_pos, start_pos, border_size, border_size);

  /*
  noStroke();
  fill(background_color);
  rect(0, 0, start_pos, WIDTH_HEIGHT);
  rect(0, 0, WIDTH_HEIGHT, start_pos);
  rect(WIDTH_HEIGHT - start_pos, 0, start_pos, WIDTH_HEIGHT);
  rect(start_pos, WIDTH_HEIGHT - start_pos, WIDTH_HEIGHT, start_pos);

  // Draw Text
  noStroke();
  fill(foreground_color);
  textSize(12);
  textFont(google_font);
  text(">> 26.1", start_pos, WIDTH_HEIGHT - 15);
  */
}

function windowResized() {
  resizeCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
