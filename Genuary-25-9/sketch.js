/*
Genuary 2025 - January 9th Prompt: The textile design patterns of public transport seating.
*/

const WIDTH_HEIGHT = 800;
let purple = "#3e2363";
let turquoise = "#40E0D0";
//let pink = "#FF6FFF";
let pink = "#F987C5";

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
let display_font;
function preload() {
  display_font = loadFont("PlaywriteCU-Regular.ttf");
}

function setup() {
  // Canvas should be WEBGL!!
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT, WEBGL);
  pixelDensity(2), angleMode(DEGREES);
  background("#fffceb");
  translate(-WIDTH_HEIGHT / 2, -WIDTH_HEIGHT / 2);

  // test different flowfields here:
  // "zigzag", "seabed", "curved", "truncated"
  // you can also disable field completely with brush.noField()
  //brush.field(vector_fields[0]);
  brush.noField();

  /* Have to make a brush first, even if you don't use it to things
  to work right */
  brush.bleed(0.001, "out", 0.1);

  noLoop();
}

function mousePressed() {}

function draw() {
  // Have to translate, because WEBGL coordinates are default in the center
  translate(-WIDTH_HEIGHT / 2, -WIDTH_HEIGHT / 2);
  // Draw text
  //WEBGL only supports loading fonts using loadFont
  textFont(display_font);
  noStroke();
  fill(0);
  textSize(12);
  text(">> 25.9", 31, WIDTH_HEIGHT - 8);
  const NUM_ROWS = 7;
  const NUM_COLS = 7;
  const BORDER_WIDTH = 30;
  const CELL_SIZE = (WIDTH_HEIGHT - 2 * BORDER_WIDTH) / NUM_ROWS;
  //brush.set(stroke_brushes[5], "#000000");
  // brush.bleed(0.01, "out", 1.0);
  // Set Hatch
  // You set color and brush with .setHatch(brush_name, color)
  //brush.setHatch(random(hatch_brushes), random(palette));
  // You set hatch params with .hatch(distance, angle, options)
  // See reference
  const hatch_spacing = 4;
  const hatch_degree_angle = 0;
  brush.hatch(hatch_spacing, hatch_degree_angle, {
    rand: 0,
    continuous: true,
    gradient: false,
  }); // Optional
  //brush.fillTexture(0.8, 0.4);
  for (let rows = 0; rows < NUM_ROWS; rows++) {
    for (let cols = 0; cols < NUM_COLS; cols++) {
      // Draw Background Fabric
      if ((rows + cols) % 2 === 0) {
        brush.set(stroke_brushes[5], purple);
        brush.fill(purple, 255);
      } else {
        brush.set(stroke_brushes[5], turquoise);
        brush.fill(turquoise, 255);
      }
      brush.rect(
        BORDER_WIDTH + cols * CELL_SIZE,
        BORDER_WIDTH + rows * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      // Draw Foreground Fabric
      if (rows % 2 === 0 && cols % 2 === 1) {
        brush.set(stroke_brushes[5], purple);
        brush.fill(purple, 255);
        for (let i = 0; i < 3; i++) {
          brush.rect(
            BORDER_WIDTH + cols * CELL_SIZE + (i * CELL_SIZE) / 5,
            BORDER_WIDTH + rows * CELL_SIZE,
            CELL_SIZE / 10,
            CELL_SIZE / 2
          );
        }
        for (let i = 0; i < 3; i++) {
          brush.rect(
            BORDER_WIDTH +
              cols * CELL_SIZE +
              CELL_SIZE / 2 +
              (i * CELL_SIZE) / 5,
            BORDER_WIDTH + rows * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 10,
            CELL_SIZE / 2
          );
        }
      }
      if (rows % 2 === 1 && cols % 2 === 0) {
        brush.set(stroke_brushes[5], purple);
        brush.fill(purple, 255);
        for (let i = 0; i < 3; i++) {
          brush.rect(
            BORDER_WIDTH + cols * CELL_SIZE,
            BORDER_WIDTH + rows * CELL_SIZE + (i * CELL_SIZE) / 5,
            CELL_SIZE / 2,
            CELL_SIZE / 10
          );
        }
        for (let i = 0; i < 3; i++) {
          brush.rect(
            BORDER_WIDTH + cols * CELL_SIZE + CELL_SIZE / 2,
            BORDER_WIDTH +
              rows * CELL_SIZE +
              CELL_SIZE / 2 +
              (i * CELL_SIZE) / 5,
            CELL_SIZE / 2,
            CELL_SIZE / 10
          );
        }
      }

      const CELL_CIRCLE_PERCENTAGE = 0.5;
      // Draw Circles
      if ((rows + cols) % 2 === 0) {
        brush.set(stroke_brushes[5], pink);
        brush.fill(pink, 255);
        brush.circle(
          BORDER_WIDTH + cols * CELL_SIZE + CELL_SIZE / 2,
          BORDER_WIDTH + rows * CELL_SIZE + CELL_SIZE / 2,
          (CELL_SIZE / 2) * CELL_CIRCLE_PERCENTAGE
        );
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
