// https://imaginary-institute.com/resources/TechNote08/TechNote08.html
class AUBaseCurve {
  constructor(matrix, numGeomVals, curveType) {
    this.CRCURVE = 0;
    this.BEZCURVE = 1;

    this.knots = null; // first index is knot index, second is variable
    this.matrix = matrix; // for finding points
    this.numGeomVals = numGeomVals; // how many of the first dimensions contribute to length
    this.curveType = curveType; // CRCURVE or BEZCURVE
    this.density = 1;
    this.rebuildArcLengths = true;
    this.ArcLengths = null;

    this.leftSide = new Array(4);
    this.leftTan = new Array(4);
    this.lastLeftSideT = -1; // the last t value used; so we know when to remake leftSide
    this.lastLeftSideTanT = -1; // the last t value for the tangent left side
    this.mappedT = 0.0;
    this.mappedKnotStart = 0;

    this.skipLength = 0; // how much to bump knot counter per segment
    this.numCurves = 0; // number of curves represented by knot array
    this.firstLengthKnot = 0; // where to start gathering lengths
    this.numSegments = 0; // how many pairs to use when gathering lengths
  }

  setKnots(knots) {
    // Does not look like we have to do a matrix copy here, because knots array never gets modified outside this class
    this.knots = knots;
    this.rebuildArcLengths = true;
  }

  setNumGeomVals(numGeomVals) {
    this.numGeomVals = numGeomVals;
  }

  /*************************************************************************
   * Getting values
   *************************************************************************/

  getX(_t) {
    return this.getIndexValue(_t, 0);
  }

  getY(_t) {
    return this.getIndexValue(_t, 1);
  }

  getZ(_t) {
    return this.getIndexValue(_t, 2);
  }

  getIndexValue(_t, _index) {
    if (this.knots[0].length < _index + 1) {
      print("Error Occurred. Knots does not have a value at this index");
      return 0;
    }
    this.mapTtoCurve(_t);
    this.makeLeftSide(this.mappedT);
    let v = this.evalCurve(
      this.knots[this.mappedKnotStart][_index],
      this.knots[this.mappedKnotStart + 1][_index],
      this.knots[this.mappedKnotStart + 2][_index],
      this.knots[this.mappedKnotStart + 3][_index]
    );
    return v;
  }

  getTanX(_t) {
    return this.getIndexTan(_t, 0);
  }

  getTanY(_t) {
    return this.getIndexTan(_t, 1);
  }

  getTanZ(_t) {
    return this.getIndexTan(_t, 2);
  }

  getIndexTan(_t, _index) {
    if (this.knots[0].length < _index + 1) {
      print("Error Occurred. Knots does not have a value at this index");
      return 0;
    }

    this.mapTtoCurve(_t);
    this.makeLeftSideTan(this.mappedT);
    let v = evalTan(
      this.knots[this.mappedKnotStart][_index],
      this.knots[this.mappedKnotStart + 1][_index],
      this.knots[this.mappedKnotStart + 2][_index],
      this.knots[this.mappedKnotStart + 3][_index]
    );
    return v;
  }

  getCurveType() {
    return this.curveType;
  }

  /*************************************************************************
   * Setting values
   *************************************************************************/

  setKnotIndex(_k, _v, _value) {
    if (_k < this.knots.length) {
      if (_v < this.knots[0].length) {
        this.knots[_k][_v] = _value;
        this.rebuildArcLengths = true;
      }
    }
  }

  setX(_knotNum, _x) {
    this.setKnotIndex(_knotNum, 0, _x);
  }
  setY(_knotNum, _y) {
    this.setKnotIndex(_knotNum, 1, _y);
  }
  setZ(_knotNum, _z) {
    this.setKnotIndex(_knotNum, 2, _z);
  }

  setXY(_knotNum, _x, _y) {
    this.setKnotIndex(_knotNum, 0, _x);
    this.setKnotIndex(_knotNum, 1, _y);
  }

  setXYZ(_knotNum, _x, _y, _z) {
    this.setKnotIndex(_knotNum, 0, _x);
    this.setKnotIndex(_knotNum, 1, _y);
    this.setKnotIndex(_knotNum, 2, _z);
  }

  setKnotIndexValue(_knotNum, _index, _value) {
    this.setKnotIndex(_knotNum, _index, _value);
  }

  setKnotValues(_knotNum, _vals) {
    for (let i = 0; i < _vals.length; i++) {
      this.setKnotIndex(_knotNum, i, _vals[i]);
    }
  }

  getKnots() {
    return this.knots;
  }

  setDensity(_density) {
    this.density = Math.max(0.001, _density);
  }

  /*************************************************************************
   * Matrix stuff
   *************************************************************************/

  // To find [t^3 t^2 t 1] M [v0 v1 v2 v3]T, this finds v=([t^3 t^2 t 1] M) and saves it in global leftSide.
  // We split this off because we need to do this only once to evaluate multiple data values at a given t.
  makeLeftSide(t) {
    if (t == this.lastLeftSideT) return;

    // curve evaulation left side
    let t2 = t * t;
    let t3 = t * t2;
    this.leftSide[0] =
      this.matrix[0][0] * t3 +
      this.matrix[1][0] * t2 +
      this.matrix[2][0] * t +
      this.matrix[3][0];
    this.leftSide[1] =
      this.matrix[0][1] * t3 +
      this.matrix[1][1] * t2 +
      this.matrix[2][1] * t +
      this.matrix[3][1];
    this.leftSide[2] =
      this.matrix[0][2] * t3 +
      this.matrix[1][2] * t2 +
      this.matrix[2][2] * t +
      this.matrix[3][2];
    this.leftSide[3] =
      this.matrix[0][3] * t3 +
      this.matrix[1][3] * t2 +
      this.matrix[2][3] * t +
      this.matrix[3][3];
    this.lastLeftSideT = t;
  }

  makeLeftSideTan(t) {
    if (t == this.lastLeftSideTanT) return;
    // tangent evaluation left side
    let tan2 = 2 * t;
    let tan3 = 3 * t * t;
    this.leftTan[0] =
      this.matrix[0][0] * tan3 + this.matrix[1][0] * tan2 + this.matrix[2][0];
    this.leftTan[1] =
      this.matrix[0][1] * tan3 + this.matrix[1][1] * tan2 + this.matrix[2][1];
    this.leftTan[2] =
      this.matrix[0][2] * tan3 + this.matrix[1][2] * tan2 + this.matrix[2][2];
    this.leftTan[3] =
      this.matrix[0][3] * tan3 + this.matrix[1][3] * tan2 + this.matrix[2][3];

    this.lastLeftSideTanT = t;
  }

  // assumes that makeLeftSide has been made, finds [leftSide] . [v0 v1 v2 v3]T
  evalCurve(v0, v1, v2, v3) {
    return (
      this.leftSide[0] * v0 +
      this.leftSide[1] * v1 +
      this.leftSide[2] * v2 +
      this.leftSide[3] * v3
    );
  }

  evalTan(v0, v1, v2, v3) {
    return (
      this.leftTan[0] * v0 +
      this.leftTan[1] * v1 +
      this.leftTan[2] * v2 +
      this.leftTan[3] * v3
    );
  }

  // do both steps at once - this is just for convenience
  makeLeftAndEval(t, v0, v1, v2, v3) {
    this.makeLeftSide(t);
    return this.evalCurve(v0, v1, v2, v3);
  }

  /*************************************************************************
   * Search arclengths
   *************************************************************************/

  /*
   *  Binary subdivision through ArcLengths to find the global value of t.
   *   This returns nothing, but side-effects three globals:
   *    mappedT           the t in the found segment
   *    mappedSegment     the found segment
   */
  mapTtoCurve(t) {
    // first, handle the edge cases
    if (true) {
      if (t <= 0) {
        this.mappedT = 0; // start of segment
        this.mappedKnotStart = 0; // return first segment
        return;
      }
      if (t >= 1) {
        this.mappedT = 1; // end of segment
        this.mappedKnotStart = this.knots.length - 4; // return last segment
        return;
      }
    }
    if (t > 1) t = parseFloat(t % 1);
    if (t < 0) t = parseFloat(Math.ceil(Math.abs(t)) - Math.abs(t));
    if (this.rebuildArcLengths) {
      this.buildArcLengths();
      this.rebuildArcLengths = false;
    }
    // find the segment for this value of t
    this.mappedKnotStart = 0;
    let mappedSegment = 0;
    let nextEnd = this.ArcLengths[0][this.ArcLengths[0].length - 1];
    while (t > nextEnd && mappedSegment < this.ArcLengths.length - 1) {
      mappedSegment++;
      nextEnd =
        this.ArcLengths[mappedSegment][
          this.ArcLengths[mappedSegment].length - 1
        ];
      this.mappedKnotStart += this.skipLength;
    }

    let segmentArcs = this.ArcLengths[mappedSegment];
    let leftIndex = 0;
    let rightIndex = segmentArcs.length - 1;
    let midIndex = parseInt(Math.round((leftIndex + rightIndex) / 2.0));
    let midVal = segmentArcs[midIndex];
    let numSteps = 0;
    let maxSteps = 100; // overkill, but stops runaway subdivision
    while (numSteps++ < maxSteps && rightIndex - leftIndex > 1) {
      midIndex = parseInt(Math.round((leftIndex + rightIndex) / 2.0));
      midVal = segmentArcs[midIndex];
      if (t < midVal) rightIndex = midIndex;
      else leftIndex = midIndex;
    }
    let leftVal = segmentArcs[leftIndex];
    let rightVal = segmentArcs[rightIndex];
    let f = (t - leftVal) / (rightVal - leftVal);
    this.mappedT = this.jconstrain(
      (leftIndex + f) / (segmentArcs.length - 1),
      0,
      1
    );

    this.makeLeftSide(this.mappedT);
  }

  jconstrain(a, low, high) {
    if (a < low) return low;
    if (a > high) return high;
    return a;
  }

  /*************************************************************************
   * Build arclengths
   *************************************************************************/

  buildArcLengths() {
    // Set these values for CRCURVE, overwrite for BEZCURVE if needed.
    // Recompute each time, in case user changed number of knots or segments
    this.skipLength = 1; // how much to bump knot counter per segment
    this.numCurves = this.knots.length - 3; // number of curves represented by knot array
    let firstLengthKnot = 1; // where to start gathering lengths
    let numSegments = 1; // how many pairs to use when gathering lengths
    if (this.curveType == this.BEZCURVE) {
      this.skipLength = 3;
      this.numCurves = (this.knots.length - 1) / 3;
      firstLengthKnot = 0;
      numSegments = 3;
    }

    this.ArcLengths = new Array(this.numCurves);
    let startingKnot = 0;
    let totalArcLength = 0;
    for (let curveNum = 0; curveNum < this.numCurves; curveNum++) {
      let curveLengthEstimate = this.getCurveLengthEstimate(
        startingKnot + firstLengthKnot,
        numSegments
      );
      curveLengthEstimate *= this.density;
      let numSteps = Math.round(curveLengthEstimate);
      if (numSteps < 3) numSteps = 3;

      let arcs = this.getArcLengthsForCurve(
        startingKnot,
        numSteps,
        totalArcLength
      );
      this.ArcLengths[curveNum] = arcs;
      startingKnot += this.skipLength;
      totalArcLength = arcs[arcs.length - 1];
    }

    // normalize the results
    for (let i = 0; i < this.ArcLengths.length; i++) {
      let thisSeg = this.ArcLengths[i];
      for (let j = 0; j < thisSeg.length; j++) {
        let val = thisSeg[j];
        thisSeg[j] = val / totalArcLength;
      }
    }
  }

  getCurveLengthEstimate(firstKnot, numSegments) {
    let totalLen = 0;
    for (let seg = 0; seg < numSegments; seg++) {
      let seglen = 0;
      for (let g = 0; g < this.numGeomVals; g++) {
        let d =
          this.knots[firstKnot + seg][g] - this.knots[firstKnot + seg + 1][g];
        seglen += d * d;
      }
      seglen = parseFloat(Math.sqrt(seglen));
      totalLen += seglen;
    }
    return totalLen;
  }

  getArcLengthsForCurve(firstKnot, numSteps, totalArcLength) {
    let arcs = new Array(numSteps + 1);
    let olds = new Array(this.numGeomVals);
    for (let i = 0; i <= numSteps; i++) {
      // note <= to include last point
      let t = (i * 1.0) / numSteps;
      this.makeLeftSide(t); // make left side of matrix eq for this t
      let seglen = 0;
      for (let g = 0; g < this.numGeomVals; g++) {
        let s = this.evalCurve(
          this.knots[firstKnot][g],
          this.knots[firstKnot + 1][g],
          this.knots[firstKnot + 2][g],
          this.knots[firstKnot + 3][g]
        );
        if (i > 0) {
          let ds = s - olds[g];
          seglen += ds * ds;
        }
        olds[g] = s;
      }
      seglen = parseFloat(Math.sqrt(seglen));
      totalArcLength += seglen;
      arcs[i] = totalArcLength;
    }
    return arcs;
  }
}
