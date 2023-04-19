//https://imaginary-institute.com/resources/TechNote08/TechNote08.html
class AUCurve extends AUBaseCurve {
  constructor(knots, numGeomVals, makeClosed) {
    let CRCURVE = 0;
    let Matrix_CatmullRom = new Array(4);
    for (let i = 0; i < Matrix_CatmullRom.length; i++) {
      Matrix_CatmullRom[i] = new Array(4).fill(0);
    }
    Matrix_CatmullRom[0][0] = -0.5;
    Matrix_CatmullRom[0][1] = 1.5;
    Matrix_CatmullRom[0][2] = -1.5;
    Matrix_CatmullRom[0][3] = 0.5;
    Matrix_CatmullRom[1][0] = 1.0;
    Matrix_CatmullRom[1][1] = -2.5;
    Matrix_CatmullRom[1][2] = 2.0;
    Matrix_CatmullRom[1][3] = -0.5;
    Matrix_CatmullRom[2][0] = -0.5;
    Matrix_CatmullRom[2][1] = 0.0;
    Matrix_CatmullRom[2][2] = 0.5;
    Matrix_CatmullRom[2][3] = 0.0;
    Matrix_CatmullRom[3][0] = 0.0;
    Matrix_CatmullRom[3][1] = 1.0;
    Matrix_CatmullRom[3][2] = 0.0;
    Matrix_CatmullRom[3][3] = 0.0;
    super(Matrix_CatmullRom, numGeomVals, CRCURVE);
    if (knots == null || knots.length < 4) {
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
      let klen = knots.length;
      let closedKnots = new Array(klen + 3);
      for (let i = 0; i < closedKnots.length; i++) {
        closedKnots[i] = new Array(knots[0].length);
      }
      for (let i = 0; i < klen + 3; i++) {
        for (let j = 0; j < knots[0].length; j++) {
          closedKnots[i][j] = knots[i % klen][j];
        }
      }
      super.setKnots(closedKnots);
    } else {
      super.setKnots(knots);
    }
  }

  //Cardinal spine: c=1 is overshooty, c=.5 is Catmull-Rom, c=0 is polygon
  makeMatrixCardinal(c) {
    let Matrix_Cardinal = new Array(4);
    for (let i = 0; i < Matrix_Cardinal.length; i++) {
      Matrix_Cardinal[i] = new Array(4).fill(0);
    }
    Matrix_Cardinal[0][0] = -c;
    Matrix_Cardinal[0][1] = 2 - c;
    Matrix_Cardinal[0][2] = c - 2;
    Matrix_Cardinal[0][3] = c;
    Matrix_Cardinal[1][0] = 2 * c;
    Matrix_Cardinal[1][1] = c - 3;
    Matrix_Cardinal[1][2] = 3 - 2 * c;
    Matrix_Cardinal[1][3] = -c;
    Matrix_Cardinal[2][0] = -c;
    Matrix_Cardinal[2][1] = 0;
    Matrix_Cardinal[2][2] = c;
    Matrix_Cardinal[2][3] = 0;
    Matrix_Cardinal[3][0] = 0;
    Matrix_Cardinal[3][1] = 1;
    Matrix_Cardinal[3][2] = 0;
    Matrix_Cardinal[3][3] = 0;
  }
}
