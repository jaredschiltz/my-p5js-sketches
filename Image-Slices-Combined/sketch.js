let mask;
let mask_image;
let image1;
let image2;

function preload() {
  image1 = loadImage("image1.png");
  image2 = loadImage("image2.png");
}
function setup() {
  cnv = createCanvas(800, 800);
  mask = createGraphics(800, 800);
  noLoop();
}

function draw() {
  background(255, 0, 0);
  // Calculate longest line segment from the middle point of canvas
  make_strip_mask(mask, 2, 2, 0, -PI / 5);
  mask_image = createImage(mask.width, mask.height);
  mask_image.copy(
    mask,
    0,
    0,
    mask.width,
    mask.height,
    0,
    0,
    mask.width,
    mask.height
  );
  image(image2, 0, 0);
  image1.mask(mask_image);
  image(image1, 0, 0);
}

function keyPressed() {
  if (key == "m") {
    //saveCanvas("output", "jpg");
    mask_image.save("mask", "png"); // This saves a transparent mask png file
  }
  if (key == "s") {
    saveCanvas("output", "jpg");
  }
}

function make_strip_mask(
  graphics_object,
  stripe_width,
  stripe_spacing,
  horizontal_offset,
  rotation
) {
  let longest_line_segment = calculate_longest_line_segment(
    graphics_object.width,
    graphics_object.height
  );
  graphics_object.background(0, 0, 0, 0); // Make transparent background
  graphics_object.push();
  graphics_object.translate(
    graphics_object.width / 2,
    graphics_object.height / 2
  );
  graphics_object.translate(horizontal_offset, 0);
  graphics_object.rotate(rotation);
  graphics_object.noStroke();
  graphics_object.fill(0);
  for (
    let x = -longest_line_segment;
    x <= longest_line_segment;
    x += stripe_width + stripe_spacing
  ) {
    graphics_object.rect(
      x,
      -longest_line_segment,
      stripe_width,
      2 * longest_line_segment
    );
  }
  graphics_object.pop();
}

function calculate_longest_line_segment(w, h) {
  return sqrt(pow(w / 2, 2) + pow(h / 2, 2));
}
