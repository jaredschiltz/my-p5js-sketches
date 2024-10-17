class generator {
  constructor(center, radius) {
    this.center = center
    this.radius = radius
    this.speed = 0.1
    this.currentAngle = 0;
  }

  update() {
   
    this.currentAngle += + this.speed

  }
  
  setSpeed(speed)
  {
    this.speed = speed
  }
  
  getX()
  {
    return cos(this.currentAngle) * this.radius + this.center.x
  }
  
  getY()
  {
    return sin(this.currentAngle) * this.radius + this.center.y
  }
  
  getZ()
  {
    return cos(this.currentAngle + PI/4) * this.radius + this.center.x
  }


}