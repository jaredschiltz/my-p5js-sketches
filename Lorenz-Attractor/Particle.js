class Particle {
  constructor(position, colour, rho, beta, sigma, dt) {
    this.rho = rho;
    this.beta = beta;
    this.sigma = sigma;
    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    let dx = this.sigma * (this.pos.y - this.pos.x) * this.dt;
    let dy =
      (this.pos.x * (this.rho - this.pos.z) - this.pos.y) *
      this.dt;
    let dz =
      (this.pos.x * this.pos.y - this.beta * this.pos.z) *
      this.dt;

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
    sphere(0.1)
    pop()
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
}
