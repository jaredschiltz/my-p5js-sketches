/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

const cells_per_width = 100;
const noise_increment = 0.035;
let cell_width;
let noise_array;
let arrow_point_size;
let flow_line_color;
const flow_step_size = 10;
const flow_line_width = 1;
const max_number_line_segments = 10
const show_vector_field = false;

let flow_line_object_array = [];
let number_of_flow_lines = 1000;

function setup() {
  createCanvas(512, 512, SVG);
  //createCanvas(512, 512);
  background(0);
  cell_width = width / cells_per_width;
  noise_array = Array(cells_per_width)
    .fill()
    .map(() => Array(cells_per_width).fill(0));
  let yoff = 0.1;

  for (let row = 0; row < cells_per_width; row++) {
    let xoff = 0.0;
    for (let col = 0; col < cells_per_width; col++) {
      let angle = noise(xoff, yoff) * TWO_PI;
      let vec = p5.Vector.fromAngle(angle);
      vec.setMag(cell_width / 2);
      noise_array[row][col] = vec;
      xoff += noise_increment;
    }
    yoff += noise_increment;
  }

  arrow_point_size = (0.25 * cell_width) / 2;

  flow_line_color = color(0, 0, 0);

  // Generate Flow Lines
  for (let i = 0; i < number_of_flow_lines; i++) {
    let x_pos = floor((random(0,width) / width) * cells_per_width);
    let y_pos = floor((random(0,width)/ width) * cells_per_width);
    flow_line_object_array.push(
      new FlowLine(
        createVector(
          x_pos * cell_width + cell_width / 2,
          y_pos * cell_width + cell_width / 2
        ),
        flow_step_size,
        max_number_line_segments,
        flow_line_width,
        flow_line_color,
        noise_array,
        cells_per_width,
        width
      )
    );
  }
  noLoop();
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  if (show_vector_field) {
    for (let row = 0; row < cells_per_width; row++) {
      for (let col = 0; col < cells_per_width; col++) {
        //rect(col * cell_width, row * cell_width, cell_width, cell_width)

        // draw arrow
        // (1) main line
        let arrow_start_vector = createVector(
          col * cell_width + cell_width / 2,
          row * cell_width + cell_width / 2
        );
        let arrow_end_vector = p5.Vector.add(
          arrow_start_vector,
          createVector(noise_array[row][col].x, noise_array[row][col].y)
        );
        line(
          arrow_start_vector.x,
          arrow_start_vector.y,
          arrow_end_vector.x,
          arrow_end_vector.y
        );

        // (2) arrow points
        let arrow_vector = p5.Vector.sub(arrow_end_vector, arrow_start_vector);
        let arrow_point_scaling_factor = 0.4; // arrow point lengths as fraction of main arrow length
        arrow_vector.mult(-1.0 * arrow_point_scaling_factor);
        arrow_vector.rotate(PI / 4);
        let arrow_point_vector_1 = p5.Vector.add(
          arrow_end_vector,
          arrow_vector
        );
        line(
          arrow_end_vector.x,
          arrow_end_vector.y,
          arrow_point_vector_1.x,
          arrow_point_vector_1.y
        );
        arrow_vector.rotate(-PI / 2);
        let arrow_point_vector_2 = p5.Vector.add(
          arrow_end_vector,
          arrow_vector
        );
        line(
          arrow_end_vector.x,
          arrow_end_vector.y,
          arrow_point_vector_2.x,
          arrow_point_vector_2.y
        );
      }
    }
  }
  for (let i = 0; i < flow_line_object_array.length; i++) {
    flow_line_object_array[i].show();
  }

  
}

function mouseClicked() {
  /*
  let mouse_x_pos = floor((mouseX / width) * cells_per_width);
  let mouse_y_pos = floor((mouseY / width) * cells_per_width);
  flow_line_object_array.push(
    new FlowLine(
      createVector(
        mouse_x_pos * cell_width + cell_width / 2,
        mouse_y_pos * cell_width + cell_width / 2
      ),
      flow_step_size,
      max_number_line_segments,
      flow_line_width,
      flow_line_color,
      noise_array,
      cells_per_width,
      width
    )
  );
  */
}

function keyPressed() {
   save("perlin-noise-flow-field.svg"); // give file name
}
