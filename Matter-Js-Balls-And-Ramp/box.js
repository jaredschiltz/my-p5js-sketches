'use strict'
class Box
  {
    constructor(x, y, w, h)
    {
      this.options = {
        friction: 0.01,
        restitution: 0.5
      }
      this.body = Bodies.rectangle(x, y, w, h, this.options)
      World.add(world, this.body)
      this.w = w
      this.h = h
      this.color = [random(0, 256), random(0, 256), random(0,256)]
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
      rect(0, 0, this.w, this.h)
      
      pop()
    }
  }