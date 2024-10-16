let rotation_matrix;
let scaling_matrix;
let translating_matrix;
let my_cube;
let length = 100;
let theta = 0.03;

function setup() {
  createCanvas(400, 400);
  //rotation_matrix = math.matrix([[3, 4], [1, 2]])
  // scaling_matrix = math.matrix([[1, 2], [3, 4]])
  //let result = math.multiply(rotation_matrix, scaling_matrix)
  //print(result.toArray()[1][1])
  my_cube = new Array(4);
  my_cube[0] = math.matrix([[0], [0], [1]]);
  my_cube[1] = math.matrix([[length], [0], [1]]);
  my_cube[2] = math.matrix([[length], [length], [1]]);
  my_cube[3] = math.matrix([[0], [length], [1]]);

  // Let try scaling
  /*
  for (let i = 0; i < my_cube.length; i++) {
    my_cube[i] = math.multiply(make_scaling_matrix(2, 2), my_cube[i] )
  }
  */

  // Let try translating
  for (let i = 0; i < my_cube.length; i++) {
    my_cube[i] = math.multiply(
      make_translation_matrix(-length / 2.0, -length / 2.0),
      my_cube[i]
    );
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  stroke(0, 255, 0);
  fill(0, 255, 0);

  // Do a rotation
  for (let i = 0; i < my_cube.length; i++) {
    my_cube[i] = math.multiply(make_rotation_matrix(theta),my_cube[i]);
  }

  for (let i = 0; i < my_cube.length; i++) {
    ellipse(my_cube[i].toArray()[0][0], my_cube[i].toArray()[1][0], 10, 10);
    line(
      my_cube[i].toArray()[0][0],
      my_cube[i].toArray()[1][0],
      my_cube[(i + 1) % 4].toArray()[0][0],
      my_cube[(i + 1) % 4].toArray()[1][0]
    );
  }
}

function make_rotation_matrix(theta) {
  return math.matrix([
    [cos(theta), -sin(theta), 0],
    [sin(theta), cos(theta), 0],
    [0, 0, 1],
  ]);
}

function make_translation_matrix(tx, ty) {
  return math.matrix([
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1],
  ]);
}

function make_scaling_matrix(sx, sy) {
  return math.matrix([
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
  ]);
}
