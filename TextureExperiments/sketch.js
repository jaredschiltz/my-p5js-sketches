let img;
let img_width;
let img_height;

function preload() {
  img = loadImage("Texture.jpeg");
}

function setup() {
  createCanvas(450, 800);
  img_width = img.width;
  img_height = img.height;
  noLoop();
}

function draw() {
  background(0);
  colorMode(HSB);
  image(img, 0, 0);
  noStroke();
  let transparency = 0.08;
  for (let n = 0; n < 10; n++) {
    fill(random(0, 360), 100, 100, transparency);
    for (let i = 0; i < 30; i++) {
      let octogon = make_octogon(random(0, width), random(0, height), 50);
      octogon = blob_the_polygon(octogon, 0.1, 30, 20);
      octogon = blob_the_polygon(octogon, 0.1, 20, 10);
      octogon = blob_the_polygon(octogon, 0.1, 5, 4);
      octogon = blob_the_polygon(octogon, 0.1, 1, 2);

      beginShape();
      for (let v = 0; v < octogon.length; v++) {
        vertex(octogon[v].x, octogon[v].y);
      }
      endShape();
    }
  }
  /*
  for (cols = 0; cols < 10; cols++) {
    fill((cols * 360) / 10, 100, 100, 0.03);
    for (let i = 0; i < 30; i++) {
      let rect_vertices = [
        createVector(0, 10),
        createVector(100, 10),
        createVector(100, height),
        createVector(0, height),
      ];
      rect_vertices = blob_the_polygon(rect_vertices, 0.1, 10, 5);
      rect_vertices = blob_the_polygon(rect_vertices, 0.1, 10, 4);
      rect_vertices = blob_the_polygon(rect_vertices, 0.1, 1, 2);

      beginShape();
      for (let v = 0; v < rect_vertices.length; v++) {
        vertex(rect_vertices[v].x, rect_vertices[v].y);
      }
      endShape();
    }
    translate(50, 0);
  }
  */
}

// Standard deviation of mid-point should be a value between 0.0 and 0.25
function blob_the_polygon(
  vertices,
  mid_point_std_deviation,
  perpendicular_mean_length,
  perpendicular_std_deviation_length
) {
  // Find all the midpoints between each set of vertices
  // Also, compute the perpendicular vector
  // Assumes vertices are in clock-wise order
  let mid_point_random = new Array(vertices.length);
  mid_point_random.fill(0);
  mid_point_random = mid_point_random.map((_x) =>
    constrain(randomGaussian(0.5, mid_point_std_deviation), 0, 1)
  );

  let mid_points = Array(vertices.length);
  for (let m = 0; m < vertices.length - 1; m++) {
    mid_points[m] = find_mid_point(
      vertices[m],
      vertices[m + 1],
      mid_point_random[m]
    );
  }
  mid_points[vertices.length - 1] = find_mid_point(
    vertices[vertices.length - 1],
    vertices[0],
    mid_point_random[vertices.length - 1]
  );

  let perp_magnitude_random = new Array(vertices.length);
  perp_magnitude_random.fill(0);
  perp_magnitude_random = perp_magnitude_random.map(
    (_x) =>
      randomGaussian(
        perpendicular_mean_length,
        perpendicular_std_deviation_length
      ),
    0,
    1
  );

  let perp_vectors = Array(vertices.length);
  for (let v = 0; v < vertices.length - 1; v++) {
    perp_vectors[v] = find_perpendicular_vector(
      vertices[v],
      vertices[v + 1],
      perp_magnitude_random[v]
    );
  }
  perp_vectors[vertices.length - 1] = find_perpendicular_vector(
    vertices[vertices.length - 1],
    vertices[0],
    perp_magnitude_random[vertices.length - 1]
  );

  let new_vertices = new Array(vertices.length * 2); // We are doubling the number of vertices that are created
  for (let v = 0; v < new_vertices.length; v++) {
    if (v % 2 == 0) {
      new_vertices[v] = vertices[v / 2];
    } else {
      new_vertices[v] = createVector(
        mid_points[(v - 1) / 2].x + perp_vectors[(v - 1) / 2].x,
        mid_points[(v - 1) / 2].y + perp_vectors[(v - 1) / 2].y
      );
    }
  }
  /*
  // Draw all perpendicular lines
  for (let v = 0; v < vertices.length; v++) {
    stroke(0,0,255)
    line(mid_points[v].x, mid_points[v].y, mid_points[v].x + perp_vectors[v].x , mid_points[v].y + perp_vectors[v].y)

  }

  // Draw all new points
  fill(255,255,0)
  for (let v = 0; v < new_vertices.length; v++) {
    circle(new_vertices[v].x, new_vertices[v].y, 5)
  }
  */
  return new_vertices;
}

// lerp_factor between 0 and 1
function find_mid_point(point1, point2, lerp_factor) {
  let lerp_vector = p5.Vector.lerp(point1, point2, lerp_factor);
  //return createVector((point2.x + point1.x) / 2.0, (point2.y + point1.y) / 2.0)
  return createVector(lerp_vector.x, lerp_vector.y);
}

// Calculates perpendicular vector, normalizes it, and multiplies it by scalar
function find_perpendicular_vector(point1, point2, magnitude) {
  let difference = createVector(0, 0);
  difference.x = point1.x - point2.x;
  difference.y = point1.y - point2.y;
  difference.normalize();
  difference.mult(magnitude);
  return createVector(difference.y * -1.0, difference.x);
}

function make_octogon(x, y, radius) {
  let vertices = new Array(8);
  let angle = 0;
  let angle_increment = PI / 4;
  for (v = 0; v < vertices.length; v++) {
    vertices[v] = createVector(
      x + radius * cos(angle),
      y + radius * sin(angle)
    );
    angle += angle_increment;
  }
  return vertices;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
