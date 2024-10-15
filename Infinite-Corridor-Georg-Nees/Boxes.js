class Boxes 
{
  constructor(x,y,z,w,h,d, velocity)
  {
     this.pos = createVector(x,y,z);
     this.dim = createVector(w,h,d)
     this.velocity = velocity
  }
  
  update() 
  {
     this.pos.z = this.pos.z + this.velocity
  }
  
}