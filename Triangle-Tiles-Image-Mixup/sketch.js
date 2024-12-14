const WIDTH_HEIGHT = 800;
const NUM_TRIANGLE_WIDTHS_ACROSS = 6; // widths are equal to length of equilateral triangle
// equilateral triangle has a height that is sqrt(3)/2 * width
const height_to_width_ratio = Math.sqrt(3) / 2.0;
let my_image;
let my_image_resize_to_canvas;
let mask_triangle_upright;
let mask_triangle_upside_down;

function preload() {
  my_image = loadImage("face.jpg");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
}

function draw() {
  background(220);
  my_image_resize_to_canvas = createImage(width, height);
  my_image_resize_to_canvas.copy(
    my_image,
    0,
    0,
    my_image.width,
    my_image.height,
    0,
    0,
    width,
    height
  );
  //image(my_image_resize_to_canvas, 0, 0, 800, 800);
  let triangle_base = parseInt(width / NUM_TRIANGLE_WIDTHS_ACROSS);
  let triangle_height = parseInt(triangle_base * height_to_width_ratio);
  mask_triangle_upright = createGraphics(triangle_base, triangle_height);
  mask_triangle_upside_down = createGraphics(triangle_base, triangle_height);
  // make masks
  mask_triangle_upright.background(0, 0, 0, 0); // Make transparent background
  mask_triangle_upright.noStroke();
  mask_triangle_upright.fill(0);
  mask_triangle_upright.triangle(
    0,
    triangle_height,
    triangle_base,
    triangle_height,
    triangle_base / 2,
    0
  );

  let mask_triangle_upright_image = createImage(
    mask_triangle_upright.width,
    mask_triangle_upright.height
  );
  mask_triangle_upright_image.copy(
    mask_triangle_upright,
    0,
    0,
    mask_triangle_upright.width,
    mask_triangle_upright.height,
    0,
    0,
    mask_triangle_upright.width,
    mask_triangle_upright.height
  );

  mask_triangle_upside_down.background(0, 0, 0, 0); // Make transparent background
  mask_triangle_upside_down.noStroke();
  mask_triangle_upside_down.fill(0);
  mask_triangle_upside_down.triangle(
    0,
    0,
    triangle_base,
    0,
    triangle_base / 2,
    triangle_height
  );

  let mask_triangle_upside_down_image = createImage(
    mask_triangle_upside_down.width,
    mask_triangle_upside_down.height
  );
  mask_triangle_upside_down_image.copy(
    mask_triangle_upside_down,
    0,
    0,
    mask_triangle_upside_down.width,
    mask_triangle_upside_down.height,
    0,
    0,
    mask_triangle_upside_down.width,
    mask_triangle_upside_down.height
  );

  /*
  let image_to_be_masked = createImage(
    parseInt(mask_triangle_upright.width),
    parseInt(mask_triangle_upright.height)
  );
  image_to_be_masked.copy(
    my_image_resize_to_canvas,
    my_image_resize_to_canvas.width / 2,
    my_image_resize_to_canvas.height / 2,
    parseInt(mask_triangle_upright.width),
    parseInt(mask_triangle_upright.height),
    0,
    0,
    parseInt(mask_triangle_upright.width),
    parseInt(mask_triangle_upright.height)
  );
  image_to_be_masked.mask(mask_triangle_upright_image);
  image(image_to_be_masked, 0, 0);
  */
  let grid = make_triangle_grid(
    triangle_base,
    triangle_height,
    my_image_resize_to_canvas,
    mask_triangle_upright_image,
    mask_triangle_upside_down_image
  );
  //image(my_image_resize_to_canvas, 0, 0);

  // display grid
  for (let img of grid) {
    image(img.masked_image, img.x, img.y);
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function make_triangle_grid(
  triangle_base,
  triangle_height,
  image_to_copy,
  mask_triangle_upright_image,
  mask_triangle_upside_down_image
) {
  // number_of_rows is equal to number of triangles across(upright and upside down)
  // number_of_cols is equal to number of triangles down (upright and upside down)
  let number_of_rows = floor(height / triangle_height);
  let number_of_cols = floor(width / triangle_base); // this only accounts for upright triangles in a row
  number_of_cols = number_of_cols + (number_of_cols - 1); // need to add in the upside down triangles too
  //print(`number_of_rows: ${number_of_rows} number_of_cols: ${number_of_cols}`);
  // Columns are centered by default, because we base everything around specified triangle base widths
  // Rows are going to be off because height is irrational number times triangle base
  // Calculate offset, so they can be centered
  let row_offset = round((height - number_of_rows * triangle_height) / 2);
  grid = new Array();

  // Let's draw the grid to be created
  for (let row = 0; row < number_of_rows; row++) {
    for (let col = 0; col < number_of_cols; col++) {
      let triangle_direction = (row + col) % 2;
      let random_color = color(random(0, 255), random(0, 255), random(0, 255));
      let current_image = createImage(triangle_base, triangle_height);
      current_image.copy(
        image_to_copy,
        (col * triangle_base) / 2,
        row_offset + row * triangle_height,
        triangle_base,
        triangle_height,
        0,
        0,
        triangle_base,
        triangle_height
      );
      if (triangle_direction === 0) {
        current_image.mask(mask_triangle_upright_image);
      } else {
        current_image.mask(mask_triangle_upside_down_image);
      }
      grid.push({
        x: (col * triangle_base) / 2,
        y: row_offset + row * triangle_height,
        orientation: triangle_direction,
        masked_image: current_image,
      });
      /*
      // draw mask outlines
      noFill();
      stroke(random_color);
      rect(
        (col * triangle_base) / 2,
        row_offset + row * triangle_height,
        triangle_base,
        triangle_height
      );

      // draw triangle masks
      noStroke();
      fill(random_color);
      if (triangle_direction === 0) {
        // upright triangle
        triangle(
          (col / 2) * triangle_base,
          row_offset + (row + 1) * triangle_height,
          (col / 2 + 1) * triangle_base,
          row_offset + (row + 1) * triangle_height,
          (col / 2) * triangle_base + triangle_base / 2,
          row_offset + row * triangle_height
        );
      } else {
        // upside down triangle
        triangle(
          (col / 2) * triangle_base,
          row_offset + row * triangle_height,
          (col / 2 + 1) * triangle_base,
          row_offset + row * triangle_height,
          triangle_base / 2 + (col / 2) * triangle_base,
          row_offset + (row + 1) * triangle_height
        );
      }
      */
    }
  }
  return grid;
}
