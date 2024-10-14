const order = 4;
const border_width = 30;
const road_width = 20;
const tolerance = 1e-4;
let N;
let total;

let path = [];
let outer_curve = []; // this is only used for generating the roads, not for rendering main Hilbert curve which is the 'stripes' in the road

/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

function setup() {
   createCanvas(512, 512, SVG);
  //createCanvas(512, 512);
  background(0);

  N = int(pow(2, order));
  total = N * N;
  let len = (width - 2 * border_width) / N;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }
  noLoop();
}

function draw() {
  background(0);
  translate(border_width, border_width);
  stroke(0);
  strokeWeight(1);
  noFill();

  const num_segments = 4 ** order - 1;

  for (let i = 1; i < num_segments + 1; i++) {
    let h = map(i, 0, path.length, 0, 360);
    //draw main hilbert line (yellow stripe of road)
    stroke("yellow");
     line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);

    // capture all of the points in the path into a list
    // so for rendering other road edges to the side of main line

    if (i == num_segments) {
      // special case at the very end, do not look ahead
      // only two ending cases: up or right
      if (order % 2 == 1) {
        outer_curve.push({
          start_point: { x: path[i - 1].x, y: path[i - 1].y },
          end_point: { x: path[i].x, y: path[i].y },
          orientation: "up",
        });
      } else {
        outer_curve.push({
          start_point: { x: path[i - 1].x, y: path[i - 1].y },
          end_point: { x: path[i].x, y: path[i].y },
          orientation: "right",
        });
      }
    } else {
      if (
        vertical_or_horizontal(
          path[i].x,
          path[i].y,
          path[i - 1].x,
          path[i - 1].y
        ) == "vertical"
      ) {
        //print(`vertical ${i}`)
        let current_midpoint = compute_midpoint_of_segment(
          path[i].x,
          path[i].y,
          path[i - 1].x,
          path[i - 1].y
        );
        let next_midpoint = compute_midpoint_of_segment(
          path[i + 1].x,
          path[i + 1].y,
          path[i].x,
          path[i].y
        );
        if (next_midpoint.y > current_midpoint.y) {
          outer_curve.push({
            start_point: { x: path[i - 1].x, y: path[i - 1].y },
            end_point: { x: path[i].x, y: path[i].y },
            orientation: "down",
          });
        } else {
          outer_curve.push({
            start_point: { x: path[i - 1].x, y: path[i - 1].y },
            end_point: { x: path[i].x, y: path[i].y },
            orientation: "up",
          });
        }
      } else {
        // horizontal
        //print(`horizontal ${i}`)

        let current_midpoint = compute_midpoint_of_segment(
          path[i].x,
          path[i].y,
          path[i - 1].x,
          path[i - 1].y
        );
        let next_midpoint = compute_midpoint_of_segment(
          path[i + 1].x,
          path[i + 1].y,
          path[i].x,
          path[i].y
        );
        if (next_midpoint.x > current_midpoint.x) {
          outer_curve.push({
            start_point: { x: path[i - 1].x, y: path[i - 1].y },
            end_point: { x: path[i].x, y: path[i].y },
            orientation: "right",
          });
        } else {
          outer_curve.push({
            start_point: { x: path[i - 1].x, y: path[i - 1].y },
            end_point: { x: path[i].x, y: path[i].y },
            orientation: "left",
          });
        }
      }
    }
  }

  // draw the edges of the road
  let left_line_pos;
  let right_line_pos;
  const show_left_line = true;
  const show_right_line = true;

  stroke("white");
  if (outer_curve[0].orientation == "right") {
    left_line_pos = {
      x: outer_curve[0].start_point.x,
      y: outer_curve[0].start_point.y - road_width / 2,
    };
    right_line_pos = {
      x: outer_curve[0].start_point.x,
      y: outer_curve[0].start_point.y + road_width / 2,
    };
  } else {
    // "down"
    left_line_pos = {
      x: outer_curve[0].start_point.x + road_width / 2,
      y: outer_curve[0].start_point.y,
    };
    right_line_pos = {
      x: outer_curve[0].start_point.x - road_width / 2,
      y: outer_curve[0].start_point.y,
    };
  }

  for (let i = 0; i < outer_curve.length; i++) {
    if (i == outer_curve.length - 1) {
      // Last segment (No look ahead)
      if (outer_curve[i].orientation == "right") {
        if (show_left_line) {
          line(
            left_line_pos.x,
            left_line_pos.y,
            outer_curve[i].end_point.x,
            outer_curve[i].end_point.y - road_width / 2
          );
        }
        if (show_right_line) {
          line(
            right_line_pos.x,
            right_line_pos.y,
            outer_curve[i].end_point.x,
            outer_curve[i].end_point.y + road_width / 2
          );
        }
      } else {
        //up
        if (show_left_line) {
          line(
            left_line_pos.x,
            left_line_pos.y,
            outer_curve[i].end_point.x - road_width / 2,
            outer_curve[i].end_point.y
          );
        }
        if (show_right_line) {
          line(
            right_line_pos.x,
            right_line_pos.y,
            outer_curve[i].end_point.x + road_width / 2,
            outer_curve[i].end_point.y
          );
        }
      }
    } else {
      // look ahead to see how to draw border edges
      let current_curve = outer_curve[i].orientation;
      let next_curve = outer_curve[i + 1].orientation;
      // 12 combinations of moves
      if (current_curve == "up" && next_curve == "up") {
        let next_x = outer_curve[i].end_point.x - road_width / 2;
        let next_y = outer_curve[i].end_point.y;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
          left_line_pos.x = next_x;
          left_line_pos.y = next_y;
        }
        next_x = outer_curve[i].end_point.x + road_width / 2;
        next_y = outer_curve[i].end_point.y;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "up" && next_curve == "left") {
        let next_x = outer_curve[i].end_point.x - road_width / 2;
        let next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
          left_line_pos.x = next_x;
          left_line_pos.y = next_y;
        }
        next_x = outer_curve[i].end_point.x + road_width / 2;
        next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "up" && next_curve == "right") {
        let next_x = outer_curve[i].end_point.x - road_width / 2;
        let next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x + road_width / 2;
        next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "down" && next_curve == "down") {
        let next_x = outer_curve[i].end_point.x + road_width / 2;
        let next_y = outer_curve[i].end_point.y;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x - road_width / 2;
        next_y = outer_curve[i].end_point.y;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "down" && next_curve == "left") {
        let next_x = outer_curve[i].end_point.x + road_width / 2;
        let next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x - road_width / 2;
        next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "down" && next_curve == "right") {
        let next_x = outer_curve[i].end_point.x + road_width / 2;
        let next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x - road_width / 2;
        next_y = outer_curve[i].end_point.y + road_width / 2;
if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
}
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "right" && next_curve == "right") {
      }
      if (current_curve == "right" && next_curve == "up") {
        let next_x = outer_curve[i].end_point.x - road_width / 2;
        let next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x + road_width / 2;
        next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "right" && next_curve == "down") {
        let next_x = outer_curve[i].end_point.x + road_width / 2;
        let next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x - road_width / 2;
        next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "left" && next_curve == "left") {
      }
      if (current_curve == "left" && next_curve == "up") {
        let next_x = outer_curve[i].end_point.x - road_width / 2;
        let next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x + road_width / 2;
        next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
      if (current_curve == "left" && next_curve == "down") {
        let next_x = outer_curve[i].end_point.x + road_width / 2;
        let next_y = outer_curve[i].end_point.y + road_width / 2;
        if (show_left_line) {
          line(left_line_pos.x, left_line_pos.y, next_x, next_y);
        }
        left_line_pos.x = next_x;
        left_line_pos.y = next_y;

        next_x = outer_curve[i].end_point.x - road_width / 2;
        next_y = outer_curve[i].end_point.y - road_width / 2;
        if (show_right_line) {
        line(right_line_pos.x, right_line_pos.y, next_x, next_y);
        }
        right_line_pos.x = next_x;
        right_line_pos.y = next_y;
      }
    }
  }

  // save("hilbert-road-stripes.svg"); // give file name
  
  // save("hilbert-road-left-lane.svg"); // give file name
  //save("hilbert-road-right-lane.svg"); // give file name
}

function compute_midpoint_of_segment(x1, y1, x2, y2) {
  return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
}

function vertical_or_horizontal(x1, y1, x2, y2) {
  if (Math.abs(x1 - x2) < tolerance) {
    return "vertical";
  }
  if (Math.abs(y1 - y2) < tolerance) {
    return "horizontal";
  }
  throw Error("Line not vertical or horizontal!");
}

function hilbert(i) {
  const points = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 1),
    new p5.Vector(1, 1),
    new p5.Vector(1, 0),
  ];

  let index = i & 3;
  let v = points[index];

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);
    if (index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    } else if (index == 1) {
      v.y += len;
    } else if (index == 2) {
      v.x += len;
      v.y += len;
    } else if (index == 3) {
      let temp = len - 1 - v.x;
      v.x = len - 1 - v.y;
      v.y = temp;
      v.x += len;
    }
  }
  return v;
}
