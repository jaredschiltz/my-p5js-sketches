"use strict";
/* Demonstration file for AULib (Andrew's Utilities library).
 * Download and documentation:
 *   http://www.imaginary-institute.com/resources/AULibrary/AULibrary.php
 * Show use of the AUCurve object.
 * Version 1 - Andrew - Sept 6, 2014
 */

let NumKnots = 8;
let MyCurve;
let Redraw = true;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB); // all color stuff is in HSB
  newCurve();
  print("space  make a new curve");
  print("-      make a new curve with fewer segments");
  print("+      make a new curve with more segments");
  print("s      save the image to the sketch's directory");
  print("q      quit");
}

// draw the curve as a large number of equally-spaced dots
function draw() {
  if (!Redraw) return; // don't bother redrawing the same thing
  background(255); // white background
  noStroke(); // dots don't have an outline
  let numSteps = 500; // how many dots to draw
  for (let i = 0; i < numSteps; i++) {
    let t = norm(i, 0, numSteps - 1); // t runs from [0,1]
    let x = MyCurve.getX(t); // get X at this t
    let y = MyCurve.getY(t); // get Y at this t
    let diam = MyCurve.getIndexValue(t, 2); // get the diameter
    let hue = MyCurve.getIndexValue(t, 3); // get the hue
    let sat = MyCurve.getIndexValue(t, 4); // get the saturation
    let brt = MyCurve.getIndexValue(t, 5); // get the brightness

    fill(hue, sat, brt); // fill with this color
    ellipse(x, y, diam, diam); // draw this dot
  }
  Redraw = false; // don't draw again until something changes
}

function newCurve() {
  // each knot row: 0:x 1:y 2:weight 3:hue 4:saturation 5:brightness
  let knots = new Array(NumKnots);
  for (let i = 0; i < knots.length; i++) {
    knots[i] = new Array(6);
  }
  for (let i = 0; i < knots.length; i++) {
    knots[i][0] = width * random(0.2, 0.8); // a value for X
    knots[i][1] = height * random(0.2, 0.8); // a value for Y not
    knots[i][2] = random(5, 50); // line weight
    knots[i][3] = random(0, 255); // hue
    knots[i][4] = random(150, 255); // saturation
    knots[i][5] = random(150, 255); // brightness
  }
  /* Make the new curve. Give it the knots, tell it we have 2
   * geometry values at the start of each row (the X and Y values),
   * and close it. Remember the geometry values must always come
   * at the start of each row in the knots.
   */
  MyCurve = new AUCurve(knots, 2, true);
  Redraw = true; // we have a new curve, so draw it
}

function keyPressed() {
  switch (key) {
    case " ":
      newCurve(); // make a new curve
      break;
    case "-":
      NumKnots = max(4, NumKnots - 1); // use fewer knots
      newCurve();
      break;
    case "+":
      NumKnots++; // use more knots
      newCurve();
      break;
    case "s":
      saveFrame(); // save the results to this directory
      break;
    case "q":
      exit(); // quit!
      break;
  }
}
