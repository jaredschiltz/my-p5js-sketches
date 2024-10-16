class Particle {
  constructor(position, colour, a, dt) {
    this.a = a;

    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    let dx =
      (-this.a * this.pos.x -
        4 * this.pos.y -
        4 * this.pos.z -
        this.pos.y ** 2) *
      this.dt;
    let dy =
      (-this.a * this.pos.y -
        4 * this.pos.z -
        4 * this.pos.x -
        this.pos.z ** 2) *
      this.dt;
    let dz =
      (-this.a * this.pos.z -
        4 * this.pos.x -
        4 * this.pos.y -
        this.pos.x ** 2) *
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
    sphere(0.06);
    pop();
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
}
