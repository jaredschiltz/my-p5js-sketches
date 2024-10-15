let dot_array;
const num_dots = 8;

function setup() {
  createCanvas(600, 600);
  dot_array = new Array(num_dots);
  for (i = 0; i < num_dots; i++) {
    dot_array[i] = new Dot(0, 0, height / 2, 0.02, i * 12.95, 50, color(255, 87, 51));
  }
}

function draw() {
  background(0);
  noStroke();
  fill(20);
  ellipse(width / 2, height / 2, width);
  translate(width / 2, height / 2);
  for (i = 0; i < num_dots; i++) {
    push()
        rotate((i * PI) / num_dots);
    strokeWeight(2);
    stroke(80);
    line(0, -width / 2, 0, width / 2);
    pop()
    
  }
  for (i = 0; i < num_dots; i++) {
    push();
    rotate((i * PI) / num_dots);

    dot_array[i].update();
    dot_array[i].show();

    pop();
  }
}

// you can put it in the mousePressed function,
// or keyPressed for example
function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('mySketch', 7);
  }
}
