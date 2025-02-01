/*
Genuary 2025 - January 30th Prompt: Abstract Map
*/

const WIDTH_HEIGHT = 800;
const working_area_PERCENTAGE = 0.8;
const NUM_GRID_CELLS = 15;
let grid_size;
let border_size;
let my_font;
let grid_array = new Array(NUM_GRID_CELLS - 1);

let background_color;
let fill_color_array = new Array(5);
let metro_line_array = new Array(5);

function preload() {
  my_font = loadFont("PlaywriteCU-Regular.ttf");
  background_color = color("#fefefe");
  // Create Grid Array
  for (let i = 0; i < grid_array.length; i++) {
    grid_array[i] = new Array(NUM_GRID_CELLS - 1).fill(0);
  }
  // These colors are stolen from DC Metro Map
  fill_color_array[0] = color("#fcd20a");
  fill_color_array[1] = color("#dc1c37");
  fill_color_array[2] = color("#04a64f");
  fill_color_array[3] = color("#f29425");
  fill_color_array[4] = color("#0375bc");
}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  for (let i = 0; i < metro_line_array.length; i++) {
    metro_line_array[i] = new MetroLine(fill_color_array[i]);
  }
  noLoop();
}

function draw() {
  working_area = parseInt(WIDTH_HEIGHT * working_area_PERCENTAGE);
  border_start = parseInt(WIDTH_HEIGHT - working_area) / 2.0;
  grid_size = working_area / NUM_GRID_CELLS;
  background(background_color);
  noStroke();

  // Draw a colored background
  noStroke();
  fill(color("#CCCCCC"));
  rect(border_start, border_start, working_area, working_area);

  // Draw Working Area Cells
  /*
  noFill();
  for (let row = 0; row < NUM_GRID_CELLS; row++) {
    for (let col = 0; col < NUM_GRID_CELLS; col++) {
      stroke(0);

      rect(
        border_start + col * grid_size,
        border_start + row * grid_size,
        grid_size,
        grid_size
      );
    }
  }
    */

  // Draw Metro Lines
  for (metro_lines of metro_line_array) {
    metro_lines.show();
  }

  // Now that we've drawn all of the individual lines, let's
  // draw bigger terminal exchanges where the main lines intersect
  for (let i = 0; i < metro_line_array.length; i++) {
    for (let j = 0; j < i; j++) {
      //print(`j ${j} i ${i}`);
      //print(metro_line_array[i].path.length);
      //print(metro_line_array[j].path.length);
      for (let k = 0; k < metro_line_array[i].path.length; k++) {
        for (let l = 0; l < metro_line_array[j].path.length; l++) {
          if (
            metro_line_array[i].path[k].x === metro_line_array[j].path[l].x &&
            metro_line_array[i].path[k].y === metro_line_array[j].path[l].y
          ) {
            // Draw an intersection exchange point
            // draw an exchange point
            fill("#ffffff");
            stroke(0);
            strokeWeight(grid_size / 7.5);
            circle(
              border_start + (metro_line_array[i].path[k].x + 1) * grid_size,
              border_start + (metro_line_array[i].path[k].y + 1) * grid_size,
              grid_size / 1.25
            );
            circle(
              border_start + (metro_line_array[i].path[k].x + 1) * grid_size,
              border_start + (metro_line_array[i].path[k].y + 1) * grid_size,
              grid_size / 3.0
            );
          }
        }
      }
    }
  }

  // Draw Text
  noStroke();
  fill(0);
  textSize(12);
  textFont(my_font);
  text(
    ">> 25.30",
    (WIDTH_HEIGHT - working_area) / 2,
    WIDTH_HEIGHT - (WIDTH_HEIGHT - working_area) / 2 + 25
  );
}

function mousePressed() {
  setup();
  draw();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

function get_random_color() {
  return fill_color_array[floor(random(fill_color_array.length))];
}

function getRandomInt(min, max) {
  min = Math.ceil(min); // Inclusive
  max = Math.floor(max); // Inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class MetroLine {
  constructor(colour) {
    this.colour = colour;
    this.start_point = createVector(
      getRandomInt(1, NUM_GRID_CELLS - 1),
      getRandomInt(1, NUM_GRID_CELLS - 1)
    );
    this.end_point = createVector(
      getRandomInt(1, NUM_GRID_CELLS - 1),
      getRandomInt(1, NUM_GRID_CELLS - 1)
    );
    this.path = null;
  }

  show() {
    noStroke();
    fill(this.colour);
    // Draw terminuses or termini (whatever the plural of terminus is ... lol)
    let terminal_size = grid_size / 1.5;
    circle(
      border_start + this.start_point.x * grid_size,
      border_start + this.start_point.y * grid_size,
      terminal_size
    );
    circle(
      border_start + this.end_point.x * grid_size,
      border_start + this.end_point.y * grid_size,
      terminal_size
    );

    let start = { x: this.start_point.x - 1, y: this.start_point.y - 1 };
    let end = { x: this.end_point.x - 1, y: this.end_point.y - 1 };
    this.path = aStar(grid_array, start, end);
    //print(`start: ${start.x} ${start.y} end: ${end.x} ${end.y}`);
    for (let i = 0; i < this.path.length - 1; i++) {
      noFill();
      stroke(this.colour);
      strokeWeight(grid_size / 3.5);
      line(
        border_start + (this.path[i].x + 1) * grid_size,
        border_start + (this.path[i].y + 1) * grid_size,
        border_start + (this.path[i + 1].x + 1) * grid_size,
        border_start + (this.path[i + 1].y + 1) * grid_size
      );
      if (i > 0 && i <= this.path.length) {
        if (floor(random(2)) == 1) {
          // draw an exchange point
          fill("#ffffff");
          stroke(0);
          strokeWeight(grid_size / 7.5);
          circle(
            border_start + (this.path[i].x + 1) * grid_size,
            border_start + (this.path[i].y + 1) * grid_size,
            grid_size / 3.5
          );
        }
      }
    }
    // draw an exchange point
    fill("#ffffff");
    stroke(0);
    strokeWeight(grid_size / 7.5);
    circle(
      border_start + (this.path[0].x + 1) * grid_size,
      border_start + (this.path[0].y + 1) * grid_size,
      grid_size / 3.5
    );
    circle(
      border_start + (this.path[this.path.length - 1].x + 1) * grid_size,
      border_start + (this.path[this.path.length - 1].y + 1) * grid_size,
      grid_size / 3.5
    );
  }
}

class Node {
  constructor(x, y, parent = null, g = 0, h = 0) {
    this.x = x;
    this.y = y;
    this.parent = parent;
    this.g = g;
    this.h = h;
    this.f = g + h;
  }
}

function heuristic(a, b) {
  // Using Euclidean distance for 8-direction movement
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function getNeighbors(node, grid) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // Cardinal directions
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // Diagonal directions
  ];

  const neighbors = [];
  for (const [dx, dy] of directions) {
    const x = node.x + dx;
    const y = node.y + dy;

    if (
      x >= 0 &&
      x < grid[0].length &&
      y >= 0 &&
      y < grid.length &&
      grid[y][x] === 0
    ) {
      neighbors.push(new Node(x, y));
    }
  }
  return neighbors;
}

function aStar(grid, start, end) {
  let openSet = [new Node(start.x, start.y)];
  let closedSet = new Set();

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    let current = openSet.shift();

    if (current.x === end.x && current.y === end.y) {
      let path = [];
      while (current) {
        path.push({ x: current.x, y: current.y });
        current = current.parent;
      }
      return path.reverse();
    }

    closedSet.add(`${current.x},${current.y}`);

    for (const neighbor of getNeighbors(current, grid)) {
      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue;

      const g = current.g + heuristic(current, neighbor);
      const h = heuristic(neighbor, end);
      const newNode = new Node(neighbor.x, neighbor.y, current, g, h);

      const existing = openSet.find(
        (n) => n.x === neighbor.x && n.y === neighbor.y
      );
      if (!existing || g < existing.g) {
        openSet.push(newNode);
      }
    }
  }
  return [];
}
