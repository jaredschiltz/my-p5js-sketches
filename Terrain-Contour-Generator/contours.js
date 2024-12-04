"use strict";

export function compute_contours(
  p5,
  number_of_vertical_cells,
  number_of_horizontal_cells,
  resolution,
  field_array,
  threshold,
  draw = false
) {
  let contour_points = [];
  for (let i = 0; i <= number_of_vertical_cells; i++) {
    for (let j = 0; j <= number_of_horizontal_cells; j++) {
      // Square Indices To Bit Value
      //  3 ______ 2
      //  |        |
      //  |        |
      //  0 ______ 1

      let bitZero;
      let bitOne;
      let bitTwo;
      let bitThree;

      // Get Corner Values
      if (i < number_of_vertical_cells && j < number_of_horizontal_cells) {
        bitZero = field_array[i + 1][j] < threshold ? 0 : 1;
        bitOne = field_array[i + 1][j + 1] < threshold ? 0 : 1;
        bitTwo = field_array[i][j + 1] < threshold ? 0 : 1;
        bitThree = field_array[i][j] < threshold ? 0 : 1;

        //Draw
        p5.strokeWeight(resolution * 0.1);
        p5.stroke(255, 0, 255);
        let x1;
        let y1;
        let x2;
        let y2;
        switch ((bitThree << 3) | (bitTwo << 2) | (bitOne << 1) | bitZero) {
          // Specify Contour Points in clock-wise order
          case 0:
            //No Isoline
            //  O ______ O
            //  |        |
            //  |        |
            //  |        |
            //  O ______ O

            break;

          case 1:
            //  O ______ O
            //  |        |
            //  |\       |
            //  | \      |
            //  X__\_____O

            x1 = p5.floor(j * resolution);
            y1 = p5.floor(i * resolution + resolution / 2);
            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution + resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });

            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 2:
            //  O ______ O
            //  |        |
            //  |       /|
            //  |      / |
            //  O_____/__X

            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution + resolution);
            x2 = p5.floor(j * resolution + resolution);
            y2 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 3:
            //  O ______ O
            //  |        |
            //  |--------|
            //  |        |
            //  X________X

            x1 = p5.floor(j * resolution);
            y1 = p5.floor(i * resolution + resolution / 2);
            x2 = p5.floor(j * resolution + resolution);
            y2 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });

            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 4:
            //  O ______ X
            //  |     \  |
            //  |      \ |
            //  |        |
            //  O________O

            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution);
            x1 = p5.floor(j * resolution + resolution);
            y1 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 5:
            //  O ______ X
            //  |  /     |
            //  | /     /|
            //  |/     / |
            //  X_____/__O

            x1 = p5.floor(j * resolution);
            y1 = p5.floor(i * resolution + resolution / 2);
            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }

            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution + resolution);
            x1 = p5.floor(j * resolution + resolution);
            y1 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 6:
            //  O ______ X
            //  |    |   |
            //  |    |   |
            //  |    |   |
            //  O____|___X

            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution);
            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution + resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 7:
            //  O ______ X
            //  |  /     |
            //  | /      |
            //  |        |
            //  X________X

            x1 = p5.floor(j * resolution);
            y1 = p5.floor(i * resolution + resolution / 2);
            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 8:
            //  X ______ O
            //  |  /     |
            //  | /      |
            //  |        |
            //  O________O

            x2 = p5.floor(j * resolution);
            y2 = p5.floor(i * resolution + resolution / 2);
            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 9:
            //  X ______ O
            //  |    |   |
            //  |    |   |
            //  |    |   |
            //  X____|___O

            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution);
            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution + resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });

            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 10:
            //  X ______ O
            //  |     \  |
            //  |\     \ |
            //  | \     \|
            //  O__\_____X

            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution);
            x2 = p5.floor(j * resolution + resolution);
            y2 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }

            x2 = p5.floor(j * resolution);
            y2 = p5.floor(i * resolution + resolution / 2);
            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution + resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 11:
            //  X ______ O
            //  |     \  |
            //  |      \ |
            //  |        |
            //  X________X

            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution);
            x2 = p5.floor(j * resolution + resolution);
            y2 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 12:
            //  X ______ X
            //  |        |
            //  |--------|
            //  |        |
            //  O________O

            x2 = p5.floor(j * resolution);
            y2 = p5.floor(i * resolution + resolution / 2);
            x1 = p5.floor(j * resolution + resolution);
            y1 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 13:
            //  X ______ X
            //  |        |
            //  |       /|
            //  |      / |
            //  X_____/__O

            x2 = p5.floor(j * resolution + resolution / 2);
            y2 = p5.floor(i * resolution + resolution);
            x1 = p5.floor(j * resolution + resolution);
            y1 = p5.floor(i * resolution + resolution / 2);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 14:
            //  X ______ X
            //  |        |
            //  |\       |
            //  | \      |
            //  O__\_____X

            x2 = p5.floor(j * resolution);
            y2 = p5.floor(i * resolution + resolution / 2);
            x1 = p5.floor(j * resolution + resolution / 2);
            y1 = p5.floor(i * resolution + resolution);

            contour_points.push({
              x1: x1,
              y1: y1,
              x2: x2,
              y2: y2,
            });
            if (draw) {
              p5.line(x1, y1, x2, y2);
            }
            break;

          case 15:
            //No Isoline
            //  X ______ X
            //  |        |
            //  |        |
            //  |        |
            //  X ______ X

            break;

          default:
        }
      }
    }
  }
  return contour_points;
}

export function make_contour_chains(contour_points) {
  let chains = new Array();
  let chain_number = 0;
  chains[chain_number] = new Array();
  let chain_valid = { cw: true, ccw: true };
  let current_index_to_remove = contour_points.length - 1;
  let point_to_start_search = contour_points[contour_points.length - 1];
  while (contour_points.length) {
    if (chain_valid.cw) {
      let pop_value = contour_points.splice(current_index_to_remove, 1)[0];
      // console.log(
      //   `removed point: x1: ${pop_value.x1} y1: ${pop_value.y1} x2: ${pop_value.x2} y2: ${pop_value.y2}`
      // );
      chains[chain_number].push({ x: pop_value.x1, y: pop_value.y1 });
      current_index_to_remove = contour_points.findIndex((element) => {
        return element.x1 === pop_value.x2 && element.y1 === pop_value.y2;
      });
      if (current_index_to_remove === -1) {
        //console.log(`can't find any more cw nodes`);
        chains[chain_number].push({ x: pop_value.x2, y: pop_value.y2 });
        chain_valid.cw = false;
        // Calculate next CCW point
        // console.log(
        //   `start point: x1: ${point_to_start_search.x1} y1: ${point_to_start_search.y1} x2: ${point_to_start_search.x2} y2: ${point_to_start_search.y2}`
        // );
        //console.log("these points are left:");
        //console.log(contour_points);
        current_index_to_remove = contour_points.findIndex((element) => {
          return (
            element.x2 === point_to_start_search.x1 &&
            element.y2 === point_to_start_search.y1
          );
        });
        //console.log(`itr: ${current_index_to_remove}`);
        if (current_index_to_remove === -1) {
          chain_valid.ccw = false;
        }
      }
    } else if (chain_valid.ccw) {
      //console.log("clockwise baby");
      let pop_value = contour_points.splice(current_index_to_remove, 1)[0];
      // console.log(
      //   `removed point: x1: ${pop_value.x1} y1: ${pop_value.y1} x2: ${pop_value.x2} y2: ${pop_value.y2}`
      // );
      chains[chain_number].unshift({ x: pop_value.x1, y: pop_value.y1 });
      current_index_to_remove = contour_points.findIndex((element) => {
        return element.x2 === pop_value.x1 && element.y2 === pop_value.y1;
      });
      if (current_index_to_remove === -1) {
        // console.log(`can't find any more ccw nodes`);
        //chains[chain_number].unshift({ x: pop_value.x1, y: pop_value.y1 });
        chain_valid.ccw = false;
      }
    } else {
      // Time to make a new chain
      //console.log("new chain");
      chain_number++;
      chains[chain_number] = new Array();
      chain_valid = { cw: true, ccw: true };
      current_index_to_remove = contour_points.length - 1;
      point_to_start_search = contour_points[contour_points.length - 1];
    }
  }
  // At this point, all the points have been grouped into chains
  // However, all of the chains that are complete rings; i.e., don't go offscreen,
  // have duplicate points at the start and end
  // Remove duplicates
  /*
  for (let chain = 0; chain < chains.length; chain++) {
    if (
      chains[chain][0].x === chains[chain][chains[chain].length - 1].x &&
      chains[chain][0].y === chains[chain][chains[chain].length - 1].y
    ) {
      chains[chain].pop();
    }
  }
    */

  // Label chains as rings or not-rings
  for (let chain = 0; chain < chains.length; chain++) {
    for (let element = 0; element < chains[chain].length; element++) {
      if (
        chains[chain][0].x === chains[chain][chains[chain].length - 1].x &&
        chains[chain][0].y === chains[chain][chains[chain].length - 1].y
      ) {
        chains[chain][element].ring = true;
      } else {
        chains[chain][element].ring = false;
      }
    }
  }

  // Draw the chains
  /*
      for (let chain = 0; chain < chains.length; chain++) {
        for (
          let point_index = 0;
          point_index < chains[chain].length;
          point_index++
        ) {
          if (point_index === 0) {
            stroke(0, 255, 0);
          } else if (point_index === chains[chain].length - 1) {
            stroke(255, 0, 0);
          } else {
            stroke(255, 0, 255);
          }
          point(chains[chain][point_index].x, chains[chain][point_index].y);
        }
      }
        */
  return chains;
}

export function decimate_chains(p5, chains) {
  let new_chains = new Array(chains.length);
  let add_point = false;
  for (let chain = 0; chain < chains.length; chain++) {
    new_chains[chain] = [];
    for (let element = 0; element < chains[chain].length; element++) {
      let isEdgePoint =
        chains[chain][element].x <= 0 ||
        chains[chain][element].x >= p5.width ||
        chains[chain][element].y <= 0 ||
        chains[chain][element].y >= p5.height;

      if (isEdgePoint) {
        // we do not remove circular points
        new_chains[chain].push(chains[chain][element]);
      } else {
        // we will add point
        if (!add_point) {
          add_point = true;
        } else {
          add_point = false;
        }

        if (add_point) {
          new_chains[chain].push(chains[chain][element]);
        }
      }
    }
  }
  // Repair rings that have been broken; i.e., copy beginning point to end point
  for (let chain = 0; chain < new_chains.length; chain++) {
    if (new_chains[chain][0].ring) {
      new_chains[chain].push(new_chains[chain][0]);
    }
  }
  return new_chains;
}
