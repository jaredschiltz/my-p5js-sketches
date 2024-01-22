'use strict'
class Circle
  {
    constructor(x, y, r)
    {
      this.options = {
        friction: 0.01,
        restitution: 0.5
      }
      this.body = Bodies.circle(x, y, r, this.options)
      World.add(world, this.body)
      this.color = [random(0, 256), random(0, 256), random(0,256)]
      this.r = r
    }
    
    show()
    {
      let pos = this.body.position
      let angle = this.body.angle
      push()
      translate(pos.x, pos.y)
      rotate(angle)
      rectMode(CENTER)
      fill(this.color)
      ellipse(0, 0, this.r * 2)
      
      pop()
    }
    
    isOffScreen()
    {
      return this.body.position.y > height + 100
    }
    
    removeFromWorld()
    {
      World.remove(world, this.body)
    }
  }