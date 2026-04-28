// a shader variable
let theShader;
let screen;

const START_Z_POS = -15000;

function preload() {
  // load the shader
  theShader = loadShader("basic.vert", "basic.frag");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  screen = createGraphics(width, height, WEBGL);
  screen.camera(0, 25, 350);
  screen.frustum(-0.1, 0.1, 0.1, -0.1, 0.2, -15);
  // shader() sets the active shader with our shader
  shader(theShader);
}

function draw() {
  screen.background(0);
  //screen.fill(0, 255, 0, 20);
  screen.noFill();
  screen.strokeWeight(3);
  screen.push();
  screen.stroke(0, 255, 0);
  screen.rotateX(PI);
  screen.translate(0, 100, 0);
  screen.rotateY(frameCount / 20);
  screen.cone(100, 100, 14);
  screen.pop();
  screen.push();
  screen.stroke(0, 255, 0);
  screen.rotateY(frameCount / 100);
  screen.sphere(40, 10, 10);
  screen.pop();
  screen.push();
  screen.translate(0, 100, 0);
  screen.stroke(0, 255, 0);
  screen.rotateY(frameCount / 20);
  screen.cone(100, 100, 14);
  screen.pop();

  /*
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, windowHeight]);


  // rect gives us some geometry on the screen
  rect(0,0,windowWidth, height);
  */
  draw_screen();
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
    saveGif("accidental_op_illusion", 10);
  }
}
