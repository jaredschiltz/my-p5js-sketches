"use strict";
/* Demonstration file for AULib (Andrew's Utilities library).
 * Download and documentation:
 *   http://www.imaginary-institute.com/resources/AULibrary/AULibrary.php
 * Show use of the AUBezier object.
 * Version 1 - Andrew - Sept 6, 2014
 */

/* We create a big, multi-segment Bezier curve, and also store
 * thickness and color information at each knot. To draw the curve
 * we take a large number of equally-spaced points along the curve's
 * length, and draw each dot using the interpolated size and color
 * information. Use the keyboard to control the program:
 *
 */

let NumCurves = 1;
let MyCurve = null;
let Redraw = true;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB); // all color stuff is in HSB
  newBezier();
  print("space  make a new curve");
  print("-      make a new curve with fewer segments");
  print("+      make a new curve with more segments");
  print("s      save the image to the sketch's directory");
  print("q      quit");
}

// draw the curve as a large number of equally-spaced dots
function draw() {
  if (!Redraw) return; // don't bother redrawing the same thing
  background(20); // white background
  noStroke(); // dots don't have an outline
  let numSteps = 2000; // how many dots to draw
  for (let i = 0; i < numSteps; i++) {
    let t = norm(i, 0, numSteps - 1); // t runs from [0,1]
    let x = MyCurve.getX(t); // get X at this t
    let y = MyCurve.getY(t); // get Y at this t
    //let diam = MyCurve.getIndexValue(t, 2); // get the diameter
    let hue = MyCurve.getIndexValue(t, 3); // get the hue
    let sat = MyCurve.getIndexValue(t, 4); // get the saturation
    let brt = MyCurve.getIndexValue(t, 5); // get the brightness

    fill(hue, sat, brt); // fill with this color
    let diam = 5;
    ellipse(x, y, diam, diam); // draw this dot

    //draw control points
    /*
    for (let p of MyCurve.getKnots()) {
      fill(20, 255, 255);
      ellipse(p[0], p[1], 5);
    }
    */
  }

  // draw even divisions around the curve
  let number_of_curve_divisions = 100;
  for (let i = 0; i < number_of_curve_divisions + 1; i++) {
    fill(0, 255, 255);
    ellipse(
      MyCurve.getX(i / number_of_curve_divisions),
      MyCurve.getY(i / number_of_curve_divisions),
      6
    );
  }

  Redraw = false; // don't draw again until something changes
}

function newBezier() {
  // each knot row: 0:x 1:y 2:weight 3:hue 4:saturation 5:brightness

  let knots = new Array(7); // 7 points for two curves
  for (let i = 0; i < knots.length; i++) {
    knots[i] = new Array(6);
  }
  // Curve #1
  // anchor point
  knots[0][0] = width / 4;
  knots[0][1] = height / 4;
  knots[0][2] = random(5, 7); // line weight
  knots[0][3] = random(0, 255); // hue
  knots[0][4] = random(150, 255); // saturation
  knots[0][5] = random(150, 255); // brightness

  // Control Point
  knots[1][0] = width / 2;
  knots[1][1] = height / 4;
  knots[1][2] = random(5, 7); // line weight
  knots[1][3] = random(0, 255); // hue
  knots[1][4] = random(150, 255); // saturation
  knots[1][5] = random(150, 255); // brightness

  // Control Point
  knots[2][0] = width / 5;
  knots[2][1] = height - height / 4;
  knots[2][2] = random(5, 7); // line weight
  knots[2][3] = random(0, 255); // hue
  knots[2][4] = random(150, 255); // saturation
  knots[2][5] = random(150, 255); // brightness

  // Anchor Point
  knots[3][0] = width - width / 4;
  knots[3][1] = height - height / 4;
  knots[3][2] = random(5, 7); // line weight
  knots[3][3] = random(0, 255); // hue
  knots[3][4] = random(150, 255); // saturation
  knots[3][5] = random(150, 255); // brightness

  // Curve 2
  // Control Point
  knots[4][0] = width * 0.9;
  knots[4][1] = height - height / 4;
  knots[4][2] = random(5, 7); // line weight
  knots[4][3] = random(0, 255); // hue
  knots[4][4] = random(150, 255); // saturation
  knots[4][5] = random(150, 255); // brightness

  // Control Point
  knots[5][0] = width - 25;
  knots[5][1] = height / 2;
  knots[5][2] = random(5, 7); // line weight
  knots[5][3] = random(0, 255); // hue
  knots[5][4] = random(150, 255); // saturation
  knots[5][5] = random(150, 255); // brightness

  // Anchor Point
  knots[6][0] = width - width / 4;
  knots[6][1] = 30;
  knots[6][2] = random(5, 7); // line weight
  knots[6][3] = random(0, 255); // hue
  knots[6][4] = random(150, 255); // saturation
  knots[6][5] = random(150, 255); // brightness

  /*
  let knots = new Array(1 + 3 * NumCurves);
  for (let i = 0; i < knots.length; i++) {
    knots[i] = new Array(6);
  }
  fillKnotWithRandom(knots, 0); // handle knot 0 as a special case
  for (let i = 0; i < NumCurves; i++) {
    let k = 1 + 3 * i;
    if (k == 1) {
      // knot 1 is special because there's no knot -1 before 0
      fillKnotWithRandom(knots, 1);
    } else {
      // knot k is symmetrical with knot k-2 around k-2
      for (let j = 0; j < knots[0].length; j++) {
        knots[k][j] = knots[k - 1][0] + (knots[k - 1][j] - knots[k - 2][j]);
      }
    }
    fillKnotWithRandom(knots, k + 1);
    fillKnotWithRandom(knots, k + 2);
  }
  */

  // Make the new curve. Give it the knots, tell it we have 2
  // geometry values at the start of each row (the X and Y values),
  // and close it. Remember the geometry values must always come
  // at the start of each row in the knots.
  //
  MyCurve = new AUBezier(knots, 2, false);
  Redraw = true; // we have a new curve, so draw it
}

function fillKnotWithRandom(knots, whichKnot) {
  knots[whichKnot][0] = width * random(0.2, 0.8); // a value for X
  knots[whichKnot][1] = height * random(0.2, 0.8); // a value for Y not
  knots[whichKnot][2] = random(5, 7); // line weight
  knots[whichKnot][3] = random(0, 255); // hue
  knots[whichKnot][4] = random(150, 255); // saturation
  knots[whichKnot][5] = random(150, 255); // brightness
}

function keyPressed() {
  switch (key) {
    case " ":
      newBezier(); // make a new curve
      break;
    case "-":
      NumCurves--;
      if (NumCurves == 0) {
        NumCurves = 1;
      }
      print("Current NumCurves: ", NumCurves);
      newBezier();
      break;
    case "+":
      NumCurves++; // use more curves
      print("Current NumCurves: ", NumCurves);
      newBezier();
      break;
    case "s":
      saveFrame(); // save the results to this directory
      break;
    case "q":
      exit(); // quit!
      break;
  }
}
