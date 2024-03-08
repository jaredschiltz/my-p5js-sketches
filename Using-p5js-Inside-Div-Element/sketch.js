let current_color;
function setup() {
  let p5_container = document.getElementById("Canvas");
  let w = p5_container.clientWidth;
  let h = p5_container.clientHeight;
  let canvas = createCanvas(w, h);
  canvas.parent(p5_container);
  noLoop();
  current_color = color(255);
}

function draw() {
  background(50);
  stroke(0);
  fill(current_color);
  for (let i = 0; i < 10000; i++) {
    fill(current_color);
    rect(random(0, width), random(0, height), 10, 10);
  }
}

function draw_red() {
  current_color = color(255, 0, 0);
  draw();
}
function draw_green() {
  current_color = color(0, 255, 0);
  draw();
}
function draw_blue() {
  current_color = color(0, 0, 255);
  draw();
}
