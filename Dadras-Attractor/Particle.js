class Particle {
  constructor(position, colour, a, b, c, d, e, dt) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;

    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    
    let dx = (this.pos.y - this.a * this.pos.x + this.b * this.pos.y * this.pos.z) * this.dt;
    let dy = (this.c * this.pos.y - this.pos.x * this.pos.z + this.pos.z) * this.dt;
    let dz =
      (this.d * this.pos.x * this.pos.y - this.e * this.pos.z) *
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
