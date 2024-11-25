const WIDTH_HEIGHT = 800;
let transparent_color;
const SHAPE_SCALE_MAX = 0.1;
const SHAPE_SCALE_MIN = 0.4;
const COLOR_PALETTE = ["#F569C4", "#03CAFC", "#06FC9E", "#B768FC", "#FFFB8D"];

function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  transparent_color = color("#FFFFFF00");
  noLoop();
}

function draw() {
  background(transparent_color);
  //background("#FFFFFF");
  // Create Particle Path
  let x_margin = 100;
  let y_margin = 100;
  paper.setup();
  let path = new paper.Path({
    segments: [
      [0, y_margin / 2],
      [width - x_margin, 200],
      [x_margin * 1, 300],
      [width - x_margin, 600],
      [x_margin, height - y_margin],
    ],
    strokeColor: "black",
    closed: false,
  });
  path.simplify(1);
  // find all of the points on the path
  let num_points = 300;
  for (let i = 0; i < num_points; i++) {
    // Find location of each point along the entire curve
    let offset = map(i, 0, num_points - 1, 0, path.length);
    let { x, y } = path.getPointAt(offset);
    /*
    fill(0);
    noStroke();
    ellipse(x, y, 5, 5);
    stroke(255, 0, 0);
    noFill();
    */
    let normal_vector = path.getNormalAt(offset);
    /*
    line(x, y, x + 30 * normal_vector.x, y + 20 * normal_vector.y);
    line(x, y, x + -30 * normal_vector.x, y + -20 * normal_vector.y);
    */
    let normal_offset_amount = map(y, 0, height, 10, 150);
    // Want the shapes to get more sparse as they approach the bottom
    if (random() ** 1.6 < 1 - i / (num_points - 1)) {
      draw_shape(
        x +
          random(-normal_offset_amount, normal_offset_amount) * normal_vector.x,
        y +
          random(-normal_offset_amount, normal_offset_amount) * normal_vector.y,
        map(y, 0, height, 0.05, 0.3),
        random(0, TWO_PI),
        color(COLOR_PALETTE[floor(random(COLOR_PALETTE.length))])
      );
    }
  }

  /* Draw triangles
  for (let i = 0; i < 540; i++) {
    draw_shape(
      random(0, width),
      random(0, height),
      random(0.1, 0.3),
      random(0, TWO_PI),
      color(COLOR_PALETTE[floor(random(COLOR_PALETTE.length))])
    );
  }
    */
}

function draw_shape(x, y, scale_factor, rotation, colour) {
  push();
  translate(x, y);
  scale(scale_factor);
  rotate(rotation);
  noStroke();
  fill(colour);
  beginShape();
  let xoffset = -100;
  let yoffset = -100;
  vertex(100 + xoffset, 50.46 + yoffset);
  bezierVertex(
    129.565 + xoffset,
    50.46 + yoffset,
    203.477 + xoffset,
    123.853 + yoffset,
    188.695 + xoffset,
    138.531 + yoffset
  );
  bezierVertex(
    173.912 + xoffset,
    153.21 + yoffset,
    26.088 + xoffset,
    153.21 + yoffset,
    11.305 + xoffset,
    138.531 + yoffset
  );
  bezierVertex(
    -3.477 + xoffset,
    123.853 + yoffset,
    70.435 + xoffset,
    50.46 + yoffset,
    100 + xoffset,
    50.46 + yoffset
  );

  endShape();
  pop();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
