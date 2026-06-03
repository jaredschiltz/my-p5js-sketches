const WIDTH_HEIGHT = 800;
const LEVELS = 5;
const START_PERCENT = 0.9;
const PERCENT_DECREASE_PER_LEVEL = 0.21;
//let palette = ["#4ad6af", "#4e93cc", "#f6684f", "#ffd300"];
//let palette = ["#ff0000", "#ff8d00", "#ffdb00", "#00d619", "#009fff"];
//let palette = ["#fb6107", "#f3de2c", "#7cb518", "#5c8001", "#fbb02d"];
let palette = ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"];

let vector_fields = ["curved", "truncated", "zigzag", "seabed", "waves"];

let stroke_brushes = [
  "pen",
  "rotring",
  "2B",
  "HB",
  "2H",
  "cpencil",
  "charcoal",
  "hatch_brush",
  "spray",
  "marker",
  "marker2",
];
let hatch_brushes = [
  "pen",
  "rotring",
  "2B",
  "HB",
  "2H",
  "cpencil",
  "charcoal",
  "hatch_brush",
  "marker",
  "marker2",
];

function setup() {
  // Canvas should be WEBGL!!
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT, WEBGL);
  (pixelDensity(2), angleMode(DEGREES));
  //background("#fffceb");
  background("#000000");
  translate(-WIDTH_HEIGHT / 2, -WIDTH_HEIGHT / 2);

  // Test Different Flowfields here:
  // "zigzag", "seabed", "curved", "truncated"
  // You can also disable field completely with brush.noField()
  //brush.field(vector_fields[0]);
  brush.noField();
  brush.add("myBrush", {
    type: "default",
    weight: 1.64,
    scatter: 0.75,
    sharpness: 0.74,
    grain: 0.9,
    opacity: 170,
    spacing: 0.3,
    noise: 1,
    pressure: [0.92, 0.9],
    rotate: "natural",
  });

  // We create a grid here
  let num_cols = 15;
  let num_rows = 15;
  let border = 100;
  let col_size = (width - border) / num_cols;
  let row_size = (height - border) / num_rows;

  // We create the grid here
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      /*
      // Draw cell outline
      brush.set("myBrush", color(0));
      brush.rect(
        border / 2 + col_size * j, // x top left corner
        border / 2 + row_size * i, // y top left corner
        col_size, // width
        row_size, // height
      );
      */

      // Draw Nested squares
      let percentage = START_PERCENT;
      let start_random_color_index = int(random(palette.length));

      for (let level = 0; level < LEVELS; level++) {
        brush.set("myBrush", palette[start_random_color_index]);
        let upper_left = createVector(
          border / 2 + col_size * j + (col_size - col_size * percentage) / 2,
          border / 2 + row_size * i + (row_size - row_size * percentage) / 2,
        );

        let upper_right = createVector(
          border / 2 +
            col_size * (j + 1) -
            (col_size - col_size * percentage) / 2,
          border / 2 + row_size * i + (row_size - row_size * percentage) / 2,
        );
        let lower_left = createVector(
          border / 2 + col_size * j + (col_size - col_size * percentage) / 2,
          border / 2 +
            row_size * (i + 1) -
            (row_size - row_size * percentage) / 2,
        );
        let lower_right = createVector(
          border / 2 +
            col_size * (j + 1) -
            (col_size - col_size * percentage) / 2,
          border / 2 +
            row_size * (i + 1) -
            (row_size - row_size * percentage) / 2,
        );
        // Randomize each of the four corners
        let random_amount = 1;
        let random_upper_left = p5.Vector.random2D()
          .normalize()
          .mult(random_amount);
        let random_upper_right = p5.Vector.random2D()
          .normalize()
          .mult(random_amount);
        let random_lower_left = p5.Vector.random2D()
          .normalize()
          .mult(random_amount);
        let random_lower_right = p5.Vector.random2D()
          .normalize()
          .mult(random_amount);
        upper_right.add(random_upper_right);
        upper_left.add(random_upper_left);
        lower_right.add(random_lower_right);
        lower_left.add(random_lower_left);

        let should_draw = random();
        if (should_draw < 0.75) {
          // Draw Rect
          /*
          brush.line(upper_left.x, upper_left.y, upper_right.x, upper_right.y);
          brush.line(upper_left.x, upper_left.y, lower_left.x, lower_left.y);
          brush.line(lower_left.x, lower_left.y, lower_right.x, lower_right.y);
          brush.line(
            lower_right.x,
            lower_right.y,
            upper_right.x,
            upper_right.y,
          );
          */
          // Draw Rounded shape
          brush.beginShape(0.9);
          brush.vertex(upper_left.x, upper_left.y);
          brush.vertex(upper_right.x, upper_right.y);
          brush.vertex(lower_right.x, lower_right.y);
          brush.vertex(lower_left.x, lower_left.y);
          brush.endShape(true);
        }

        percentage -= PERCENT_DECREASE_PER_LEVEL;
        start_random_color_index += 1;
        start_random_color_index = start_random_color_index % palette.length;
      }
    }
  }

  noLoop();
}

function draw() {}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
