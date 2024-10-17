class VectorObj{
  constructor(x, y)
  {
    this.pos = createVector(x, y)
    this.dir = createVector(1, 1)
  }
  
  lookAt(x,y)
{
  this.dir.x = x - this.pos.x
  this.dir.y = y - this.pos.y
  this.dir.normalize()
}  
  show(colorVal)
  {
    stroke(colorVal)
    push()
    translate(this.pos.x, this.pos.y)
    line(0, 0, this.dir.x * 100, this.dir.y * 100)
    pop()
  }
}