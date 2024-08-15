const WIDTH_HEIGHT = 800;
let palette = [
  "#2c695a",
  "#4ad6af",
  "#7facc6",
  "#4e93cc",
  "#f6684f",
  "#ffd300",
];

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
  pixelDensity(2), angleMode(DEGREES);
  background("#fffceb");
  translate(-WIDTH_HEIGHT / 2, -WIDTH_HEIGHT / 2);

  // Test Different Flowfields here:
  // "zigzag", "seabed", "curved", "truncated"
  // You can also disable field completely with brush.noField()
  //brush.field(vector_fields[0]);
  brush.noField();

  // We create a grid here
  let num_cols = 12;
  let num_rows = 6;
  let border = 300;
  let col_size = (width - border) / num_cols;
  let row_size = (height - border) / num_rows;

  // We create the grid here
  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      brush.set(stroke_brushes[5], random(palette));
      brush.bleed(0.01, "out", 1.0);
      brush.fillTexture(0.4, 1.4);
      brush.fill(random(palette), random(80, 140));

      brush.rect(
        border / 2 + col_size * j, // x top left corner
        border / 2 + row_size * i, // y top left corner
        col_size, // width
        row_size // height
      );

      /*
      brush.circle(
        border / 2 + col_size * j,
        border / 2 + row_size * i,
        col_size
      );
      */

      /*
      // We fill 10% of the cells
      if (random() < 0.1) {
        // Set Fill
        brush.fill(random(palette), random(80, 140));
        brush.bleed(random(0.05, 0.4));
        brush.fillTexture(0.55, 0.5);
      }

      // We stroke + hatch the remaining
      else {
        // Set Stroke
        brush.set(random(stroke_brushes), random(palette));

        // Set Hatch
        // You set color and brush with .setHatch(brush_name, color)
        //brush.setHatch(random(hatch_brushes), random(palette));
        // You set hatch params with .hatch(distance, angle, options)
        // See reference
        brush.hatch(
          random(10, 60), // This is distance between lines
          random(0, 180), // This is angle in degrees
          { rand: 0, continuous: false, gradient: false }
        ); // Optional
      }

      // We draw the rectangular grid here
      brush.rect(
        border / 2 + col_size * j, // x top left corner
        border / 2 + row_size * i, // y top left corner
        col_size, // width
        row_size // height
      );

      // Reset states for next cell
      brush.noStroke();
      brush.noFill();
      brush.noHatch();
      */
    }
  }
  /*
  brush.field(vector_fields[3]);
  const NUM_LINES = 20;
  const LINE_SPACING = WIDTH_HEIGHT / (NUM_LINES + 1);
  let current_brush_type = stroke_brushes[1];
  for (let y = 0; y < NUM_LINES; y++) {
    brush.set(current_brush_type, random(palette), 1.5);
    brush.flowLine(0, LINE_SPACING + LINE_SPACING * y, WIDTH_HEIGHT, -1);
  }
  */

  noLoop();
}

function draw() {}
