let detector
let video
//let img

function preload()
{
  //img = loadImage('pu.jpg')
  detector = ml5.objectDetector('cocossd')
}
function setup() {
  createCanvas(640, 480);
  //image(img, 0, 0)
  video = createCapture(VIDEO)
  video.size(640,480)
  //detector.detect(img, gotDetections)
  detector.detect(video, gotDetections)
  
}

function gotDetections(error, results)
{
  if (error)
    {
      console.error(error)
    }
  //console.log(results)
  
  for(let obj of results)
    {
      stroke(0, 255, 0)
      strokeWeight(4)
      noFill()
      rect(obj.x, obj.y, obj.width, obj.height)
      noStroke()
      fill(0, 255, 0 )
      textSize(24)
      let confidence = obj.confidence * 100
      text(obj.label + " " + confidence.toPrecision(4) + '%', obj.x + 10, obj.y + 30)
    }
}

function draw() {
  image(video, 0, 0)
  detector.detect(video, gotDetections)
}