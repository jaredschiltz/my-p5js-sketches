let red_px2 = 0;
let red_py2 = 0;
let green_px2 = 0;
let green_py2 = 0;
let yellow_px2 = 0;
let yellow_py2 = 0;
let start = false;

let red_pendulum;
let green_pendulum;
let yellow_pendulum;
let backbuffer;

function preload() {}
function setup() {
  createCanvas(450, 800); //16:9 aspect ratio
  backbuffer = createGraphics(450, 800);
  backbuffer.background(0);
  backbuffer.translate(width / 2.0, height / 2.0);
  background(0);
  red_pendulum = new Pendulum(
    (r1 = 100),
    (r2 = 100),
    (m1 = 10),
    (m2 = 10),
    (a1 = PI / 2),
    (a2 = PI / 2),
    (g = 1.0),
    color(255, 0, 0)
  );

  green_pendulum = new Pendulum(
    (r1 = 100),
    (r2 = 100),
    (m1 = 10),
    (m2 = 10),
    (a1 = PI / 2 + 0.01),
    (a2 = PI / 2 + 0.01),
    (g = 1.0),
    color(0, 255, 0)
  );

  yellow_pendulum = new Pendulum(
    (r1 = 100),
    (r2 = 100),
    (m1 = 10),
    (m2 = 10),
    (a1 = PI / 2 + 0.02),
    (a2 = PI / 2 + 0.02),
    (g = 1.0),
    color(255, 255, 0)
  );

  start = true;
}

function draw() {
  background(0);
  image(backbuffer, 0, 0);
  translate(width / 2.0, height / 2.0);

  red_pendulum.calculate();
  green_pendulum.calculate();
  yellow_pendulum.calculate();

  if (start) {
    red_px2 = red_pendulum.get_x2();
    red_py2 = red_pendulum.get_y2();

    green_px2 = green_pendulum.get_x2();
    green_py2 = green_pendulum.get_y2();

    yellow_px2 = yellow_pendulum.get_x2();
    yellow_py2 = yellow_pendulum.get_y2();
    start = false;
  }

  red_pendulum.show();
  green_pendulum.show();
  yellow_pendulum.show();

  backbuffer.strokeWeight(2);
  backbuffer.stroke(red_pendulum.get_color());
  backbuffer.line(
    red_px2,
    red_py2,
    red_pendulum.get_x2(),
    red_pendulum.get_y2()
  );

  backbuffer.stroke(green_pendulum.get_color());
  backbuffer.line(
    green_px2,
    green_py2,
    green_pendulum.get_x2(),
    green_pendulum.get_y2()
  );

  backbuffer.stroke(yellow_pendulum.get_color());
  backbuffer.line(
    yellow_px2,
    yellow_py2,
    yellow_pendulum.get_x2(),
    yellow_pendulum.get_y2()
  );

  red_pendulum.update();
  green_pendulum.update();
  yellow_pendulum.update();

  red_px2 = red_pendulum.get_x2();
  red_py2 = red_pendulum.get_y2();

  green_px2 = green_pendulum.get_x2();
  green_py2 = green_pendulum.get_y2();

  yellow_px2 = yellow_pendulum.get_x2();
  yellow_py2 = yellow_pendulum.get_y2();
}
