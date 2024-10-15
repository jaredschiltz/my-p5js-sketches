// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  //pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(600, 600, WEBGL);
  noStroke();
}

function draw() {  
  // send resolution of sketch into shader
  // This is running on retina monitor, so pixel density is 2, insteadl of one
  // To compensate for this, I have to double resolution, this is done by
  // multiplying the window width and height by factor of 2.0:
  theShader.setUniform('u_resolution', [width*2, height*2]);
  theShader.setUniform('u_time', millis()/1000);

  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

