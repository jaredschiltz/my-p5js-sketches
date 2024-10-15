// a shader variable
let theShader;
let screen

function preload(){
  // load the shader
  theShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height)
    // shader() sets the active shader with our shader
  shader(theShader);
}

function draw() {  
  screen.background(0)
  screen.stroke(255)
  screen.noFill()
  screen.strokeWeight(5);
  screen.ellipse(width/2 + 80,height/2,300,300)
  screen.ellipse(width/2 - 80,height/2,300,300)
    screen.ellipse(width/2,height/2 - 40,40,40)
   screen.ellipse(width/2 + 160,height/2 - 40,40,40)
  screen.ellipse(width/2 -  160,height/2 - 40,40,40)
  
  screen.bezier(width/2 - 180, height/2 + 40, width/2, 500, width/2,200,width/2 + 180, height/2 + 70);

  
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
