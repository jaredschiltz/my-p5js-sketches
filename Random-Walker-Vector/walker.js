class Walker 
{
  constructor(x,y,colour)
  {
     this.pos = createVector(x,y);
    this.colour = colour;
  }
  
  update() 
  {
     this.pos.x = this.pos.x + random(-1,1);
     this.pos.y = this.pos.y + random(-1,1)
  }
  
  show()
  {
    stroke(this.colour);
    strokeWeight(2);
   point(this.pos.x, this.pos.y); 
  }
  
}