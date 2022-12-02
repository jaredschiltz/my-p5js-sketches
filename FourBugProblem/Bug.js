class Bug
{
  constructor(x,y,colour)
  {
    this.pos = createVector(x,y);
    this.colour = colour;
  }
  
  update(other_bugs_position) 
  {
    // Calculate vector
    this.pos.add(p5.Vector.normalize(p5.Vector.sub(other_bugs_position, this.pos)))
  }

  get_position(){
    return {x: this.pos.x, y: this.pos.y}
  }
  
  show()
  {
    stroke(this.colour);
    //strokeWeight(2);
    point(this.pos.x, this.pos.y); 
  }
  
}