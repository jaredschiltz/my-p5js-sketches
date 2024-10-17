let red
let green
let data = []
let k = 4 // number of clusters
let numPointsdata = 300
let centroid = []
let centroidIndex = []
let clusters = []
let colorArray = []

function setup() {
  createCanvas(400, 400);
  let sd = random(1, 100) // standard deviation
  let mean = width / 2
  // Create data
  for (let i = 0; i < numPointsdata; i++) {
    data.push(createVector(randomGaussian() * sd + mean, randomGaussian() * sd + mean))
  }
  
  clusters = new Array(k)
  for (let i = 0; i < clusters.length; i++) {
    clusters[i] = new Array()
  }
  
  for (let i = 0; i < k; i++)
    {
      colorArray.push(color(random(0,255), random(0, 255), random(0,255)))
    }
  
    // Step 1: Select k random points from data as starting centroids
  //         Each point must be different.
  for (let i = 0; i < k; i++) {
    if (i == 0) {
      centroidIndex[0] = Math.floor(Math.random() * data.length)
    }
    else {
      let differentValue = false
      
      while(!differentValue) {
        let newValue = Math.floor(Math.random() * data.length)
        // compare against all previous values
        for (let j = 0; j < i; j++) {
          if (newValue != centroidIndex[j]) {
            differentValue = true
            centroidIndex[i] = newValue
          }
          else {
            differentValue = false
            break
          }
        }
      }
    }
  }
  
  // Populate centroid array
  for (i = 0; i < k; i++) {
    centroid[i] = data[centroidIndex[i]]
  }
  
  rectMode(CENTER)
  frameRate(1)
}

function draw() {
  background(220);

  


  
  // Step 2: 
  // Assign all the points to the closest cluster centroid
  distArray = new Array(k)
  for (let j = 0; j < data.length; j++){
    for (let i = 0; i < k; i++) {
      distArray[i] = dist(centroid[i].x, centroid[i].y, data[j].x, data[j].y)
    }
    clusters[distArray.indexOf(Math.min(...distArray))].push(data[j])
  }
    
  for (let i = 0; i < clusters.length; i++){
    fill(colorArray[i])
    for (let j = 0; j < clusters[i].length; j++) {
      circle(clusters[i][j].x, clusters[i][j].y, 10)
    }
    rect(centroid[i].x, centroid[i].y, 10, 10)
  }
    
  // Step 3
  // Recompute the centroids of newly formed clusters
  for (let i = 0; i < clusters.length; i++){
    let xMean = 0
    let yMean = 0
    for (let j = 0; j < clusters[i].length; j++) {
      xMean += clusters[i][j].x
      yMean += clusters[i][j].y
    }
    centroid[i].x = xMean / clusters[i].length
    centroid[i].y = yMean / clusters[i].length
  }
    
  
}