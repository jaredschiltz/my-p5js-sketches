"use strict";
import {
  compute_contours,
  make_contour_chains,
  decimate_chains,
} from "./contours.js";
/* This project is an experiment with using p5js as an ES module,
This video describes how to set all of this up:
https://www.youtube.com/watch?v=P0bkwncSJag
*/
// https://github.com/blindman67/SimplexNoiseJS
//  just using different random seeds - not a gif loop

new p5(function (p5) {
  const WIDTH = 800;
  const HEIGHT = 800;
  const NUMBER_CELLS_PER_WIDTH = 100;
  const NUMBER_CELLS_PER_HEIGHT = 100;

  //let contour_points = [];

  p5.preload = function () {};

  p5.setup = function () {
    p5.createCanvas(WIDTH, HEIGHT);
    paper.setup();
    p5.noLoop();
  };

  p5.draw = function () {
    // All noise offsets can be defined here, instead of in global scope
    // if we are not animating; i.e., noNoop()
    let xoff = 0;
    let yoff = 0;
    let inc = 0.04;
    let zoff = 0;

    const WIDTH_HEIGHT_RESOLUTION = p5.width / NUMBER_CELLS_PER_WIDTH;

    let openSimplex = openSimplexNoise(p5.random(42));
    let field = []; // Holds the openSimplex Noise Field

    p5.background(0, 0, 0);
    xoff = 0;
    for (let i = 0; i <= NUMBER_CELLS_PER_HEIGHT; i++) {
      xoff += inc;
      yoff = 0;
      field[i] = [];
      for (let j = 0; j <= NUMBER_CELLS_PER_WIDTH; j++) {
        // Create a noise field with values between 0.0 and 1.0
        field[i][j] = p5.map(
          openSimplex.noise3D(xoff, yoff, zoff),
          -1,
          1,
          0,
          1
        );
        yoff += inc;
      }
    }

    zoff += 0.05;

    // Draw The Noise Field
    /*
    for (let i = 0; i <= NUMBER_CELLS_PER_HEIGHT; i++) {
      for (let j = 0; j <= NUMBER_CELLS_PER_WIDTH; j++) {
        let noise_value = field[i][j];
        // Draw Noise Field
        p5.stroke(noise_value * 255, noise_value * 255, noise_value * 255);
        p5.strokeWeight(WIDTH_HEIGHT_RESOLUTION * 0.4);
        p5.point(j * WIDTH_HEIGHT_RESOLUTION, i * WIDTH_HEIGHT_RESOLUTION);
        //compute_contours(i, j, 0.5);
        //compute_contours(i, j, 0.6, color(255, 0, 0));
      }
    }
    */

    let number_of_contours = 1;
    for (let i = 0; i < number_of_contours; i++) {
      // Compute Contours
      //let contour_threshold = p5.map(i, 0, number_of_contours - 1, 0.3, 0.6);
      let contour_threshold = 0.5;
      let contour_points = compute_contours(
        p5,
        NUMBER_CELLS_PER_HEIGHT,
        NUMBER_CELLS_PER_WIDTH,
        WIDTH_HEIGHT_RESOLUTION,
        field,
        contour_threshold,
        false
      );

      // Compute chains (This groups all points found in the contour_points into isoline chains)

      let chains = make_contour_chains(contour_points);

      // Eliminate points to make each contour chain more smooth
      chains = decimate_chains(p5, chains);
      chains = decimate_chains(p5, chains);
      chains = decimate_chains(p5, chains);

      // Use paper.js to draw smoothed path of all contours
      // Convert chain points into paper.js paths
      let path;
      p5.stroke(
        p5.color(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255))
      );

      for (let chain = 0; chain < chains.length; chain++) {
        path = new paper.Path({
          segments: chains[chain].map((element) => {
            return [element.x, element.y];
          }),
          strokeColor: "black",
          closed: false,
        });
        //path.smooth({ type: "continuous" });
        path.simplify(1);

        p5.strokeWeight(1);
        // Draw all smoothed contours
        let num_points = 500;
        let { x: x0, y: y0 } = path.getPointAt(0);
        for (let i = 0; i < num_points; i++) {
          // Find location of each point along the entire curve
          let offset = p5.map(i, 0, num_points - 1, 0, path.length);
          let { x, y } = path.getPointAt(offset);
          p5.line(x0, y0, x, y);
          x0 = x;
          y0 = y;
        }
      }
    }
  };

  p5.keyPressed = function () {
    if (key == "s" || key == "S") {
      saveCanvas("output", "png");
      //image.save("image_mask", "png"); // This saves a transparent mask png file
      //saveGif("output_gif", 10);
    }
  };
});
