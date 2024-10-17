/*
 Based on formula found here:
 http://werner.yellowcouch.org/Papers/fastenv12/
 Werner Van Belle1 - werner@yellowcouch.org, werner.van.belle@gmail.com
*/

class FastExponentialEnvelope {
  constructor() {
    this.multiplier = 0;
    this.delta = 0;
    this.y1 = 0; // Y of first point
    this.y2 = 0; // Y of second point
    // assuming x1 = 0 by default
    this.x2 = 0;
    this.dy = 0;
    this.cstA = 0;
    this.cstD = 0;
    this.cstE = 0;
    this.branch = 0;
    this.BEND_LINEAR_LOWER = 0.499999;
    this.BEND_LINEAR_UPPER = 0.500001;
  }

  /* Curve will run through (0,y1), (x2/2,ym) and (x2,y2) */
  setCoordinates(x2, ym, y2) 
  {
    this.x2 = x2;
    this.y1 = 0; // Always assuming starting node x1 = 0 and y1 = 0
    this.ym = ym;
    this.y2 = y2;
    this.dy = this.y2 - this.y1;
    
     //console.log("ym:" + this.ym + " y1:" + this.y1 + " y2:" + this.y2)

    let bend = 0;

    if (this.y2 == this.y1) {
      bend = 0.5;
    } else {
      bend = (this.ym - this.y1) / (this.y2 - this.y1);
    }
    
     // Create bounds for bend
    if (bend > 0.9999)
      {
        bend = 0.9999;
      }
    if (bend < 0.0001)
      {
        bend = 0.0001;
      }
    
     //console.log(map(bend, 0.9999, 0.0001, -0.995, 0.995))
      console.log(this.myMapFunction(bend, 0.9999, 0.0001, -0.995, 0.995))

      console.assert(bend > 0 && bend < 1, "Bend <= 0 or Bend >= 1");

    if (bend > this.BEND_LINEAR_LOWER && bend < this.BEND_LINEAR_UPPER) 
    {
      this.multiplier = 1;
      this.delta = this.dy / this.x2;
      this.branch = 2;
    } else 
    {
      let onemb = 1 - bend;
      let onembs = onemb * onemb;
      let onem2b = 1 - bend - bend;
      let bends = bend * bend;
      let s = onemb / bend;
      this.multiplier = Math.pow(s, 2 / this.x2);
      let s2 = s * s;
      this.delta =
        ((this.y2 - this.y1 * s2) * (this.multiplier - 1)) / (s2 - 1);
      this.cstA = (this.y1 * onembs - this.y2 * bends) / onem2b;
      let B = (this.dy * bends) / onem2b;
      this.cstD = (2 * Math.log(s)) / this.x2;
      this.cstE = Math.log(Math.abs(B));

      if (B < 0) {
        this.branch = 1;
      } else {
        this.branch = 0;
      }
    }
  }

  /* Calculates y for a given x. X ranges from 0 to x2. */

  calculateY(x) {
    console.assert(x >= 0, "X less than 0");
    if (this.branch == 0) {
      return this.cstA + Math.exp(this.cstD * x + this.cstE);
    } else if (this.branch == 1) {
      return this.cstA - Math.exp(this.cstD * x + this.cstE);
    } else {
      return this.y1 + (x * this.dy) / this.x2;
    }
  }
  
  myMapFunction(x, start1, stop1, start2, stop2)
  {
    return ((x - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }
}
