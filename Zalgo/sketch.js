const WIDTH_HEIGHT = 800;
const GRID_SIZE = 31; // Make an odd number so there equal spacing above/below word
const word_to_display = "DO NOT FREAK OUT!"
const WORD_LENGTH = word_to_display.length
const WORD_PADDING = (GRID_SIZE - word_to_display.length) / 2
const WORD_Y_LOCATION = Math.floor(GRID_SIZE / 2);
let cnv;
const GRID_SPACING = WIDTH_HEIGHT / GRID_SIZE;
let word_array;
let font;
let character_array;
let font_color;

function preload() {
  font = loadFont("assets/JetBrainsMonoNL-Regular.ttf");
  
  console.log(WORD_LENGTH)
  
}

function setup() {
  cnv = createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  frameRate(3)
  font_color = color("#FF3c00"); // Bright Orange
  word_array = new Array(WORD_LENGTH);
  for (let x = 0; x < word_array.length; x++) {
    word_array[x] = {
      y_start: floor(random(WORD_PADDING, WORD_Y_LOCATION)),
      y_end: floor(random(WORD_Y_LOCATION + 1, GRID_SIZE - WORD_PADDING)),
    };
  }
  character_array = [
    "૪",
    "::",
    "∵",
    "⋈",
    "≍",
    "⋱",
    "⋐",
    "⨀",
    "≈",
    "∞",
    "⊢",
    "⊛",
    "⊝",
    "⇉",
    "△",
    "⍥",
    "⍏",
    "⚡",
    "⍬",
    "⌿",
    "⍨",
    "⌾",
    "╌",
    "┊",
    "▽",
    "▷",
    "◁",
    "▲",
    "▶",
    "▼",
    "◀",
    "■",
    "□",
    "▪",
    "▫",
    "▴",
    "●",
    "○",
    "⋰",
    "∴",
    "≋",
    "⊡",
    "≗",
  ];
  
}

function draw() {
  background(0);
  // Draw grid for text
  /*
  noFill();
  stroke(255);
  for (let y = 0; y < GRID_SIZE; y++) {
    line(0, y * GRID_SPACING, width, y * GRID_SPACING);
  }
  for (let x = 0; x < GRID_SIZE; x++) {
    line(x * GRID_SPACING, 0, x * GRID_SPACING, height);
  }
  */
  /*
  stroke(255, 0, 0);
  line(
    WORD_PADDING * GRID_SPACING,
    WORD_Y_LOCATION * GRID_SPACING + (1 / 2) * GRID_SPACING,
    width - WORD_PADDING * GRID_SPACING,
    WORD_Y_LOCATION * GRID_SPACING + (1 / 2) * GRID_SPACING
  );
  */
  /*
  for (let i = 0; i < word_array.length; i++) {
    line(
      // TOP LINE
      WORD_PADDING * GRID_SPACING + i * GRID_SPACING + (1 / 2) * GRID_SPACING,
      word_array[i].y_start * GRID_SPACING + GRID_SPACING / 2,
      WORD_PADDING * GRID_SPACING + i * GRID_SPACING + (1 / 2) * GRID_SPACING,
      (WORD_Y_LOCATION - 1) * GRID_SPACING + GRID_SPACING / 2
    );
    line(
      // BOTTOM LINE
      WORD_PADDING * GRID_SPACING + i * GRID_SPACING + (1 / 2) * GRID_SPACING,
      (WORD_Y_LOCATION + 1) * GRID_SPACING + GRID_SPACING / 2,
      WORD_PADDING * GRID_SPACING + i * GRID_SPACING + (1 / 2) * GRID_SPACING,
      word_array[i].y_end * GRID_SPACING + GRID_SPACING / 2
    );
  }
  */
  fill(font_color);
  noStroke();
  textFont(font);
  textSize(20); // NB: This would have to be changed if grid size changed (figure out how textsize relates to grid_spacing)
  textAlign(CENTER);
  // Test font alignment with a grid
  let x_off = 0;
  let y_off = 7;
  // Make Random Word
  for (let x = WORD_PADDING; x < GRID_SIZE - WORD_PADDING; x++) {
    text(
      random(character_array),
      x * GRID_SPACING + GRID_SPACING / 2.0 + x_off,
      WORD_Y_LOCATION * GRID_SPACING + GRID_SPACING / 2.0 + y_off
    );
  }

  // Print coherent word
  for (let x = 0; x < word_to_display.length; x++) {
    text(word_to_display[x], WORD_PADDING * GRID_SPACING + x * GRID_SPACING + GRID_SPACING / 2.0 + x_off,
    WORD_Y_LOCATION * GRID_SPACING + GRID_SPACING / 2.0 + y_off)
  }

  // Make the Zalgo magic happen (all the characters above and below the word)
  for (let x = 0; x < word_array.length; x++) {
    // Top Characters
    for (let y = word_array[x].y_start; y < WORD_Y_LOCATION; y++) {
      text(
        random(character_array),
        WORD_PADDING * GRID_SPACING +
          x * GRID_SPACING +
          GRID_SPACING / 2.0 +
          x_off,
        y * GRID_SPACING + (1 / 2) * GRID_SPACING + y_off
      );
    }
    // Bottom Characters
    for (let y = WORD_Y_LOCATION + 1; y < word_array[x].y_end + 1; y++) {
      text(
        random(character_array),
        WORD_PADDING * GRID_SPACING +
          x * GRID_SPACING +
          GRID_SPACING / 2.0 +
          x_off,
        y * GRID_SPACING + (1 / 2) * GRID_SPACING + y_off
      );
    }
  }

  /*
  // Test grid of random characters to figure out proper x and y offset for alignment of characters to grid
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      text(
        random(character_array),
        x * GRID_SPACING + GRID_SPACING / 2.0 + x_off,
        y * GRID_SPACING + GRID_SPACING / 2.0 + y_off
      );
    }
  }
  */

  for (let x = 0; x < word_array.length; x++) {
    word_array[x] = {
      y_start: floor(random(WORD_PADDING, WORD_Y_LOCATION)),
      y_end: floor(random(WORD_Y_LOCATION + 1, GRID_SIZE - WORD_PADDING)),
    };
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('my_gif', 10);
  }
}
