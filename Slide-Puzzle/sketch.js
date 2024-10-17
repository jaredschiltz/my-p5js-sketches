let img;
const ROWS_COLS = 4
;
let puzzlePieceSize;
let imgCellSize;
let randomArray;
let gridArray;

function preload() {
  img = loadImage("pug.jpg");
}

function setup() {
  createCanvas(600, 600);
  puzzlePieceSize = floor(width / ROWS_COLS);
  imgCellSize = floor(img.width / ROWS_COLS);
  //Populate grid with cell numbers and randomize
  randomArray = [];
  for (let i = 0; i < ROWS_COLS * ROWS_COLS; i++) {
    randomArray[i] = i;
  }
  randomArray = shuffle(randomArray);

  //Create Grid Array and populate with randomArray values
  gridArray = [];
  let randomArrayIndex = 0;
  for (let i = 0; i < ROWS_COLS; i++) {
    gridArray[i] = [];
    for (let j = 0; j < ROWS_COLS; j++) {
      gridArray[i][j] = randomArray[randomArrayIndex];
      randomArrayIndex++;
    }
  }

}

function draw() {
  background(60);

  //Draw Grid
  for (let i = 0; i < ROWS_COLS; i++) {
    for (let j = 0; j < ROWS_COLS; j++) {
      if (gridArray[i][j] != ROWS_COLS * ROWS_COLS - 1) {
        image(
          img,
          j * puzzlePieceSize,
          i * puzzlePieceSize,
          puzzlePieceSize,
          puzzlePieceSize,
          (gridArray[i][j] % ROWS_COLS) * imgCellSize,
          floor(gridArray[i][j] / ROWS_COLS) * imgCellSize,
          imgCellSize,
          imgCellSize
        );
      }
    }
  }
  
  //Draw Grid Lines
   for (let i = 0; i <= ROWS_COLS; i++) {
    line(0, i * puzzlePieceSize, width, i * puzzlePieceSize);
    line(i * puzzlePieceSize, 0, i * puzzlePieceSize, height)
   };
  
}

function mousePressed()
{
  //Determine which grid the mouse click is in
  let x = floor((mouseX / width) * ROWS_COLS);
  let y = floor((mouseY / height) * ROWS_COLS);
  //Handle clicks outside canvas
  if (x > ROWS_COLS - 1)
    {
      x = ROWS_COLS - 1;
    }
  if (x < 0)
    {
      x = 0;
    }
  
  if (y > ROWS_COLS - 1)
    {
      y = ROWS_COLS - 1;
    }
  if (y < 0)
    {
      y = 0;
    }
  
  //console.log(gridArray[y][x])
  
  //Find Blank tile location
  let blankX
  let blankY
    for (let i = 0; i < ROWS_COLS; i++) {
    for (let j = 0; j < ROWS_COLS; j++) {
      if(gridArray[i][j] == ROWS_COLS * ROWS_COLS - 1)
        {
          blankX = j;
          blankY = i;
        }
    }
    }

  let tempTile;
  //Determine if click is valid and if valid perform swap
  if(blankX + 1 == x && blankY == y)
    {
     // console.log("right")
      tempTile = gridArray[y][x];
      gridArray[y][x] = ROWS_COLS * ROWS_COLS - 1;
      gridArray[y][x - 1] = tempTile;
      
    }
  else if (blankX - 1 == x && blankY == y)
    {
      //console.log("left")
      tempTile = gridArray[y][x];
      gridArray[y][x] = ROWS_COLS * ROWS_COLS - 1;
      gridArray[y][x + 1] = tempTile;
    }
  else if (blankX == x && blankY + 1 == y)
    {
      //console.log("bottom")
      tempTile = gridArray[y][x];
      gridArray[y][x] = ROWS_COLS * ROWS_COLS - 1;
      gridArray[y - 1][x] = tempTile;
    }
  else if (blankX == x && blankY - 1 == y)
    {
      //console.log("top")
        tempTile = gridArray[y][x];
      gridArray[y][x] = ROWS_COLS * ROWS_COLS - 1;
      gridArray[y + 1][x] = tempTile;
    }
  
  //Check to see if puzzle has been solved
  let tileNumber = 0;
  let solved = true;
  for(let i = 0 ; i < ROWS_COLS; i++)
    {
      for(let j = 0; j < ROWS_COLS; j++)
        {
          if(gridArray[i][j] != tileNumber)
            {
              solved = false;
            }
          tileNumber++;
        }
    }
  if (solved == true)
    {
      console.log("Congratulations!")
    }
 
  
}
