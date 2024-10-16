let myImage;
const paletteSpacing = 10;
const numPalettes = 10;
const totalSpacing = paletteSpacing * (numPalettes + 1);
let paletteSize;

let data = [];
let k = numPalettes; // number of clusters
let centroid = [];
let centroidIndex = [];
let clusters = [];
const imageWidth = 263;
const imageHeight = 300;
let mousePressedBool = false

function preload() {
  myImage = loadImage("sunflower.jpg");
}

function setup() {
  createCanvas(400, 400);
  paletteSize = int((height - totalSpacing) / numPalettes);

  // Populate data array with pixel data
  data = new Array(imageHeight);
  for (let i = 0; i < imageHeight; i++) {
    data[i] = new Array(imageWidth);
  }

  for (let rows = 0; rows < imageHeight; rows++) {
    for (let cols = 0; cols < imageWidth; cols++) {
      data[rows][cols] = { r: 0, g: 0, b: 0 };
    }
  }

  for (let rows = 0; rows < imageHeight; rows++) {
    for (let cols = 0; cols < imageWidth; cols++) {
      let pixelData = myImage.get(cols, rows);
      data[rows][cols].r = pixelData[0];
      data[rows][cols].g = pixelData[1];
      data[rows][cols].b = pixelData[2];
    }
  }

  console.log("Done reading in pixel data.");

  clusters = new Array(k);
  for (let i = 0; i < clusters.length; i++) {
    clusters[i] = new Array();
  }

  // Step 1: Select k random points from data as starting centroids
  //         Each point must be different. CentroidIndex holds the
  //         x / y coordinates for all of the current centroids.
  for (let i = 0; i < k; i++) {
    if (i == 0) {
      centroidIndex[0] = {
        rows: Math.floor(Math.random() * imageHeight),
        cols: Math.floor(Math.random() * imageWidth),
      };
    } else {
      let differentValue = false;

      while (!differentValue) {
        let newRowValue = Math.floor(Math.random() * imageHeight);
        let newColValue = Math.floor(Math.random() * imageWidth);
        // compare against all previous values
        for (let j = 0; j < i; j++) {
          if (
            newRowValue != centroidIndex[j].rows &&
            newColValue != centroidIndex[j].cols
          ) {
            differentValue = true;
            centroidIndex[i] = { rows: newRowValue, cols: newColValue };
          } else {
            differentValue = false;
            break;
          }
        }
      }
    }
  }

  noLoop();
}

function draw() {
      background(220);
    image(myImage, 0, 0);
  const maxIterations = 5;
  for (let iterations = 0; iterations < maxIterations; iterations++) {

    //
    // Populate centroid array. The centroid array holds the pixels values at
    // each associated centroid coordinate.
    for (i = 0; i < k; i++) {
      centroid[i] = data[centroidIndex[i].rows][centroidIndex[i].cols];
    }
    
    for (i = 0; i < k; i++){
      fill(255,0,0)
      circle(centroidIndex[i].cols, centroidIndex[i].rows,5)
    }

    //
    // Step 2:
    // Assign all the points to the closest cluster centroid
    // The clusters array holds the location of each cluster
    distArray = new Array(k);
    for (let rows = 0; rows < imageHeight; rows++) {
      for (let cols = 0; cols < imageWidth; cols++) {
        for (let i = 0; i < k; i++) {
          distArray[i] = dist(
            centroid[i].r,
            centroid[i].g,
            centroid[i].b,
            data[rows][cols].r,
            data[rows][cols].g,
            data[rows][cols].b
          );
        }
        clusters[distArray.indexOf(Math.min(...distArray))].push({
          rows: rows,
          cols: cols,
        });
      }
    }

    //
    // Step 3
    // Recompute the centroids of newly formed clusters
    //
    for (let i = 0; i < clusters.length; i++) {
      let xMean = 0;
      let yMean = 0;
      for (let j = 0; j < clusters[i].length; j++) {
        xMean += clusters[i][j].cols
        yMean += clusters[i][j].rows;  
      }
      centroidIndex[i].rows = Math.floor(yMean / clusters[i].length);
      centroidIndex[i].cols = Math.floor(xMean / clusters[i].length);
    }
    /*
    for (let i = 0; i < clusters.length; i++) {
      let redMean = 0;
      let greenMean = 0;
      let blueMean = 0;
      for (let j = 0; j < clusters[i].length; j++) {
        redMean += data[clusters[i][j].rows][clusters[i][j].cols].r;
        greenMean += data[clusters[i][j].rows][clusters[i][j].cols].g;
        blueMean += data[clusters[i][j].rows][clusters[i][j].cols].b;
      }
      centroid[i].r = Math.floor(redMean / clusters[i].length);
      centroid[i].g = Math.floor(greenMean / clusters[i].length);
      centroid[i].b = Math.floor(blueMean / clusters[i].length);
    }
    */
    
    /*
    while(!mousePressedBool) {
      console.log('waiting')
    }
    mousePressedBool = false
    */
    
  } // End of iteration loop

  /*
  for (let i = 0; i < clusters.length; i++) {
    for (let j = 0; j < clusters[i].length; j++) {
      noStroke();
      fill(0, 0, (256 * i) / 3);
      circle(clusters[i][j].cols, clusters[i][j].rows, 2);
    }
  }
  */
  

  noStroke();
  push();
  translate(height - paletteSpacing - paletteSize, paletteSpacing);

  for (let i = 0; i < numPalettes; i++) {
    fill(centroid[i].r, centroid[i].g, centroid[i].b);
    rect(0, 0, paletteSize, paletteSize);
    translate(0, paletteSpacing + paletteSize);
  }
  pop();
}

function mousePressed(){
  mousePressedBool = true
}
