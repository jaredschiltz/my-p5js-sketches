let MIN_BOX_WIDTH = 7;
let MIN_BOX_HEIGHT = 7;
let MIN_PERCENT = 0.25
let MAX_PERCENT = 0.75
function setup() {
  createCanvas(405, 720);
  colorMode(HSB);
  noLoop();
}

function draw() {
  background(220);
  stroke(0)
  smooth()
  draw_rectangle(MIN_PERCENT,MAX_PERCENT,0,0,width,height)
  filter(BLUR,2)
}

function draw_rectangle(a, b, x, y, box_width, box_height) {
  if (box_width < MIN_BOX_WIDTH) {
    return;
  }
  if (box_height < MIN_BOX_HEIGHT) {
    return;
  }
  fill(random(0,360),random(50,100),random(50,100),1)
  rect(x,y, box_width, box_height)
  if (box_width > box_height) {
    let new_width = box_width * random(a, b);
    draw_rectangle(a, b, x, y, new_width, box_height);
    draw_rectangle(a, b, x + new_width, y, box_width - new_width, box_height);
  } else {
    let new_height = box_height * random(a, b);
    draw_rectangle(a, b, x, y, box_width, new_height);
    draw_rectangle(a, b, x, y + new_height, box_width, box_height - new_height);
  }
}
