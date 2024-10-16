function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  line_spacing = 15;
  stroke_width = 5;

  strokeWeight(stroke_width);
  strokeCap(SQUARE);
  colors = [
    color(139, 99, 148),
    color(236, 111, 88),
    color(73, 98, 190)
  ];
  background(240, 240, 232);

  for (i = 0; i < 8; i++) {
    push();
    translate(width/2,height/2)
    rotate(i*PI/4)
        translate(-width/2,-height/2)

    line1_pt1 = createVector(
      random(0, width / 4),
      random(height / 4, height / 2)
    );
    line1_pt2 = createVector(
      random(width / 4, width / 2),
      random(0, width / 4)
    );
    line1_connecting_pt = createVector(
      random(width / 4, (width * 3) / 4),
      random(height / 2, (height * 3) / 4)
    );
    push();
    for (let i = 0; i < random(2, 5); i++) {
      stroke(colors[Math.floor(Math.random() * colors.length)]);
      line(line1_pt1.x, line1_pt1.y, line1_pt2.x, line1_pt2.y);
      line(
        (line1_pt1.x + line1_pt2.x) / 2.0,
        (line1_pt1.y + line1_pt2.y) / 2.0,
        line1_connecting_pt.x,
        line1_connecting_pt.y
      );
      translate(line_spacing, 0);
    }

    pop();
    
    pop()
  }

  /*
  random_width = random(width / 8, (width * 4) / 10);

  lines_per_group = floor(random(min_line_per_group, max_lines_per_group));
  for (i = 0; i < lines_per_group; i++) {
    stroke(colors[Math.floor(Math.random() * colors.length)]);

    line(-1.0 * random_width, i * line_spacing, random_width, i * line_spacing);
  }
  */
}
