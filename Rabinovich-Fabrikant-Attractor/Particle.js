class Particle {
  constructor(position, colour, a, gamma, dt) {
    this.a = a;
    this.gamma = gamma;
    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    let dx =
      (this.pos.y * (this.pos.z - 1 + this.pos.x ** 2) + this.gamma * this.pos.x) *
      this.dt;
    let dy =
      (this.pos.x * (3 * this.pos.z + 1 - this.pos.x ** 2) +
        this.gamma * this.pos.y) *
      this.dt;
    let dz = -2 * this.pos.z * (this.a + this.pos.x * this.pos.y) * this.dt;

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
