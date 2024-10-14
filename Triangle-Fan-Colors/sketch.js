function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0);
  let segment_count = constrain(floor(map(mouseY, 0, height, 3, 19)), 0, 360);
  let angle_step = 360 / segment_count;
  let radius = width / 2;
  beginShape(TRIANGLE_FAN);
  vertex(width / 2, height / 2);
  for (let segment = 0; segment <= segment_count; segment++){
     let vx = width / 2 + cos(radians(segment*angle_step)) * radius;
    let vy = height / 2 + sin(radians(segment*angle_step)) * radius;
    vertex(vx, vy);
    fill(segment*angle_step,100,100);
  }
  /*
  for (let angle = 0; angle <= 360; angle += angle_step) {
    let vx = width / 2 + cos(radians(angle)) * radius;
    let vy = height / 2 + sin(radians(angle)) * radius;
    vertex(vx, vy);
    fill(random(0,360),100,100);
  }
  */
  endShape();
}
