let led_sec_1;
let led_sec_2;
let led_min_1;
let led_min_2;
let led_hour_1;
let led_hour_2;
let on_color;
let off_color;
let spacing;
let TWENTY_FOUR_HOUR_TIME = false;
let dots_on = false;
let dots_blinking = false;
let counter = 0;
function setup() {
  createCanvas(405, 720);
  spacing = width / 10;
  on_colour = color(255, 0, 0);
  off_colour = color(40);
  led_sec_1 = new LED(7 * spacing, height / 4, 0.25, on_colour, off_colour);
  led_sec_1.set_number(0);
  led_sec_2 = new LED(8 * spacing, height / 4, 0.25, on_colour, off_colour);
  led_sec_2.set_number(0);

  led_min_1 = new LED(4 * spacing, height / 4, 0.25, on_colour, off_colour);
  led_min_1.set_number(0);
  led_min_2 = new LED(5 * spacing, height / 4, 0.25, on_colour, off_colour);
  led_min_2.set_number(0);

  led_hr_1 = new LED(1 * spacing, height / 4, 0.25, on_colour, off_colour);
  led_hr_1.set_number(0);
  led_hr_2 = new LED(2 * spacing, height / 4, 0.25, on_colour, off_colour);
  led_hr_2.set_number(0);
}

function draw() {
  background(20);

  led_sec_1.set_number((second() - (second() % 10)) / 10);
  led_sec_2.set_number(second() % 10);
  led_sec_1.show();
  led_sec_2.show();

  led_min_1.set_number((minute() - (minute() % 10)) / 10);
  led_min_2.set_number(minute() % 10);
  led_min_1.show();
  led_min_2.show();

  let hr = hour();
  if (!TWENTY_FOUR_HOUR_TIME) {
    hr = hr % 12;
    if (hr == 0) {
      hr = 12;
    }
  }

  led_hr_1.set_number((hr - (hr % 10)) / 10);
  led_hr_2.set_number(hr % 10);
  led_hr_1.show();
  led_hr_2.show();
  if (dots_blinking) {
    if (counter < frameRate() * 0.5) {
      counter += 1;
    } else {
      dots_on = !dots_on;
      counter = 0;
    }

    if (dots_on) {
      fill(on_colour);
    } else {
      fill(off_colour);
    }
  }
  else {
    fill(on_colour);
  }
 
  circle(3 * spacing + spacing / 2, height/4 + 12, 12);
  circle(3 * spacing + spacing / 2, height/4 + 45, 12);
  circle(6 * spacing + spacing / 2, height/4 + 12, 12);
  circle(6 * spacing + spacing / 2, height/4 + 45, 12);
}
