const WIDTH_HEIGHT = 800;
const CELL_HEIGHT_TO_WIDTH_RATIO = 2;
const CELL_WIDTH = 38;
const CELL_HEIGHT = CELL_WIDTH * CELL_HEIGHT_TO_WIDTH_RATIO;
const NUM_HORIZONTAL_CELLS = 12;
const NUM_VERTICAL_CELLS = 9;
const VERTICAL_PADDING = (WIDTH_HEIGHT - NUM_VERTICAL_CELLS * CELL_HEIGHT) / 2;
const HORIZONTAL_PADDING =
  (WIDTH_HEIGHT - NUM_HORIZONTAL_CELLS * CELL_WIDTH) / 2;
const NUM_STRIPES = 12
let cnv;
let color_array;
let stripe_odds = 0.5; // 80% of stripes, 20% of solid block
let img

function preload() {
  img = loadImage('canvas.png')
}

function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  color_array = new Array(5);
  color_array[0] = color("#26547CDD");
  color_array[1] = color("#EF476FDD");
  color_array[2] = color("#FFD166DD");
  color_array[3] = color("#06D6A0DD");
  color_array[4] = color("#000000DD");
  noLoop();
}

function draw() {
  background(0);
  image(img,0,0)
  // Draw Grid
  noStroke();
  for (let y = 0; y < NUM_VERTICAL_CELLS; y++) {
    for (let x = 0; x < NUM_HORIZONTAL_CELLS; x++) {
      if (random() < stripe_odds) {
        // Draw a striped box
        // Pick box color
        let color1 = floor(random(0, 5));
        let color2 = color1
        while(color2 == color1) { // Pick a completely different color
          color2 = floor(random(0, 5)); 
        }
        // Draw Box
        fill(color_array[color1]) 
        rect(
          HORIZONTAL_PADDING + x * CELL_WIDTH,
          VERTICAL_PADDING + y * CELL_HEIGHT,
          CELL_WIDTH,
          CELL_HEIGHT
        ); 
        // Draw Stripes
        let stripe_height = CELL_HEIGHT / NUM_STRIPES
        fill(color_array[color2])
        for(let i = 0; i < NUM_STRIPES; i++) {
          if(i % 2 == 1) {
            rect(HORIZONTAL_PADDING + x * CELL_WIDTH, VERTICAL_PADDING + y * CELL_HEIGHT + i * stripe_height, CELL_WIDTH, stripe_height)
          }
        }

      } else {
        //Draw a solid box
        fill(random(color_array));
        rect(
          HORIZONTAL_PADDING + x * CELL_WIDTH,
          VERTICAL_PADDING + y * CELL_HEIGHT,
          CELL_WIDTH,
          CELL_HEIGHT
        );
      }
    }
  }
}

function keyPressed() {
  if (key === "s") {
    saveCanvas('output.png')
  }
}
