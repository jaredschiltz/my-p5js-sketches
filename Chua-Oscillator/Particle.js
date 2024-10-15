class Particle {
  constructor(position, colour, alpha_var, beta_var, m0, m1, dt) {
    this.alpha_var = alpha_var;
    this.beta_var = beta_var;
    this.m0 = m0;
    this.m1 = m1;


    this.dt = dt;
    this.pos = position;
    this.colour = colour;
  }

  update() {
    
     let dx = (this.alpha_var * (this.pos.y - this.pos.x - this.nonlinear_function(this.pos.x,this.m0,this.m1))) * this.dt;
    let dy = (this.pos.x - this.pos.y + this.pos.z) * this.dt;
    let dz = (-1.0 * this.beta_var * this.pos.y) * this.dt;
    

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
    sphere(0.03);
    pop();
    //sphere(this.pos.x, this.pos.y, this.pos.z);
  }
  
  nonlinear_function(x, m0, m1) {
  return m1*x+0.5*(m0-m1)*(abs(x+1)-abs(x-1));
  }

}
