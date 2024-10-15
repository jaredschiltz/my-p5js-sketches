// Basile Pesin
// http://vertmo.github.io

// MetaBalls : p5.js implementation

const num_blobs = 10;
let blobs = [];
let blobs_positions = [];
let theShader;

function preload() {
  // load the shader
  theShader = loadShader("basic.vert", "basic.frag");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  //colorMode(HSB);
  for (i = 0; i < num_blobs; i++) {
    blobs.push(new Blob(random(0, width), random(0, height)));
  }
  for (i = 0; i < num_blobs; i++) {
    blobs_positions.push(blobs[i].get_position()[0]);
    blobs_positions.push(blobs[i].get_position()[1]);
  }
  shader(theShader);
}

function draw() {
  // send resolution of sketch into shader
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis());
  theShader.setUniform("u_mouse", [mouseX, mouseY]);
  theShader.setUniform("u_blob_position", blobs[0].get_position());
  theShader.setUniform("u_blob_position_array", blobs_positions);
  rect(0, 0, width, height);

  /*
  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += blobs[i].r / d;
      }
      set(x, y, color(20* sum, 255, 255));
    }
  }
  updatePixels();
  */

  for (i = 0; i < blobs.length; i++) {
    // blobs[i].show()
    blobs[i].update();
    blobs_positions[i] = blobs[i].get_position()[0];
    blobs_positions[i + 1] = blobs[i].get_position()[1];
  }
}
