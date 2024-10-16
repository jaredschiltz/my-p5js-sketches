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
      (this.a * (this.pos.y - this.pos.x) + this.d * this.pos.x * this.pos.z) *
      this.dt;
    let dy =
      (this.b * this.pos.x - this.pos.x * this.pos.z + this.f * this.pos.y) *
      this.dt;
    let dz =
      (this.c * this.pos.z +
        this.pos.x * this.pos.y -
        this.e * this.pos.x ** 2) *
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
    sphere(0.6);
    pop();
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
}
