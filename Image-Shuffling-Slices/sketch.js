const WIDTH_HEIGHT = 800;
let img;
let canvas;
let img_to_display;
let number_of_vertical_slices = 40;
let slice_number_array;

function preload() {
  img = loadImage("https://picsum.photos/" + str(WIDTH_HEIGHT));
}

function setup() {
  canvas = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  img_to_display = createGraphics(WIDTH_HEIGHT, WIDTH_HEIGHT);
  slice_number_array = Array.from(
    { length: number_of_vertical_slices },
    (_, i) => i - 1 + 1
  );
  let slice_width = width / number_of_vertical_slices;
  for ([index, slice] of shuffle(slice_number_array).entries()) {
    img_to_display.copy(
      img,
      index * slice_width,
      0,
      slice_width,
      height,
      slice * slice_width,
      0,
      slice_width,
      height
    );
  }
  noLoop();
}

function draw() {
  background(220);
  image(img_to_display, 0, 0);
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
