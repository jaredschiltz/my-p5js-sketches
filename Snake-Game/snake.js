class Snake
{
  constructor(rez,width,height) 
  {
  this.body = [];
  this.body[0] = createVector(0,0);
  this.xdir = 0;
  this.ydir = 0;
  this.res = rez;
  this.width = width;
  this.height = height;
  }
  
  restart()
  {
  this.body = [];
  this.body[0] = createVector(0,0);
  this.xdir = 0;
  this.ydir = 0;
  }
  
  setDir(x, y)
  {
    this.xdir = x;
    this.ydir = y;
  }
  
  update()
  {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    
    if(this.endGame())
    {
      this.restart();
    }
     
  
    
  }
  
  endGame()
  {
    let head = this.body[this.body.length - 1].copy();
      
    //detect wall collisions
    if(head.x < 0 || head.x > width)
    {
       return true;
    }
    if(head.y < 0 || head.y > height)
    {
       return true;
    }
    
    //detect head collision with rest of body
    for(let i = 0; i < this.body.length-1; i++)
    {
        let part = this.body[i];
        if(part.x == head.x && part.y == head.y)
        {
          return true;
        }
    }
    
    return false;
    
  }
  
  eat(pos)
  {
    if(this.body[this.body.length-1].x === pos.x*rez && this.body[this.body.length-1].y === pos.y*rez)
    {
      this.grow();
      return true;
    }
    else
    {
      return false;
    }
  }
  
  grow()
  {
   let head = this.body[this.body.length - 1].copy();
   this.body.push(head);
    
  }
  
  show()
  {
    fill(0,255,0);
    for(let l = 0; l < this.body.length; l++)
    {
      rect(this.body[l].x,this.body[l].y,rez,rez);
    }
  }
  
}