let snake;
let rez = 10;
let food;
let curPos;

function setup() {
  createCanvas(400, 400);
  snake = new Snake(rez,width,height);
  newFoodLocation();
  frameRate(12);
  curPos = createVector(0,0);
}

function draw() {
  background(0);
  noStroke();
  fill(255,0,0);
  
  rect(food.x*rez,food.y*rez,rez,rez);
  snake.update();
  if(snake.eat(food))
  {
    newFoodLocation();
  }
  
  snake.show();
}

function newFoodLocation()
{
  food = createVector(floor(random(0,width/rez)),floor(random(0,height/rez)));
}

function keyPressed()
{
  
  if (keyCode === UP_ARROW)
  {   if(curPos.y <= 0)
    {
      snake.setDir(0,-1*rez);
    }
  }
  else if (keyCode === DOWN_ARROW)
  {
    if(curPos.y >= 0)
    {
      snake.setDir(0,1*rez);
    }
  }
    else if (keyCode === RIGHT_ARROW)
  {
    if(curPos.x >= 0)
    {
      snake.setDir(1*rez,0);
    }
  }
    else if (keyCode === LEFT_ARROW)
  {
    if(curPos.x <=0)
    {
      snake.setDir(-1*rez,0);
    }
  }
  
   curPos.set(snake.xdir,snake.ydir);
}

