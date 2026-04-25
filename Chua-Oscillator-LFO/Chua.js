class Chua {
  constructor() {
    // State
    this.x = 0.1;
    this.y = 0.0;
    this.z = 0.0;

    // Parameters
    this.substeps = 4; // try 4- 16
    this.alpha = 9.0;
    this.beta = 14.0;
    this.m0 = -1.143;
    this.m1 = -0.714;

    this.dt = 0.005; // integration timestep
  }

  set_m0(m0) {
    this.m0 = m0;
  }

  set_m1(m1) {
    this.m1 = m1;
  }

  h(x) {
    return (
      this.m1 * x +
      0.5 * (this.m0 - this.m1) * (Math.abs(x + 1.0) - Math.abs(x - 1.0))
    );
  }

  step() {
    // k1
    const k1x = this.alpha * (this.y - this.x - this.h(this.x));
    const k1y = this.x - this.y + this.z;
    const k1z = -this.beta * this.y;

    // midpoint
    const xm = this.x + 0.5 * this.dt * k1x;
    const ym = this.y + 0.5 * this.dt * k1y;
    const zm = this.z + 0.5 * this.dt * k1z;

    // k2
    const k2x = this.alpha * (ym - xm - this.h(xm));
    const k2y = xm - ym + zm;
    const k2z = -this.beta * ym;

    // update
    this.x += this.dt * k2x;
    this.y += this.dt * k2y;
    this.z += this.dt * k2z;
  }

  process() {
    for (let steps = 0; steps < this.substeps; steps++) {
      this.step();
    }
    return this.x; // output
  }
}
