class Particle {
  constructor(position, colour, beta, dt) {
    this.beta = beta;
    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
     let dx = (sin(this.pos.y) - this.beta * this.pos.x) * this.dt
    let dy = (sin(this.pos.z) - this.beta * this.pos.y) * this.dt
    let dz = (sin(this.pos.x) - this.beta * this.pos.z) * this.dt

    this.pos.x = this.pos.x + dx;
    this.pos.y = this.pos.y + dy;
    this.pos.z = this.pos.z + dz;
  }

  show() {
    stroke(this.colour);
    strokeWeight(0.25);
    //print(this.pos.x, this.pos.y, this.pos.z)
    push()
      translate(this.pos.x, this.pos.y, this.pos.z)
    sphere(0.01)
    pop()
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
}
