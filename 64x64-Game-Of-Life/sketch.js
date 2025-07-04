const WIDTH = 800;
const HEIGHT = 800;
const HORIZONTAL_PIXELS = 64;
const VERTICAL_PIXELS = 64;
let grid;
const COLORS = [
  "#F44336",
  "#FF9800",
  "#FFEB3B",
  "#4CAF50",
  "#2196F3",
  "#9C27B0",
];
const BACKGROUND_COLOR = "#000000";
let random_color;
let current_array;
let next_array;

const MAX_FRAMES = 1000;
let frame_count = 0;

function preload() {}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(10);
  grid = new Grid(
    { w: HORIZONTAL_PIXELS, h: VERTICAL_PIXELS },
    { w: WIDTH, h: HEIGHT }
  );
  current_array = Array.from({ length: VERTICAL_PIXELS }, () =>
    Array.from({ length: HORIZONTAL_PIXELS }, () => 0)
  );
  next_array = Array.from({ length: VERTICAL_PIXELS }, () =>
    Array.from({ length: HORIZONTAL_PIXELS }, () => 0)
  );
  initialize_array_random_values(current_array);
}

function draw() {
  background(220);
  for (let row = 0; row < current_array.length; row++) {
    for (let col = 0; col < current_array.length; col++) {
      if (current_array[row][col] == 1) {
        grid.set_pixel(createVector(col, row), random_color);
      } else {
        grid.set_pixel(createVector(col, row), color(BACKGROUND_COLOR));
      }
    }
  }
  grid.show();
  update_array(current_array, next_array);
  [current_array, next_array] = [next_array, current_array];
  frame_count++;
  if (frame_count >= MAX_FRAMES) {
    frame_count = 0;
    initialize_array_random_values(current_array);
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function initialize_array_random_values(array) {
  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[0].length; col++) {
      array[row][col] = floor(random(0, 2));
    }
  }
  random_color = COLORS[floor(random(0, COLORS.length))];
}

num_live_neighbors = function (pos, array) {
  let neighbor_sum = 0;
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      neighbor_sum +=
        array[mod(pos.y + k, VERTICAL_PIXELS)][
          mod(pos.x + l, HORIZONTAL_PIXELS)
        ];
    }
  }
  // Have to substract the middle cell, because we only want to look at neighbors of the cell,
  // not the cell itself
  neighbor_sum -= array[pos.y][pos.x];
  return neighbor_sum;
};

function update_array(current_array, next_array) {
  // Calculate the next state for each cell, by counting the neighbors, and
  // then applying the rules
  for (let row = 0; row < next_array.length; row++) {
    for (let col = 0; col < next_array[0].length; col++) {
      let num_neighbors = num_live_neighbors({ x: col, y: row }, current_array);
      if (current_array[row][col] === 1 && num_neighbors < 2) {
        next_array[row][col] = 0;
      } else if (current_array[row][col] === 1 && num_neighbors > 3) {
        next_array[row][col] = 0;
      } else if (current_array[row][col] === 0 && num_neighbors === 3) {
        next_array[row][col] = 1;
      } else {
        next_array[row][col] = current_array[row][col];
      }
    }
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
