// a shader variable
let theShader;
let screen
let img

function preload(){
  // load the shader
  theShader = loadShader('basic.vert', 'basic.frag');
  img = loadImage('vaporwave.jpg');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height)
    // shader() sets the active shader with our shader
  shader(theShader);
}

function draw() {  
  screen.image(img,0,0,600,600)
  
  draw_screen()
  /*
  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, windowHeight]);


  // rect gives us some geometry on the screen
  rect(0,0,windowWidth, height);
  */
}

function draw_screen() {
  theShader.setUniform('texture', screen)
  theShader.setUniform('noise', get_noise_value());
  theShader.setUniform('FrameCount',frameCount);
  theShader.setUniform('OutputSize', [width, height]);
  theShader.setUniform('TextureSize', [width, height]);
  theShader.setUniform('InputSize', [width, height]);
  rect(-width/2,-height/2,width, height)
}

function get_noise_value(){
  let v = noise(millis()/70);
  const cutoff = 0.5
   if (v < cutoff) {
     return 0
   }
  
   v = pow((v - cutoff) * 1 / (1 - cutoff),2);
  return v;
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('glitch', 5);
  }
}
