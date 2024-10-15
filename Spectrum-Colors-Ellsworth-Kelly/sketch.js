let colors;

function setup() {
  createCanvas(400, 400);
  colors = [
    color(1, 85, 52),
    color(0, 132, 56),
    color(254, 234, 13),
    color(66, 56, 119),
    color(56, 41, 70),
    color(44, 31, 61),
    color(0, 83, 135),
    color(142, 146, 145),
    color(145, 149, 152),
    color(133, 137, 140),
    color(195, 204, 0),
    color(0, 122, 181),
    color(255, 235, 26),
    color(235, 117, 69),
    color(209, 202, 0),
    color(1, 109, 181),
    color(194, 143, 186),
    color(0, 55, 109),
    color(245, 174, 188),
    color(255, 237, 33),
    color(255, 204, 1),
    color(105, 44, 111),
    color(0, 57, 40),
    color(10, 39, 99),
    color(196, 1, 43),
    color(233, 97, 101),
    color(233, 93, 14),
    color(0, 89, 149),
    color(63, 23, 73),
    color(5, 44, 109),
    color(59, 51, 134),
    color(193, 44, 66),
    color(1, 43, 93),
    color(7, 7, 9),
    color(247, 171, 0),
    color(227, 0, 27),
    color(1, 97, 59),
    color(1, 130, 47),
    color(248, 249, 243),
  ];
  noLoop();
}

function draw() {
  background(220);
  noStroke();
  let num_of_cells_per_width = 40;
  let pixels_per_cell = width / num_of_cells_per_width;
  for (let row = 0; row < num_of_cells_per_width; row++) {
    for (let col = 0; col < num_of_cells_per_width; col++) {
      // get random index value
      let randomIndex = Math.floor(Math.random() * colors.length);
      // get random item
      let item = colors[randomIndex];
      fill(item);
      rect(
        col * pixels_per_cell,
        row * pixels_per_cell,
        pixels_per_cell,
        pixels_per_cell
      );
    }
  }
  // Draw in white squares around edges with probability
  white_color = color(237, 230, 213);
  let max_distance = ceil(dist(0, 0, width / 2, height / 2));
  for (let row = 0; row < num_of_cells_per_width; row++) {
    for (let col = 0; col < num_of_cells_per_width; col++) {
      let distance = dist(
        col * pixels_per_cell,
        row * pixels_per_cell,
        width / 2,
        height / 2
      );
      let probability = distance / max_distance;
      if (random() < probability) {
        fill(white_color);
        rect(
          col * pixels_per_cell,
          row * pixels_per_cell,
          pixels_per_cell,
          pixels_per_cell
        );
      }
    }
  }
  
  // Draw border of white
  rect(0,0,width,pixels_per_cell)
  rect(0,height - pixels_per_cell,width,height-pixels_per_cell)
  rect(0,0,pixels_per_cell, height)
  rect(0,0,pixels_per_cell, height)
  rect(width-pixels_per_cell, 0, pixels_per_cell, height)
}
