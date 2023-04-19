class AUBezier extends AUBaseCurve {
  constructor(knots, numGeomVals, makeClosed) {
    let BEZCURVE = 1;
    let Matrix_Bezier = new Array(4);
    for (let i = 0; i < Matrix_Bezier.length; i++) {
      Matrix_Bezier[i] = new Array(4).fill(0);
    }
    Matrix_Bezier[0][0] = -1.0;
    Matrix_Bezier[0][1] = 3.0;
    Matrix_Bezier[0][2] = -3.0;
    Matrix_Bezier[0][3] = 1.0;
    Matrix_Bezier[1][0] = 3.0;
    Matrix_Bezier[1][1] = -6.0;
    Matrix_Bezier[1][2] = 3.0;
    Matrix_Bezier[1][3] = 0.0;
    Matrix_Bezier[2][0] = -3.0;
    Matrix_Bezier[2][1] = 3.0;
    Matrix_Bezier[2][2] = 0.0;
    Matrix_Bezier[2][3] = 0.0;
    Matrix_Bezier[3][0] = 1.0;
    Matrix_Bezier[3][1] = 0.0;
    Matrix_Bezier[3][2] = 0.0;
    Matrix_Bezier[3][3] = 0.0;
    super(Matrix_Bezier, numGeomVals, BEZCURVE);
    if (knots == null || knots.length < 4 || (knots.length - 1) % 3 != 0) {
      print(
        "knots is null or too short or not 1+(3n) for n>1, using array of four { 1, 1 }"
      );
      exit();
    }
    if (numGeomVals < 1 || numGeomVals > knots[0].length) {
      print("numGeomVals is too small or big");
      exit();
    }
    if (makeClosed) {
      let closedKnots = new Array(knots.length + 3);
      for (let i = 0; i < closedKnots.length; i++) {
        closedKnots[i] = new Array(knots[0].length);
      }
      for (let i = 0; i < knots.length; i++) {
        for (let j = 0; j < knots[i].length; j++) {
          closedKnots[i][j] = knots[i][j];
        }
      }
      let last = knots.length;
      for (let e = 0; e < knots[0].length; e++) {
        closedKnots[last][e] =
          knots[last - 1][e] + (knots[last - 1][e] - knots[last - 2][e]);
        closedKnots[last + 1][e] = knots[0][e] + (knots[0][e] - knots[1][e]);
        closedKnots[last + 2][e] = knots[0][e];
      }
      super.setKnots(closedKnots);
    } else {
      super.setKnots(knots);
    }
  }
}
