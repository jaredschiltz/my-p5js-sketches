let cols = 20;
let rows = 20;
let cellWidth;
let cellHeight;
let gridArray = new Array(cols);
let probabilityOfWalls = 0.35;
let shortestPathGraph;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < rows; i++) {
    gridArray[i] = new Array(rows);
  }
  cellWidth = width / cols;
  cellHeight = height / rows;
  // Randomly populate cells with 0's (paths) and 1's (walls)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (Math.random() > probabilityOfWalls) {
        gridArray[i][j] = 1; // path
      } else {
        gridArray[i][j] = 0; // wall
      }
    }
  }
  // Make sure start and end cells do not contain a wall
  gridArray[0][0] = 1; // start
  gridArray[cols - 1][rows - 1] = 1; // end

  // Start A*Path Finding
  // Manhattan
  //let graph = new Graph(gridArray);
  // Diagonal
  let graph = new Graph(gridArray, { diagonal: true })
  
  let start = graph.grid[0][0];
  let end = graph.grid[cols - 1][rows - 1];
  
  // Manhanttan hueristic
  //shortestPathGraph = astar.search(graph, start, end)
  
  // Diagonal hueristic
  shortestPathGraph = astar.search(graph, start, end, {heuristic: astar.heuristics.diagonal })

  noLoop();
}

function draw() {
  background(220);

  //Draw paths and walls
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (gridArray[i][j] == 0) {
        fill(0); // wall
      } else {
        fill(255); // path
      }
      rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
  }
  // Draw shortest path

  if (shortestPathGraph.length > 0) {
    for (let i = 0; i < shortestPathGraph.length; i++)
      {
        fill(0, 255, 0)
        rect(shortestPathGraph[i].x * cellWidth, 
             shortestPathGraph[i].y * cellHeight,
             cellWidth, cellHeight)
      }
    console.log("found path")
  }
  else
    {
      console.log("could not find path")
    }
}
