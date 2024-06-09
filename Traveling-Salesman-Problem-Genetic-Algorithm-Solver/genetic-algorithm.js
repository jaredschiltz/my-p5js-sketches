function initialize_ga() {
  calculate_all_point_to_point_distances();
  // Make population array, each item contains shuffled points array
  for (let i = 0; i < POPULATION_SIZE; i++) {
    population.push(create_random_individual(points.length));
  }
  get_lowest_distance_of_population();
}
function next_generation_ga() {
  current_generation++;
  selection();
  crossover();
  mutation();

  get_lowest_distance_of_population();
}

/*
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function get_random_int(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const next = (array, index) => {
  if (index == array.length - 1) {
    return array[0];
  } else {
    return array[index + 1];
  }
};

const previous = (array, index) => {
  if (index === 0) {
    return array[array.length - 1];
  } else {
    return array[index - 1];
  }
};

const delete_by_value = (array, value) => {
  let pos = array.indexOf(value);
  array.splice(pos, 1);
};

// Make list of points in randomized order
function create_random_individual() {
  return shuffle(Array.from({ length: points.length }, (_, i) => i));
}

// Evaluates the distance for each population element (an individual)
function calculate_individual_distance(individual) {
  // N.B. Ignoring the distance from the first point to the last point
  // For Pen Plotter, we don't need to return to "home"
  //let total_distance = 0;
  let total_distance =
    point_distances[individual[0]][individual[individual.length - 1]];
  for (let i = 1; i < individual.length; i++) {
    total_distance += point_distances[individual[i]][individual[i - 1]];
  }
  return total_distance;
}

// Generates a 2D array with distances between every point and every other point
function calculate_all_point_to_point_distances() {
  let point_length = points.length;
  point_distances = new Array(point_length);
  for (let i = 0; i < point_length; i++) {
    point_distances[i] = new Array(point_length);
    for (let j = 0; j < point_length; j++) {
      point_distances[i][j] = dist(
        points[i].x,
        points[i].y,
        points[j].x,
        points[j].y
      );
    }
  }
}

function selection() {
  let parents = new Array();
  let initialization_number = 4;
  // Arrays pass by reference, so to clone (by value), use Array.from()
  parents.push(Array.from(shortest_individual_array));
  parents.push(do_mutate(Array.from(shortest_individual_array)));
  parents.push(push_mutate(Array.from(shortest_individual_array)));
  parents.push(Array.from(shortest_individual_array));

  set_roulette();
  for (let i = initialization_number; i < POPULATION_SIZE; i++) {
    parents.push(population[wheel_out(Math.random())]);
  }
  population = parents;
}
function crossover() {
  let queue = new Array();
  for (let i = 0; i < POPULATION_SIZE; i++) {
    if (Math.random() < CROSSOVER_PROBABILITY) {
      queue.push(i);
    }
  }
  shuffle(queue);
  for (let i = 0, j = queue.length - 1; i < j; i += 2) {
    do_crossover(queue[i], queue[i + 1]);
  }
}

function do_crossover(x, y) {
  child1 = get_child("next", x, y);
  child2 = get_child("previous", x, y);
  population[x] = child1;
  population[y] = child2;
}
function get_child(fun, x, y) {
  solution = new Array();
  let px = Array.from(population[x]);
  let py = Array.from(population[y]);
  let dx, dy;
  let c = px[get_random_int(0, px.length - 1)];
  solution.push(c);
  while (px.length > 1) {
    let selected_function;
    if (fun == "next") {
      selected_function = next;
    }
    if (fun == "previous") {
      selected_function = previous;
    }
    dx = selected_function(px, px.indexOf(c));
    dy = selected_function(py, py.indexOf(c));
    delete_by_value(px, c);
    delete_by_value(py, c);
    c = point_distances[c][dx] < point_distances[c][dy] ? dx : dy;
    solution.push(c);
  }
  return solution;
}
function mutation() {
  for (let i = 0; i < POPULATION_SIZE; i++) {
    if (Math.random() < MUTATION_PROBABILITY) {
      if (Math.random() > 0.5) {
        population[i] = push_mutate(population[i]);
      } else {
        population[i] = do_mutate(population[i]);
      }
      //i--;
    }
  }
}

function do_mutate(seq) {
  // m and n refers to the actual index in the array
  // m range from 0 to length-2, n range from 2...length-m
  do {
    m = get_random_int(0, seq.length - 2 - 1);
    n = get_random_int(0, seq.length - 1);
  } while (m >= n);

  for (let i = 0, j = (n - m + 1) >> 1; i < j; i++) {
    swap(seq, m + i, n - i);
  }
  return seq;
}
function push_mutate(seq) {
  let m, n;
  do {
    m = get_random_int(0, (seq.length - 1) >> 1);
    n = get_random_int(0, seq.length - 1);
  } while (m >= n);

  let s1 = seq.slice(0, m);
  let s2 = seq.slice(m, n);
  let s3 = seq.slice(n, seq.length);
  return Array.from(s2.concat(s1).concat(s3));
}
function get_lowest_distance_of_population() {
  for (let i = 0; i < population.length; i++) {
    population_distances[i] = calculate_individual_distance(population[i]);
  }

  let population_distances_index = 0;
  let shortest_distance = population_distances[0];

  for (let i = 1; i < population.length; i++) {
    if (population_distances[i] < shortest_distance) {
      shortest_distance = population_distances[i];
      population_distances_index = i;
    }
  }

  let current_shortest_individual = {
    // There is 1-1 correspondence between population array and population distances array
    population_index: population_distances_index,
    shortest_distance: shortest_distance,
  };

  if (
    shortest_individual.shortest_distance === undefined ||
    shortest_individual.shortest_distance >
      current_shortest_individual.shortest_distance
  ) {
    shortest_individual_array = Array.from(
      population[current_shortest_individual.population_index]
    );
    shortest_individual.shortest_distance =
      current_shortest_individual.shortest_distance;
  }
}

function set_roulette() {
  //calculate all the fitness
  for (let i = 0; i < population_distances.length; i++) {
    fitness_values[i] = 1.0 / population_distances[i];
  }
  //set the roulette
  let sum = 0;
  for (let i = 0; i < fitness_values.length; i++) {
    sum += fitness_values[i];
  }
  for (let i = 0; i < roulette.length; i++) {
    roulette[i] = fitness_values[i] / sum;
  }
  // Creates CDF
  for (let i = 1; i < roulette.length; i++) {
    roulette[i] += roulette[i - 1];
  }
}

function wheel_out(rand) {
  let i;
  for (i = 0; i < roulette.length; i++) {
    if (rand <= roulette[i]) {
      return i;
    }
  }
}
