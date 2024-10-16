class Pendulum {
  constructor(r1, r2, m1, m2, a1, a2, g, colour) {
    this.colour = colour;
    this.r1 = r1; //radii
    this.r2 = r2;
    this.m1 = m1; //masses
    this.m2 = m2;
    this.a1 = a1; //angles
    this.a2 = a2;
    this.a1_v = 0; //angular velocities
    this.a2_v = 0;
    this.a1_a = 0; //angular acceleration
    this.a2_a = 0;
    this.g = g; // gravity factor
  }

  calculate() {
    let a1_a_num =
      -1.0 * this.g * (2 * this.m1 + this.m2) * sin(this.a1) -
      this.m2 * this.g * sin(this.a1 - 2 * this.a2) -
      2 *
        sin(this.a1 - this.a2) *
        this.m2 *
        (this.a2_v * this.a2_v * this.r2 +
          this.a1_v * this.a1_v * this.r1 * cos(this.a1 - this.a2));
    let a1_a_den =
      this.r1 *
      (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
    this.a1_a = a1_a_num / a1_a_den;

    let a2_a_num =
      2 *
      sin(this.a1 - this.a2) *
      (this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2) +
        this.g * (this.m1 + this.m2) * cos(this.a1) +
        this.a2_v * this.a2_v * this.r2 * this.m2 * cos(this.a1 - this.a2));
    let a2_a_den =
      this.r2 *
      (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));

    this.a2_a = a2_a_num / a2_a_den;

    this.x1 = this.r1 * sin(this.a1);
    this.y1 = this.r1 * cos(this.a1);

    this.x2 = this.x1 + this.r2 * sin(this.a2);
    this.y2 = this.y1 + this.r2 * cos(this.a2);
  }

  show() {
    strokeWeight(2);
    stroke(140);
    line(0, 0, this.x1, this.y1);
    line(this.x1, this.y1, this.x2, this.y2);
    noStroke();
    fill(this.colour);
    ellipse(this.x1, this.y1, this.m1, this.m1);
    ellipse(this.x2, this.y2, this.m2, this.m2);
  }

  update() {
    this.a1_v += this.a1_a;
    this.a2_v += this.a2_a;

    this.a1 += this.a1_v;
    this.a2 += this.a2_v;
  }

  get_x1() {
    return this.x1;
  }

  get_x2() {
    return this.x2;
  }

  get_y1() {
    return this.y1;
  }

  get_y2() {
    return this.y2;
  }

  get_m1() {
    return this.m1;
  }

  get_m2() {
    return this.m2;
  }
  
  get_color() {
    return this.colour;
  }
}
