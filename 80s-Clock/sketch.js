let sec_color_color;
let minute_color;
let hour_color;
let h;
let m;
let s;
let signature;

function preload() {}

function setup() {
  createCanvas(400, 711);
  sec_color_color = color(240, 80, 147);
  minute_color = color(144, 85, 244);
  hour_color = color(156, 255, 103);
  h = 0;
  m = 0;
  s = 0;
}

function draw() {
  background(0);
  //frameRate(60)
  let s = second();
  let m = minute();
  let h = hour();
  /*
  s = (s + 1) % 60
  if (s == 0) {
    m = (m + 1) % 60
  }
  if (m == 0) {
    h = (h + 1) % 12
  }
  */
  stroke(255);
  fill(255);
  noFill();
  strokeWeight(8);
  stroke(sec_color_color);
  let s_angle = map(s, 0, 59, -PI / 2, (3 / 4) * TWO_PI - TWO_PI / 60);
  let s_radius = 115;
  arc(width / 2, height / 2, width * 0.9, width * 0.9, -PI / 2, s_angle, OPEN);
  push();
  translate(width / 2, height / 2);
  line(0, 0, s_radius * cos(s_angle), s_radius * sin(s_angle));
  pop();

  let m_angle = map(m, 0, 59, -PI / 2, (3 / 4) * TWO_PI - TWO_PI / 60);
  let m_radius = 90;
  stroke(minute_color);
  arc(width / 2, height / 2, width * 0.8, width * 0.8, -PI / 2, m_angle, OPEN);
  push();
  translate(width / 2, height / 2);
  line(0, 0, m_radius * cos(m_angle), m_radius * sin(m_angle));
  pop();

  stroke(hour_color);
  let h_angle = map(h % 12, 0, 11, -PI / 2, (3 / 4) * TWO_PI - TWO_PI / 12);
  let h_radius = 65;
  arc(width / 2, height / 2, width * 0.7, width * 0.7, -PI / 2, h_angle, OPEN);
  push();
  translate(width / 2, height / 2);
  line(0, 0, h_radius * cos(h_angle), h_radius * sin(h_angle));
  pop();

  /*
  noStroke()
  fill(255)
  text('Current sec_color:' + s, 5, 50);
  text('Current minute:' + m, 5, 100);
  text('Current hour:' + h % 12, 5, 150);
  */
}
