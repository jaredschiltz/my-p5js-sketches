let maze_image;
let test_image;
const tileSize = 2; // input image size in pixel width; e.g., 2x2 pixels

let tiles;
let adjacencyTable;
let outputImageWidth = 20; // number of horizontal tiles
let outputImageHeight = 20; // number of vertical tiles

// Hold cells that have had their entropy reduced
// This keeps the algorithm from having to recompute the entropy for every cell
// on every pass. Only localized cells are being evaluated, reducing the search space
//let stack = {};

function preload() {
  maze_image = loadImage("red_maze.png");
  //test_image = loadImage("test.png");
}

function setup() {
  createCanvas(500, 500);
  tiles = makeTiles(maze_image, tileSize, false, false);
  //tiles = makeTiles(test_image, tileSize);
  tiles = createFlippedAndRotatedTiles(tiles, true, true);
  tiles = removeDuplicateTiles(tiles);
  //drawTiles(tiles, 10, true);
  adjacencyTable = makeAdjacencyTable(tiles);
  // printAdjacencyTable(adjacencyTable);

  let waveTable = createWaveTable(
    outputImageWidth,
    outputImageHeight,
    tiles.length
  );

  initializeWaveTable(waveTable);
  let smallestIndex = findLowestEntropy(waveTable);
  /*
  print("Smallest Index: " + smallestIndex);
  propagate(
    waveTable,
    adjacencyTable,
    smallestIndex,
    outputImageWidth,
    outputImageHeight
  );
  printWaveTable(waveTable);
  */
  
  while (smallestIndex != 0) {
    /*
    if (smallestIndex == -1) {
      print("Contradiction encountered!!!");
      break;
    } else {
    */
      propagate(
        waveTable,
        adjacencyTable,
        smallestIndex,
        outputImageWidth,
        outputImageHeight
      );
      smallestIndex = findLowestEntropy(waveTable);
   // }
  }
  
  printWaveTable(waveTable)

  print("Complete");

  drawWaveTable(waveTable, tiles, outputImageWidth, outputImageHeight);
  let horizLineSpacing = height / outputImageHeight;
  let vertLineSpacing = width / outputImageWidth;
  stroke(0, 255, 0);
  for (let row = 0; row < outputImageHeight + 1; row++) {
    line(0, row * horizLineSpacing, width, row * horizLineSpacing);
  }
  for (let col = 0; col < outputImageWidth + 1; col++) {
    line(col * vertLineSpacing, 0, col * vertLineSpacing, height);
  }

  // initializeWaveTable(waveTable, adjacencyTable, stack);
  // Print size of the stack
  // print(Object.keys(stack).length)
  // While loop on stack size. When it is zero, loop is done
  /*
  let lowestEntropyIndex;
  while (Object.keys(stack).length != 0) {
    lowestEntropyIndex = findLowestEntropy(stack, tiles.length);
    updateLowestEntropyCell(
      waveTable,
      adjacencyTable,
      stack,
      lowestEntropyIndex
    );
  }
  */

  /*
  let mySet = new Set()
  mySet.add(3)
  mySet.add(3)
  mySet.add(4)
   print(mySet.size)
  print(mySet.has(4))
  mySet.delete(3)
  */

  /*
  print("--------------")
  let a = new Set([3]);
let b = new Set([3]);
  print(a)
  print(b)
let intersection =
    [...a].filter(x => b.has(x));

  console.assert(intersection.length != 0, "no intersection!")
  if (intersection.length == 0){
    print('no value')
  }
  else {
    print('Intersect!')
    print(intersection)
  }
  print("--------------")
  */

  noLoop();
}

function makeTiles(inputImage, tileSize) {
  // take input image and break it into individual tiles
  // go through all offsets
  inputImage.loadPixels();
  let tileArray = [];
  let tileNum = 0;
  for (let row = 0; row < inputImage.height; row++) {
    for (let col = 0; col < inputImage.width; col++) {
      // print("--- new tile " + str(tileNum) + " ---")
      tileArray.push(createImage(tileSize, tileSize));
      tileArray[tileNum].loadPixels();
      let x = 0;
      let y = 0;
      for (let rowTile = row; rowTile < row + tileSize; rowTile++) {
        for (let colTile = col; colTile < col + tileSize; colTile++) {
          /*
          print(
            "irow: " +
              str(rowTile % inputImage.height) +
              " icol: " +
              str(colTile % inputImage.width)
          );
          */
          let imageOffset =
            ((rowTile % inputImage.height) * inputImage.width +
              (colTile % inputImage.width)) *
            4;
          //print("trow: " + str(y % tileSize) + " tcol: " + str(x % tileSize) )
          let tileOffset = ((y % tileSize) * tileSize + (x % tileSize)) * 4;
          tileArray[tileNum].pixels[tileOffset] =
            inputImage.pixels[imageOffset];
          tileArray[tileNum].pixels[tileOffset + 1] =
            inputImage.pixels[imageOffset + 1];
          tileArray[tileNum].pixels[tileOffset + 2] =
            inputImage.pixels[imageOffset + 2];
          tileArray[tileNum].pixels[tileOffset + 3] =
            inputImage.pixels[imageOffset + 3];
          x++;
        }
        y++;
      }
      tileArray[tileNum].updatePixels();
      tileNum++;
    }
  }
  /*
  noSmooth();
  image(tileArray[15], 0, 0, width, height, 0, 0, tileSize, tileSize);
  */
  return tileArray;
}

function drawTiles(tiles, numTilesPerRow, displayText) {
  // Draw all of the accumulated tiles
  //
  fill(0, 0, 255);
  //stroke(0,0,255)
  textSize(20);
  noSmooth();
  const spacing = 10;
  let tileDisplayWidth = floor(
    (width - spacing - numTilesPerRow * spacing) / numTilesPerRow
  );
  let row = -1;
  let numTileCount = 0;
  for (let col = 0; col < tiles.length; col++) {
    if (col % numTilesPerRow == 0) {
      row++;
    }

    image(
      tiles[col],
      spacing + (col % numTilesPerRow) * (tileDisplayWidth + spacing),
      spacing + row * (tileDisplayWidth + spacing),
      tileDisplayWidth,
      tileDisplayWidth,
      0,
      0,
      tiles[0].width,
      tiles[0].width
    );
    if (displayText) {
      text(
        str(numTileCount),
        2 * spacing + (col % numTilesPerRow) * (tileDisplayWidth + spacing),
        3 * spacing + row * (tileDisplayWidth + spacing)
      );
      numTileCount++;
    }
  }
}

function createFlippedAndRotatedTiles(tiles, doFlip, doRotate) {
  let graphic = createGraphics(tiles[0].width, tiles[0].width);
  let numTiles = tiles.length;
  for (let t = 0; t < numTiles; t++) {
    if (doFlip) {
      tiles.push(createImage(tiles[0].width, tiles[0].width));
      graphic.push();
      graphic.noSmooth(); // This generates a warning, but works (keeps transformation pixel sharp)
      graphic.translate(tiles[0].width, 0);
      graphic.scale(-1, 1);
      graphic.image(tiles[t], 0, 0);
      graphic.pop();
      tiles[tiles.length - 1].copy(
        graphic,
        0,
        0,
        tiles[0].width,
        tiles[0].width,
        0,
        0,
        tiles[0].width,
        tiles[0].width
      );

      tiles.push(createImage(tiles[0].width, tiles[0].width));
      graphic.push();
      graphic.noSmooth(); // This generates a warning, but works (keeps transformation pixel sharp)
      graphic.translate(0, tiles[0].width);
      graphic.scale(1, -1);
      graphic.image(tiles[t], 0, 0);
      graphic.pop();
      tiles[tiles.length - 1].copy(
        graphic,
        0,
        0,
        tiles[0].width,
        tiles[0].width,
        0,
        0,
        tiles[0].width,
        tiles[0].width
      );
    }

    if (doRotate) {
      for (let i = 0; i < 3; i++) {
        tiles.push(createImage(tiles[0].width, tiles[0].width));
        graphic.push();
        graphic.imageMode(CENTER);
        graphic.noSmooth(); // This generates a warning, but works (keeps transformation pixel sharp)
        graphic.translate(tiles[0].width / 2, tiles[0].width / 2);
        graphic.rotate((PI / 2) * (i + 1));
        graphic.image(tiles[t], 0, 0);
        graphic.pop();
        tiles[tiles.length - 1].copy(
          graphic,
          0,
          0,
          tiles[0].width,
          tiles[0].width,
          0,
          0,
          tiles[0].width,
          tiles[0].width
        );
      }
    }
  }

  return tiles;
}

function removeDuplicateTiles(tiles) {
  let noDuplicateTiles = [];
  noDuplicateTiles.push(tiles[0]);
  for (let t = 1; t < tiles.length; t++) {
    let duplicateTiles = false;
    for (let ndt = 0; ndt < noDuplicateTiles.length; ndt++) {
      duplicateTiles = isTileIdentical(noDuplicateTiles[ndt], tiles[t]);
      if (duplicateTiles) {
        break;
      }
    }
    if (!duplicateTiles) {
      noDuplicateTiles.push(tiles[t]);
    }
  }
  return noDuplicateTiles;
}

function isTileIdentical(tileOne, tileTwo) {
  tileOne.loadPixels();
  tileTwo.loadPixels();
  for (let row = 0; row < tileOne.width; row++) {
    for (let col = 0; col < tileOne.width; col++) {
      let tileOffset = (row * tileSize + col) * 4;
      if (
        tileOne.pixels[tileOffset] != tileTwo.pixels[tileOffset] ||
        tileOne.pixels[tileOffset + 1] != tileTwo.pixels[tileOffset + 1] ||
        tileOne.pixels[tileOffset + 2] != tileTwo.pixels[tileOffset + 2] ||
        tileOne.pixels[tileOffset + 3] != tileTwo.pixels[tileOffset + 3]
      ) {
        return false;
      }
    }
  }
  return true;
}

function makeAdjacencyTable(tiles) {
  // This only supports tiling mode: i.e., up, down, left, and right
  // This code will have to be modified to support overlap mode which
  // uses the corners
  let adjacencyTable = {};
  adjacencyTable.numTiles = tiles.length;
  for (let t = 0; t < tiles.length; t++) {
    // adjacencyTable[t] = { up: [], down: [], right: [], left: [] };
    adjacencyTable[t] = {
      up: new Set(),
      down: new Set(),
      right: new Set(),
      left: new Set(),
    };
    for (let j = 0; j < tiles.length; j++) {
      if (t != j) {
        tiles[t].loadPixels();
        tiles[j].loadPixels();

        // Check "Up"
        let match = false;
        for (let col = 0; col < tiles[0].width; col++) {
          let topTileOffset = (0 * tiles[0].width + col) * 4;
          let bottomTileOffset =
            ((tiles[0].width - 1) * tiles[0].width + col) * 4;
          if (
            tiles[t].pixels[topTileOffset] ==
              tiles[j].pixels[bottomTileOffset] &&
            tiles[t].pixels[topTileOffset + 1] ==
              tiles[j].pixels[bottomTileOffset + 1] &&
            tiles[t].pixels[topTileOffset + 2] ==
              tiles[j].pixels[bottomTileOffset + 2] &&
            tiles[t].pixels[topTileOffset + 3] ==
              tiles[j].pixels[bottomTileOffset + 3]
          ) {
            match = true;
          } else {
            match = false;
            break;
          }
        }
        if (match) {
          // adjacencyTable[t]["up"].push(j);
          adjacencyTable[t].up.add(j);
        }

        // Check "Down"
        match = false;
        for (let col = 0; col < tiles[0].width; col++) {
          let topTileOffset = (0 * tiles[0].width + col) * 4;
          let bottomTileOffset =
            ((tiles[0].width - 1) * tiles[0].width + col) * 4;
          if (
            tiles[t].pixels[bottomTileOffset] ==
              tiles[j].pixels[topTileOffset] &&
            tiles[t].pixels[bottomTileOffset + 1] ==
              tiles[j].pixels[topTileOffset + 1] &&
            tiles[t].pixels[bottomTileOffset + 2] ==
              tiles[j].pixels[topTileOffset + 2] &&
            tiles[t].pixels[bottomTileOffset + 3] ==
              tiles[j].pixels[topTileOffset + 3]
          ) {
            match = true;
          } else {
            match = false;
            break;
          }
        }
        if (match) {
          // adjacencyTable[t]["down"].push(j);
          adjacencyTable[t].down.add(j);
        }

        // Check "Left"
        match = false;
        for (let row = 0; row < tiles[0].width; row++) {
          let leftTileOffset = (row * tiles[0].width + 0) * 4;
          let rightTileOffset =
            (row * tiles[0].width + (tiles[0].width - 1)) * 4;
          if (
            tiles[t].pixels[leftTileOffset] ==
              tiles[j].pixels[rightTileOffset] &&
            tiles[t].pixels[leftTileOffset + 1] ==
              tiles[j].pixels[rightTileOffset + 1] &&
            tiles[t].pixels[leftTileOffset + 2] ==
              tiles[j].pixels[rightTileOffset + 2] &&
            tiles[t].pixels[leftTileOffset + 3] ==
              tiles[j].pixels[rightTileOffset + 3]
          ) {
            match = true;
          } else {
            match = false;
            break;
          }
        }
        if (match) {
          // adjacencyTable[t]["left"].push(j);
          adjacencyTable[t].left.add(j);
        }

        // Check "Right"
        match = false;
        for (let row = 0; row < tiles[0].width; row++) {
          let leftTileOffset = (row * tiles[0].width + 0) * 4;
          let rightTileOffset =
            (row * tiles[0].width + (tiles[0].width - 1)) * 4;
          if (
            tiles[t].pixels[rightTileOffset] ==
              tiles[j].pixels[leftTileOffset] &&
            tiles[t].pixels[rightTileOffset + 1] ==
              tiles[j].pixels[leftTileOffset + 1] &&
            tiles[t].pixels[rightTileOffset + 2] ==
              tiles[j].pixels[leftTileOffset + 2] &&
            tiles[t].pixels[rightTileOffset + 3] ==
              tiles[j].pixels[leftTileOffset + 3]
          ) {
            match = true;
          } else {
            match = false;
            break;
          }
        }
        if (match) {
          // adjacencyTable[t]["right"].push(j);
          adjacencyTable[t].right.add(j);
        }
      }
    }
  }
  //print(adjacencyTable);
  return adjacencyTable;
}

function printAdjacencyTable(adjacencyTable) {
  for (let i = 0; i < adjacencyTable.numTiles; i++) {
    let tileNumber = "Tile " + str(i) + ": ";
    let up_str = "";
    let iterator = adjacencyTable[i].up.values();
    for (let j = 0; j < adjacencyTable[i].up.size; j++) {
      up_str += str(iterator.next().value) + " ";
    }
    tileNumber += "(up)-> " + up_str;

    let down_str = "";
    iterator = adjacencyTable[i].down.values();
    for (let j = 0; j < adjacencyTable[i].down.size; j++) {
      down_str += str(iterator.next().value) + " ";
    }
    tileNumber += " (down)-> " + down_str;

    let left_str = "";
    iterator = adjacencyTable[i].left.values();
    for (let j = 0; j < adjacencyTable[i].left.size; j++) {
      left_str += str(iterator.next().value) + " ";
    }
    tileNumber += " (left)-> " + left_str;

    let right_str = "";
    iterator = adjacencyTable[i].right.values();
    for (let j = 0; j < adjacencyTable[i].right.size; j++) {
      right_str += str(iterator.next().value) + " ";
    }
    tileNumber += " (right)-> " + right_str;
    print(tileNumber);
  }
}

function drawWaveTable(waveTable, tiles, imageWidth, imageHeight) {
  // Currently assuming canvas will be setup to match
  // waveTableWidth / waveTableHeight proportions
  // In other words, rowSpacing and colSpacing better be the SAME!
  let rowSpacing = floor(height / imageHeight);
  let colSpacing = floor(width / imageWidth);

  // Iterate through entire waveTable and look for cells where entropy is 0 (only one valid pattern)
  // If there is a valid pattern, show that, else draw grey square
  noSmooth();
  let waveTableSize = Object.keys(waveTable).length;
  for (let cell = 0; cell < waveTableSize; cell++) {
    let y_pos = floor(cell / imageWidth);
    let x_pos = cell % imageWidth;
    if (waveTable[cell].entropy == 0) {
      let tileNumber = waveTable[cell].states.values().next().value;
      image(
        tiles[tileNumber],
        x_pos * colSpacing,
        y_pos * rowSpacing,
        rowSpacing,
        rowSpacing
      );
    } else {
      fill(120);
      noStroke();
      rect(x_pos * colSpacing, y_pos * rowSpacing, rowSpacing, rowSpacing);
    }
  }
}

/*
function drawWaveTable(waveTable, tiles) {
  // Currently assuming canvas will be setup to match
  // waveTableWidth / waveTableHeight proportions
  let waveTableHeight = waveTable.length;
  let waveTableWidth = waveTable[0].length;
  let rowSpacing = floor(height / waveTableHeight);
  let colSpacing = floor(width / waveTableWidth);

  // Iterate through entire waveTable and look for cells where size is 1 (only one valid pattern)
  // If there is a valid pattern, show that, else draw grey square
  noSmooth();
  for (let row = 0; row < waveTableHeight; row++) {
    for (let col = 0; col < waveTableWidth; col++) {
      if (waveTable[row][col].size == 1) {
        image(
          tiles[waveTable[row][col].values().next().value],
          col * colSpacing,
          row * rowSpacing,
          rowSpacing,
          rowSpacing
        );
      } else {
        fill(120);
        noStroke();
        rect(col * colSpacing, row * rowSpacing, rowSpacing, rowSpacing);
      }
    }
  }
}
*/

function createWaveTable(width, height, numTiles) {
  // Create a grid used to display tiled image
  // Each cell will will hold the pattern states
  // and entropy

  let waveTable = {};
  for (let i = 0; i < width * height; i++) {
    waveTable[i] = {};
    waveTable[i].states = new Set();

    for (let tiles = 0; tiles < numTiles; tiles++) {
      waveTable[i].states.add(tiles);
    }
    waveTable[i].entropy = numTiles - 1;
  }

  /*
  let waveTable = new Array(height);

  for (let row = 0; row < height; row++) {
    waveTable[row] = new Array(width);
  }

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      waveTable[row][col] = new Set();
      for (let tiles = 0; tiles < numTiles; tiles++) {
        waveTable[row][col].add(tiles);
      }
    }
  }
  */
  // print(waveTable);
  return waveTable;
}

function printWaveTable(waveTable) {
  let waveTableSize = Object.keys(waveTable).length;
  for (let tile = 0; tile < waveTableSize; tile++) {
    let string = "";
    string += "Tile: " + tile + ": ";
    string += "Entropy-> " + waveTable[tile].entropy;
    string += " States-> ";
    if (waveTable[tile].entropy != 0) {
      //print(waveTable[tile].states.size)
      let iterator = waveTable[tile].states.values();
      for (let i = 0; i < waveTable[tile].states.size; i++) {
        string += iterator.next().value + " ";
      }
    }

    print(string);
  }
}

function initializeWaveTable(waveTable) {
  // At the start, all of the cells are in superposition (all tiles possible in each cell)
  // Must choose a random cell and populate with a known state (pattern)
  let waveTableSize = Object.keys(waveTable).length;
  let randomCell = floor(random(waveTableSize));
  //let randomTile = floor(random(waveTable[0].entropy + 1));
  waveTable[randomCell].entropy = 1;
  //waveTable[randomCell].states.clear();
  //waveTable[randomCell].states.add(3);
  //waveTable[randomCell].states.add(5);
}

function findLowestEntropy(waveTable) {
  // Return the cell that has the lowest greater-than-zero entropy,
  // defined as:
  //
  // A return value of zero implies that all cells have been collapsed
  // A return value of -1 signals that contradiction has been detected (no valid patterns)
  // Else: return min entropy with random noise to break ties

  let contradictionDetected = false;
  let allCellsCollapsed = true;
  let smallestValue = Number.MAX_VALUE;
  let smallestIndex = null;
  let waveTableSize = Object.keys(waveTable).length;
  for (let cell = 0; cell < waveTableSize; cell++) {
    //print(waveTable[cell].entropy);
    if (waveTable[cell].entropy == -1) {
      contradictionDetected = true;
      break;
    } else {
      if (waveTable[cell].entropy != 0) {
        allCellsCollapsed = false;
        // Add noise instead of randomly choosing between entries with same entropy value
        let currentValue = waveTable[cell].entropy + (random() - 0.5) / 10;
        if (currentValue < smallestValue) {
          smallestValue = currentValue;
          smallestIndex = cell;
        }
      }
      // If entropy is zero, do not include in
      // finding lowest index
    }
  }

  if (contradictionDetected) {
    return -1;
  } else if (allCellsCollapsed) {
    return 0;
  } else {
    return smallestIndex;
  }
}

function propagate(
  waveTable,
  adjacencyTable,
  smallestIndex,
  imageWidth,
  imageHeight
) {
  // Choose random available pattern from cell options located at smallest index
  let availableTiles = Array.from(waveTable[smallestIndex].states);
  let chosenTile = availableTiles[floor(random() * availableTiles.length)];
  console.assert(
    chosenTile != undefined,
    "No patterns to choose from on selected tile!"
  );

  // Change the entropy associated with this waveTable cell to 0
  waveTable[smallestIndex].entropy = 0;
  waveTable[smallestIndex].states.clear();
  waveTable[smallestIndex].states.add(chosenTile);

  // Update the surrounding cells using the adjacency table and their entropies
  // Continue this process recursively until there are no more updates; i.e.,
  // there are no more collapsed cells

  function update(waveTable, adjacencyTable, index, imageWidth, imageHeight) {
    // print("entering update function...");
    // Calculate positions of neighboring cells (including wrap-around)
    let y_pos = floor(index / imageWidth);
    let x_pos = index % imageWidth;
    let upCell = (((y_pos - 1) % imageHeight) + imageHeight) % imageHeight;
    let downCell = (((y_pos + 1) % imageHeight) + imageHeight) % imageHeight;
    let leftCell = (((x_pos - 1) % imageWidth) + imageWidth) % imageWidth;
    let rightCell = (((x_pos + 1) % imageWidth) + imageWidth) % imageWidth;
    // Translate these in cellNumbers
    upCell = upCell * imageWidth + x_pos;
    downCell = downCell * imageWidth + x_pos;
    leftCell = y_pos * imageWidth + leftCell;
    rightCell = y_pos * imageWidth + rightCell;

    /*
    print("center: ", index);
    print("up: ", upCell);
    print("down: ", downCell);
    print("left: ", leftCell);
    print("right: ", rightCell);
    */

    if (waveTable[upCell].entropy != 0) {
      // Only update neighbor cell that has not been collapsed
      let intersection = [...waveTable[upCell].states].filter((x) =>
        adjacencyTable[waveTable[index].states.values().next().value].up.has(x)
      );

      if (intersection.length == 0) {
        // No intersection, therefore contradiction
        print("Contradict!: " + "current: " + index + " up: " + upCell);
        //waveTable[upCell].entropy = -1;
      } else {
        waveTable[upCell].states.clear();
        for (let i of intersection) {
          waveTable[upCell].states.add(i);
        }
        waveTable[upCell].entropy = intersection.length - 1;
        if (intersection.length == 1) {
          print("only one up" + " current: " + index + " up: " + upCell);
          update(waveTable, adjacencyTable, upCell, imageWidth, imageHeight);
        }
      }
    }

    if (waveTable[downCell].entropy != 0) {
      // Only update neighbor cell that has not been collapsed
      let intersection = [...waveTable[downCell].states].filter((x) =>
        adjacencyTable[waveTable[index].states.values().next().value].down.has(
          x
        )
      );
      if (intersection.length == 0) {
        // No intersection, therefore contradiction
        print("Contradict!: " + "current: " + index + " down: " + downCell);
        //waveTable[downCell].entropy = -1;
      } else {
        waveTable[downCell].states.clear();
        for (let i of intersection) {
          waveTable[downCell].states.add(i);
        }
        waveTable[downCell].entropy = intersection.length - 1;
        if (intersection.length == 1) {
          print("only one down" + " current: " + index + " down: " + downCell);
          update(waveTable, adjacencyTable, downCell, imageWidth, imageHeight);
        }
      }
    }

    if (waveTable[leftCell].entropy != 0) {
      // Only update neighbor cell that has not been collapsed
      let intersection = [...waveTable[leftCell].states].filter((x) =>
        adjacencyTable[waveTable[index].states.values().next().value].left.has(
          x
        )
      );
      if (intersection.length == 0) {
        // No intersection, therefore contradiction
        print("Contradict!: " + "current: " + index + " left: " + leftCell);
        //waveTable[leftCell].entropy = -1;
      } else {
        waveTable[leftCell].states.clear();
        for (let i of intersection) {
          waveTable[leftCell].states.add(i);
        }
        waveTable[leftCell].entropy = intersection.length - 1;
        if (intersection.length == 1) {
          print("only one left" + " current: " + index + " left: " + leftCell);
          update(waveTable, adjacencyTable, leftCell, imageWidth, imageHeight);
        }
      }
    }

    if (waveTable[rightCell].entropy != 0) {
      // Only update neighbor cell that has not been collapsed
      let intersection = [...waveTable[rightCell].states].filter((x) =>
        adjacencyTable[waveTable[index].states.values().next().value].right.has(
          x
        )
      );
      if (intersection.length == 0) {
        // No intersection, therefore contradiction
        print("Contradict!: " + "current: " + index + " right: " + rightCell);
        //waveTable[rightCell].entropy = -1;
      } else {
        waveTable[rightCell].states.clear();
        for (let i of intersection) {
          waveTable[rightCell].states.add(i);
        }
        waveTable[rightCell].entropy = intersection.length - 1;
        if (intersection.length == 1) {
          print(
            "only one right" + " current: " + index + " right: " + rightCell
          );
          update(waveTable, adjacencyTable, rightCell, imageWidth, imageHeight);
        }
      }
    }

    //  print("... exiting update function");
    //print(waveTable);
    // End update function //
  }

  // Update neighbors
  update(waveTable, adjacencyTable, smallestIndex, imageWidth, imageHeight);
}

/*
function initializeWaveTable(waveTable, adjacencyTable, stack) {
  // At the start, all of the cells are in superposition (all tiles possible in each cell)
  // Must choose a random cell and populate with a known state (pattern)
  let waveTableHeight = waveTable.length;
  let waveTableWidth = waveTable[0].length;
  let randomRow = floor(random(waveTableHeight));
  let randomCol = floor(random(waveTableWidth));
  let randomTile = floor(random(waveTable[0][0].size));

  waveTable[randomRow][randomCol].clear();
  waveTable[randomRow][randomCol].add(randomTile);

  propagate(waveTable, adjacencyTable, stack, randomRow, randomCol);
}

function propagate(waveTable, adjacencyTable, stack, currentRow, currentCol) {
  // Add neighboring cells to the stack
  // Not evaluating neighboring cells in wrap-around fashion
  // If the cell is not within the bounds of the table, ignore
  // Update the corresponding waveTable entries (reduce the state possibilities)

  let waveTableHeight = waveTable.length;
  let waveTableWidth = waveTable[0].length;
  //print(waveTable[currentRow][currentCol])
  //print(waveTable[currentRow][currentCol].values().next().value)
  let currentTileNum = waveTable[currentRow][currentCol].values().next().value;

  if (currentRow - 1 >= 0) {
    //print("row - 1: " + str(currentCol) + " " + str(currentRow - 1));
    // Do not evaluate adjacent cells that have already been determined
    if (waveTable[currentRow - 1][currentCol].size > 1) {
      let rowAdjacency = new Set(adjacencyTable[currentTileNum]["up"]);
      let rowTableValue = waveTable[currentRow - 1][currentCol];

      let intersection = [...rowTableValue].filter((x) => rowAdjacency.has(x));
      console.assert(
        intersection.length != 0,
        "No Intersection In Initialization!"
      );
      waveTable[currentRow - 1][currentCol].clear();
      for (let i of intersection) {
        waveTable[currentRow - 1][currentCol].add(i);
      }
      if (intersection.length != 1) {
        let tileOffset = (currentRow - 1) * waveTableWidth + currentCol;
        stack[tileOffset] = intersection.length;
      }
    }
  }

  if (currentRow < waveTableHeight - 1) {
    //print("row + 1: " + str(currentCol) + " " + str(currentRow + 1));
    // Do not evaluate adjacent cells that have already been determined
    if (waveTable[currentRow + 1][currentCol].size > 1) {
      let rowAdjacency = new Set(adjacencyTable[currentTileNum]["down"]);
      let rowTableValue = waveTable[currentRow + 1][currentCol];

      let intersection = [...rowTableValue].filter((x) => rowAdjacency.has(x));
      console.assert(
        intersection.length != 0,
        "No Intersection In Initialization!"
      );
      waveTable[currentRow + 1][currentCol].clear();
      for (let i of intersection) {
        waveTable[currentRow + 1][currentCol].add(i);
      }
      if (intersection.length != 1) {
        let tileOffset = (currentRow + 1) * waveTableWidth + currentCol;
        stack[tileOffset] = intersection.length;
      }
    }
  }
  if (currentCol - 1 >= 0) {
    //print("col - 1: " + str(currentCol - 1) + " " + str(currentRow));
    // Do not evaluate adjacent cells that have already been determined
    if (waveTable[currentRow][currentCol - 1].size > 1) {
      let colAdjacency = new Set(adjacencyTable[currentTileNum]["left"]);
      let colTableValue = waveTable[currentRow][currentCol - 1];

      let intersection = [...colTableValue].filter((x) => colAdjacency.has(x));
      console.assert(
        intersection.length != 0,
        "No Intersection In Initialization!"
      );
      waveTable[currentRow][currentCol - 1].clear();
      for (let i of intersection) {
        waveTable[currentRow][currentCol - 1].add(i);
      }
      if (intersection.length != 1) {
        let tileOffset = currentRow * waveTableWidth + (currentCol - 1);
        stack[tileOffset] = intersection.length;
      }
    }
  }
  if (currentCol < waveTableWidth - 1) {
    //print("col + 1: " + str(currentCol + 1) + " " + str(currentRow));
    // Do not evaluate adjacent cells that have already been determined
    if (waveTable[currentRow][currentCol + 1].size > 1) {
      let colAdjacency = new Set(adjacencyTable[currentTileNum]["right"]);
      let colTableValue = waveTable[currentRow][currentCol + 1];

      let intersection = [...colTableValue].filter((x) => colAdjacency.has(x));
      console.assert(
        intersection.length != 0,
        "No Intersection In Initialization!"
      );
      waveTable[currentRow][currentCol + 1].clear();
      for (let i of intersection) {
        waveTable[currentRow][currentCol + 1].add(i);
      }
      if (intersection.length != 1) {
        let tileOffset = currentRow * waveTableWidth + (currentCol + 1);
        stack[tileOffset] = intersection.length;
      }
    }
  }
}

function findLowestEntropy(stack, numTiles) {
  //let waveTableHeight = waveTable.length;
  //let waveTableWidth = waveTable[0].length;

  // Deep copy stack object, so this doesn't get corrupted when we add noise
  let stack_copy = { ...stack };

  // Add noise instead of randomly choosing between entries with same entropy value
  for (let [key, value] of Object.entries(stack)) {
    stack_copy[key] += (random() - 0.5) / 5;
  }
  // Search stack for smallest entropy value
  let smallestValue = numTiles + 1;
  let smallestIndex = null;
  for (const [key, value] of Object.entries(stack_copy)) {
    if (value < smallestValue) {
      smallestValue = value;
      smallestIndex = key;
    }
  }
  
  //print(smallestValue)
  //print(smallestIndex)
  //print(stack)
  //print(stack_copy)
  

  //let y_pos = floor(smallestIndex / waveTableHeight);
  //let x_pos = smallestIndex % waveTableWidth;
  return smallestIndex;
}

function updateLowestEntropyCell(
  waveTable,
  adjacencyTable,
  stack,
  lowestEntropyIndex
) {
  // Decode lowestEntropyIndex into row and column
  // print(lowestEntropyIndex)
  let waveTableHeight = waveTable.length;
  let waveTableWidth = waveTable[0].length;
  let y = floor(lowestEntropyIndex / waveTableHeight);
  let x = lowestEntropyIndex % waveTableWidth;
  //print(x + " " + y)
  let rowTableValue = waveTable[y][x];
  //print(rowTableValue)
  // Select a tile at random among possibilities
  let selectedTile = getRandomItem(waveTable[y][x]);
  //print(selectedTile)
  waveTable[y][x].clear();
  waveTable[y][x].add(selectedTile);
  // Delete this item from the stack
  delete stack[lowestEntropyIndex];

  // Evaluate neighbors
  propagate(waveTable, adjacencyTable, stack, y, x);
}

function getRandomItem(set) {
  let items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}
*/

function draw() {}
