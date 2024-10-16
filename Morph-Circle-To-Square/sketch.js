let points = 100;
let circle_array;
let circle_radius;
let square_array;
let square_width;
let delta = 0.004;
let count_up_down = 1;
let current_interp_value = 0;
let num_shapes = 50

function setup() {
  createCanvas(400, 400);
  circle_array = new Array();
  square_array = new Array();
  square_width = floor(width * 0.99);
  //create square array
  let square_radius = sqrt((width / 2.0) ** 2 + (height / 2.0) ** 2);
  for (i = 0; i < points; i++) {
    let x = square_radius * cos((i / points) * TWO_PI);
    x = constrain(x, -square_width / 2, square_width / 2);
    let y = square_radius * sin((i / points) * TWO_PI);
    y = constrain(y, -square_width / 2, square_width / 2);
    square_array.push(createVector(x, y));
  }
  //create circle array
  circle_radius = width * 0.1;
  for (i = 0; i < points; i++) {
    let x = circle_radius * cos((i / points) * TWO_PI);
    let y = circle_radius * sin((i / points) * TWO_PI);
    circle_array.push(createVector(x, y));
  }
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  noFill();
  stroke(0);
  strokeWeight(1);
  if (count_up_down == 1) {
    if (current_interp_value >= 1.0) {
      count_up_down = 0;
      current_interp_value = 1.0;
    } else {
      current_interp_value += delta;
    }
  } else {
    if (current_interp_value <= 0.0) {
      count_up_down = 1;
      current_interp_value = 0.0;
    } else {
      current_interp_value -= delta;
    }
  }

  for (let s = 1; s <= num_shapes; s++) {
    beginShape();
    for (let i = 0; i < points; i++) {
      
      vertex(
        lerp(
          (s / num_shapes) * circle_array[i].x,
          (s / num_shapes) * square_array[i].x,
          current_interp_value
        ),
        lerp(
          (s / num_shapes) * circle_array[i].y,
          (s / num_shapes) * square_array[i].y,
          current_interp_value
        )
      );
      
    }
    endShape(CLOSE);
  }
  /*
  beginShape()
  for(let i = 0; i < points; i++) {
    vertex(square_array[i].x,square_array[i].y )
  }
  endShape(CLOSE)
    beginShape()
  for(let i = 0; i < points; i++) {
    vertex(circle_array[i].x,circle_array[i].y )
  }
  endShape(CLOSE)
  */
}
