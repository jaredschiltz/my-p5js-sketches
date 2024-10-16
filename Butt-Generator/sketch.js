let butt_color;

function setup() {
  createCanvas(400, 400);
  butt_color = color(255, 186, 128);
  noLoop();
}

function draw() {
  background(255);
  noStroke();
  fill(butt_color);
  let center_point = width / 2 + random(-20, 20);
  let radius = random(center_point / 4, center_point / 2);
  let left_cheek = center_point - radius * 0.8;
  let right_cheek = center_point + radius * 0.8;
  let height_cheek = random(height / 4, height / 2);
  arc(left_cheek, height_cheek, radius * 2, radius * 2, 0, PI);
  arc(right_cheek, height_cheek, radius * 2, radius * 2, 0, PI);
  beginShape();
  vertex(left_cheek - radius + 0.1 * radius, 0);
  vertex(left_cheek - radius, height_cheek);
  vertex(right_cheek + radius, height_cheek);
  vertex(right_cheek + radius - 0.1 * radius, 0);
  endShape(CLOSE);
}
