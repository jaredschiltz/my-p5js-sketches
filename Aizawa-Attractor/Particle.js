class Particle {
  constructor(position, colour, a, b, c, d, e, f, dt) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;

    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    let dx =
      ((this.pos.z - this.b) * this.pos.x - this.d * this.pos.y) * this.dt;
    let dy =
      (this.d * this.pos.x + (this.pos.z - this.b) * this.pos.y) * this.dt;
    let dz =
      (this.c +
        this.a * this.pos.z -
        this.pos.z ** 3 / 3.0 -
        (this.pos.x ** 2 + this.pos.y ** 2) * (1 + this.e * this.pos.z) +
        this.f * this.pos.z * this.pos.x ** 3) *
      this.dt;


    this.pos.x = this.pos.x + dx;
    this.pos.y = this.pos.y + dy;
    this.pos.z = this.pos.z + dz;
  }

  show() {
    stroke(this.colour);
    strokeWeight(0.1);
    //print(this.pos.x, this.pos.y, this.pos.z)
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(0.01);
    pop();
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
}
