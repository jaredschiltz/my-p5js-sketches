class Dot 
{
  constructor(x,y,max_amplitude,frequency, phase, radius,colour)
  {
     this.pos = createVector(x,y);
    this.colour = colour;
    this.radius = radius
    this.max_amplitude = max_amplitude
    this.frequency = frequency
    this.phase = phase
  }
  
  update() 
  {
    this.pos.y = map(sin(frameCount  * this.frequency + this.phase),-1.0,1.0,-1.0*(height/2 - this.radius/2),height/2 - this.radius/2) 
  }
  
  show()
  {
    fill(this.colour);
    noStroke()
   ellipse(this.pos.x, this.pos.y,this.radius); 
  }
  
}