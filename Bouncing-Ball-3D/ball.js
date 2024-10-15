class Ball
{
  constructor(x,y,z,colour)
  {
     this.pos = createVector(x,y,z);
     this.velocityVector = p5.Vector.random3D();
     this.speed = 3;
     this.velocityVector.mult(this.speed);
     this.colour = colour;
     this.vectorSpeed = 0.1;
  }
  
  update() 
  {
     this.pos.add(this.velocityVector);
    
     if(this.pos.z >= 100 || this.pos.z <= -100)
     {
       this.velocityVector.z = this.velocityVector.z * -1;
     }
     
     if(this.pos.y >= 100 || this.pos.y <= -100)
     {
       this.velocityVector.y = this.velocityVector.y * -1;
     }
    
         if(this.pos.x >= 100 || this.pos.x <= -100)
     {
       this.velocityVector.x = this.velocityVector.x * -1;
     }
  }
  
  show()
  {
    push();
    stroke(this.colour);
    //fill();
    translate(this.pos);
    sphere(1);
    pop();
  }
  
}