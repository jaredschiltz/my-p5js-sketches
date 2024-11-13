const WIDTH_HEIGHT = 800;
let img;
let canvas;
let image_array = [];
let cells_x = 12;
let cells_y = 9;

function preload() {
  img = loadImage("fingers.jpg");
}

function setup() {
  canvas = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  let cell_width = img.width / cells_x;
  let cell_height = img.height / cells_y;
  for (let row = 0; row < cells_y; row++) {
    for (let col = 0; col < cells_x; col++) {
      image_array.push(
        img.get(col * cell_width, row * cell_height, cell_width, cell_height)
      );
    }
  }

  /*
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
    */
  noLoop();
}

function draw() {
  background(0);
  let radius = 0;
  let angle = 0;
  let radius_increment = 2.3;
  let angle_increment = TWO_PI / 20;
  let cell_size = 0.25;
  let cell_size_scaling = 1.3;
  noStroke();
  fill(255, 255, 0);
  push();
  translate(width / 2, height / 2);
  for (let i = 1; i < cells_x * cells_y; i++) {
    push();
    rotate(angle);
    translate(0, radius);
    //fill(color(random(0, 255), random(0, 255), random(0, 255)));
    //rect(0, 0, i ** 1.2 * cell_size, i ** 1.2 * cell_size);
    image(
      image_array[i],
      0,
      0,
      i ** cell_size_scaling * cell_size,
      i ** cell_size_scaling * cell_size
    );

    pop();
    angle += angle_increment;
    radius += radius_increment;
  }
  pop();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
