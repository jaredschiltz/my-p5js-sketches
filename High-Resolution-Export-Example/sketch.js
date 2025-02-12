const WIDTH_HEIGHT = 800;
const output_scale_factor = 20;
let current_scale_factor = 1;
let my_scaled_canvas;

// Exports a high-resolution image when 'e' key is pressed.
// On my M1 laptop, the largest possible export is 16384 × 16384.

function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  pixelDensity(1); // by default this is two because of retina display
  my_scaled_canvas = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  my_scaled_canvas.pixelDensity(1);
  current_scale_factor = 1;
  noLoop();
}

function draw() {
  my_scaled_canvas.clear();
  my_scaled_canvas.push();
  my_scaled_canvas.scale(current_scale_factor);
  draw_my_design();
  my_scaled_canvas.pop();
  image(my_scaled_canvas, 0, 0); // Show on the main canvas
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  } else if (key == "e" || key == "E") {
    // Export High Ressolution Image
    export_high_resolution_image();
  }
}

function export_high_resolution_image() {
  // Scale up graphics before exporting
  current_scale_factor = output_scale_factor;
  my_scaled_canvas = createGraphics(
    output_scale_factor * WIDTH_HEIGHT,
    output_scale_factor * WIDTH_HEIGHT
  );
  draw();
  save(my_scaled_canvas, "high_resolution_image", "png");
  current_scale_factor = 1; // Reset to default
  my_scaled_canvas = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  draw();
}

function draw_my_design() {
  my_scaled_canvas.background("pink");
  for (var i = 0; i < 20; i++) {
    var px = random(0, width);
    var py = random(0, height);
    my_scaled_canvas.circle(px, py, width * 0.15);
  }
}
