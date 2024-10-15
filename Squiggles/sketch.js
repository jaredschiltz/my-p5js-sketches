function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  noLoop();
  angleMode(DEGREES)
  squiggle(70, 8900);
}

function squiggle(radius, length) {
  let current_length = 0;
  let current_angle = 0;
  let points = [];
  let current_point = createVector(radius, 0);
  while (current_length <= length) {
    let new_point = createVector(
      radius * cos(current_angle),
      radius * sin(current_angle)
    );
    points.push(createVector(new_point.x, new_point.y))
    current_length += dist(new_point.x, new_point.y, current_point.x, current_point.y)
    current_point.x = new_point.x
    current_point.y = new_point.y
    current_angle += random(1,1.2)
    radius += random(-1.2,1.2)
 
  }
  translate(width/2,height/2)
  for (let p = 0; p < points.length - 1; p++){
    line(points[p].x, points[p].y, points[p + 1].x, points[p + 1].y,)
  }
}
