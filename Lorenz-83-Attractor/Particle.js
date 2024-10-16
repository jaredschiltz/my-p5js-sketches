class Particle {
  constructor(position, colour, a, b, f, g, dt) {
    this.a = a;
    this.b = b;
    this.f = f;
    this.g = g;
    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    let dx =
      (-this.a * this.pos.x -
        this.pos.y ** 2 -
        this.pos.z ** 2 +
        this.a * this.f) *
      this.dt;
    let dy =
      (-this.pos.y +
        this.pos.x * this.pos.y -
        this.b * this.pos.x * this.pos.z +
        this.g) *
      this.dt;
    let dz =
      (-this.pos.z +
        this.b * this.pos.x * this.pos.y +
        this.pos.x * this.pos.z) *
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
