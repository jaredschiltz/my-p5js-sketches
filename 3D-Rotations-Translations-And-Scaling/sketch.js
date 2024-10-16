let rotation_matrix;
let scaling_matrix;
let translating_matrix;
let ortho_projection_matrix;
let my_cube;
let speed_multiplier = 3.0
let length = 100;
let x_theta = 0.01 * speed_multiplier;
let y_theta = 0.02 * speed_multiplier;
let z_theta = 0.03 * speed_multiplier;

function setup() {
  createCanvas(400, 733);
  my_cube = new Array(4);
  my_cube[0] = math.matrix([[0], [0], [0], [1]]);
  my_cube[1] = math.matrix([[length], [0], [0], [1]]);
  my_cube[2] = math.matrix([[length], [length], [0], [1]]);
  my_cube[3] = math.matrix([[0], [length], [0], [1]]);
  my_cube[4] = math.matrix([[0], [0], [length], [1]]);
  my_cube[5] = math.matrix([[length], [0], [length], [1]]);
  my_cube[6] = math.matrix([[0], [length], [length], [1]]);
  my_cube[7] = math.matrix([[length], [length], [length], [1]]);

  ortho_projection_matrix = math.matrix([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
  ]);
  // Let try scaling
  /*
  for (let i = 0; i < my_cube.length; i++) {
    my_cube[i] = math.multiply(make_scaling_matrix(0.5, 0.5, 0.5), my_cube[i] )
  }
  */

  // Let try translating

  for (let i = 0; i < my_cube.length; i++) {
    my_cube[i] = math.multiply(
      make_translation_matrix(-length / 2.0, -length / 2.0, -length / 2.0),
      my_cube[i]
    );
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  strokeWeight(4);
  let random_color = createVector(random(0,255), random(0,255), random(0,255))
  stroke(random_color.x, random_color.y, random_color.z);
  fill(random_color.x, random_color.y, random_color.z);

  
  // Do a rotation
  for (let i = 0; i < my_cube.length; i++) {
    my_cube[i] = math.multiply(make_rotation_z_matrix(z_theta), my_cube[i]);
    my_cube[i] = math.multiply(make_rotation_y_matrix(y_theta), my_cube[i]);
    my_cube[i] = math.multiply(make_rotation_x_matrix(x_theta), my_cube[i]);
  }

  for (let i = 0; i < my_cube.length; i++) {
    let projection = math.multiply(ortho_projection_matrix, my_cube[i]);
    ellipse(projection.toArray()[0][0], projection.toArray()[1][0], 10, 10);
  }
  // draw all the edges of the cube
  line(
    my_cube[0].toArray()[0][0],
    my_cube[0].toArray()[1][0],
    my_cube[1].toArray()[0][0],
    my_cube[1].toArray()[1][0]
  );
  line(
    my_cube[1].toArray()[0][0],
    my_cube[1].toArray()[1][0],
    my_cube[2].toArray()[0][0],
    my_cube[2].toArray()[1][0]
  );
  line(
    my_cube[2].toArray()[0][0],
    my_cube[2].toArray()[1][0],
    my_cube[3].toArray()[0][0],
    my_cube[3].toArray()[1][0]
  );
  line(
    my_cube[3].toArray()[0][0],
    my_cube[3].toArray()[1][0],
    my_cube[0].toArray()[0][0],
    my_cube[0].toArray()[1][0]
  );
    line(
    my_cube[4].toArray()[0][0],
    my_cube[4].toArray()[1][0],
    my_cube[5].toArray()[0][0],
    my_cube[5].toArray()[1][0]
  );
      line(
    my_cube[5].toArray()[0][0],
    my_cube[5].toArray()[1][0],
    my_cube[7].toArray()[0][0],
    my_cube[7].toArray()[1][0]
  );
        line(
    my_cube[7].toArray()[0][0],
    my_cube[7].toArray()[1][0],
    my_cube[6].toArray()[0][0],
    my_cube[6].toArray()[1][0]
  );
          line(
    my_cube[6].toArray()[0][0],
    my_cube[6].toArray()[1][0],
    my_cube[4].toArray()[0][0],
    my_cube[4].toArray()[1][0]
  );
            line(
    my_cube[0].toArray()[0][0],
    my_cube[0].toArray()[1][0],
    my_cube[4].toArray()[0][0],
    my_cube[4].toArray()[1][0]
  );
              line(
    my_cube[1].toArray()[0][0],
    my_cube[1].toArray()[1][0],
    my_cube[5].toArray()[0][0],
    my_cube[5].toArray()[1][0]
  );
                line(
    my_cube[2].toArray()[0][0],
    my_cube[2].toArray()[1][0],
    my_cube[7].toArray()[0][0],
    my_cube[7].toArray()[1][0]
  );
                  line(
    my_cube[3].toArray()[0][0],
    my_cube[3].toArray()[1][0],
    my_cube[6].toArray()[0][0],
    my_cube[6].toArray()[1][0]
  );
}

function make_rotation_z_matrix(theta) {
  return math.matrix([
    [cos(theta), -sin(theta), 0, 0],
    [sin(theta), cos(theta), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ]);
}

function make_rotation_x_matrix(theta) {
  return math.matrix([
    [1, 0, 0, 0],
    [0, cos(theta), -sin(theta), 0],
    [0, sin(theta), cos(theta), 0],
    [0, 0, 0, 1],
  ]);
}

function make_rotation_y_matrix(theta) {
  return math.matrix([
    [cos(theta), 0, sin(theta), 0],
    [0, 1, 0, 0],
    [-sin(theta), 0, cos(theta), 0],
    [0, 0, 0, 1],
  ]);
}

function make_translation_matrix(tx, ty, tz) {
  return math.matrix([
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1],
  ]);
}

function make_scaling_matrix(sx, sy, sz) {
  return math.matrix([
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1],
  ]);
}
