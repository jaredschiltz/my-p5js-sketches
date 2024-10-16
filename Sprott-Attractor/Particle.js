class Particle {
  constructor(position, colour, a, b, dt) {
    this.a = a;
    this.b = b;

    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    let dx =
      (this.pos.y +
        this.a * this.pos.x * this.pos.y +
        this.pos.x * this.pos.z) *
      this.dt;
    let dy = (1 - this.b * this.pos.x ** 2 + this.pos.y * this.pos.z) * this.dt;
    let dz = (this.pos.x - this.pos.x ** 2 - this.pos.y ** 2) * this.dt;

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
    sphere(0.02);
    pop();
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
}
