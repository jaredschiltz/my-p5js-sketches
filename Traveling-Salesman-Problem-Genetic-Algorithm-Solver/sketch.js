const WIDTH = 900;
const HEIGHT = 680;
const POPULATION_SIZE = 30;
const CROSSOVER_PROBABILITY = 0.9;
const MUTATION_PROBABILITY = 0.01;
let running = false;
/* Demo data sets are:
(1) data40
(2) data200
(3) data500
*/
let points;
let point_distances;
let population = [];
let population_distances = new Array(POPULATION_SIZE);

let shortest_individual = {
  // There is 1-1 correspondence between population array and population distances array
  population_index: undefined,
  shortest_distance: undefined,
};
let shortest_individual_array = [];
let fitness_values = new Array(POPULATION_SIZE);
let roulette = new Array(POPULATION_SIZE);
let current_generation = 0;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  // Copy demo data to points array
  points = data500.map((item) => item);
}

function draw() {
  background(220);
  if (running) {
    next_generation_ga();
    print(
      `Current Generation: ${current_generation} Current Lowest Distance: ${shortest_individual.shortest_distance}`
    );
    if (shortest_individual != undefined) {
      draw_lines(shortest_individual_array);
    }
  }
  draw_points();
}

function draw_lines(array) {
  noFill();
  stroke(255, 0, 0);
  for (let i = 0; i < array.length - 1; i++) {
    line(
      points[array[i]].x,
      points[array[i]].y,
      points[array[i + 1]].x,
      points[array[i + 1]].y
    );
  }
}

function draw_points() {
  noStroke();
  fill(0);
  for (p of points) {
    circle(p.x, p.y, 5);
  }
}

function keyPressed() {
  if (key == "s") {
    // Start
    running = true;
    initialize_ga();
  }
  if (key == "p") {
    // Pause
    running = !running;
  }
}
