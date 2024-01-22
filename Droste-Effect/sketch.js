let capture;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.hide();
}
function draw() {
  background(0);
  image(capture, 0, 0);
  if (detections != undefined) {
    if (detections.multiHandLandmarks != undefined) {
      drawBox([5, 9], 120);
      //p.drawHands();
      // p.drawParts();
      /*
      drawLines([0, 5, 9, 13, 17, 0]); //lm
      drawLines([0, 1, 2, 3, 4]); //thumb
      drawLines([5, 6, 7, 8]); //index finger
      drawLines([9, 10, 11, 12]); //middle finger
      drawLines([13, 14, 15, 16]); //ring finger
      drawLines([17, 18, 19, 20]); //nky

      drawLandmarks([0, 1], 0); //lm base
      drawLandmarks([1, 5], 60); //thumb
      drawLandmarks([5, 9], 120); //index finger
      drawLandmarks([9, 13], 180); //middle finger
      drawLandmarks([13, 17], 240); //ring finger
      drawLandmarks([17, 21], 300); //nky
      */
    }
  }
}

function drawBox(indexArray, hue) {
  //let vid_path = vid.toDataURL();
  //console.log(vid_path);
  //console.log(vid_path);
  if (detections.multiHandLandmarks.length == 2) {
    //two hands detected
    if (indexArray[0] == 5 && indexArray[1] == 9) {
      let finger_one_x = detections.multiHandLandmarks[0][8].x * width;
      let finger_one_y = detections.multiHandLandmarks[0][8].y * height;
      let finger_two_x = detections.multiHandLandmarks[1][8].x * width;
      let finger_two_y = detections.multiHandLandmarks[1][8].y * height;
      // Find xmin,xmax,ymin,ymax
      let xmin = min(finger_one_x, finger_two_x);
      let xmax = max(finger_one_x, finger_two_x);
      let ymin = min(finger_one_y, finger_two_y);
      let ymax = max(finger_one_y, finger_two_y);
      noStroke();
      // Draw first image that will start regresion
      image(capture, xmin, ymin, xmax - xmin, ymax - ymin);
      //fill(random(0, 255), 120, 120);
      //rect(xmin, ymin, xmax - xmin, ymax - ymin);

      let previous_width = width;
      let previous_height = height;
      let current_width = xmax - xmin;
      let current_height = ymax - ymin;

      let width_ratio = current_width / previous_width;
      let height_ratio = current_height / previous_height;

      previous_width = current_width;
      previous_height = current_height;
      current_width *= width_ratio;
      current_height *= height_ratio;
      let new_xmin = xmin + xmin * width_ratio;
      let new_ymin = ymin + ymin * height_ratio;
      image(capture, new_xmin, new_ymin, current_width, current_height);

      while (current_width >= 100 && current_height >= 100) {
        previous_width = current_width;
        previous_height = current_height;
        current_width *= width_ratio;
        current_height *= height_ratio;
        new_xmin = xmin + new_xmin * width_ratio;
        new_ymin = ymin + new_ymin * height_ratio;
        image(capture, new_xmin, new_ymin, current_width, current_height);
      }

      noFill();
    }
  }
}

/*
let canvas;
let sketch = function (p) {
  p.setup = function () {
    canvas = p.createCanvas(640, 480);
    //canvas.id("canvas");

    p.colorMode(p.HSB);
  };

  p.draw = function () {
    p.clear();
    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined) {
        p.drawBox([5, 9], 120);
        //p.drawHands();
        // p.drawParts();
        p.drawLines([0, 5, 9, 13, 17, 0]); //palm
        p.drawLines([0, 1, 2, 3, 4]); //thumb
        p.drawLines([5, 6, 7, 8]); //index finger
        p.drawLines([9, 10, 11, 12]); //middle finger
        p.drawLines([13, 14, 15, 16]); //ring finger
        p.drawLines([17, 18, 19, 20]); //pinky

        p.drawLandmarks([0, 1], 0); //palm base
        p.drawLandmarks([1, 5], 60); //thumb
        p.drawLandmarks([5, 9], 120); //index finger
        p.drawLandmarks([9, 13], 180); //middle finger
        p.drawLandmarks([13, 17], 240); //ring finger
        p.drawLandmarks([17, 21], 300); //pinky
      }
    }
  };

  p.drawHands = function () {
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        // p.strokeWeight(0);
        // p.textFont('Helvetica Neue');
        // p.text(j, x, y);
        p.stroke(255);
        p.strokeWeight(10);
        p.point(x, y);
      }
    }
  };

  p.drawBox = function (indexArray, hue) {
    //let vid_path = vid.toDataURL();
    //console.log(vid_path);
    //console.log(vid_path);
    if (detections.multiHandLandmarks.length == 2) {
      //two hands detected
      if (indexArray[0] == 5 && indexArray[1] == 9) {
        let finger_one_x = detections.multiHandLandmarks[0][8].x * p.width;
        let finger_one_y = detections.multiHandLandmarks[0][8].y * p.height;
        let finger_two_x = detections.multiHandLandmarks[1][8].x * p.width;
        let finger_two_y = detections.multiHandLandmarks[1][8].y * p.height;
        // Find xmin,xmax,ymin,ymax
        let xmin = p.min(finger_one_x, finger_two_x);
        let xmax = p.max(finger_one_x, finger_two_x);
        let ymin = p.min(finger_one_y, finger_two_y);
        let ymax = p.max(finger_one_y, finger_two_y);
        p.noStroke();
        //p.image(capture, xmin, ymin, xmax - xmin, ymax - ymin);
        p.fill(p.random(0, 255), 120, 120);
        p.rect(xmin, ymin, xmax - xmin, ymax - ymin);
        let scale_factor = 0.3;
        let current_width = xmax - xmin;
        let current_height = ymax - ymin;
        while (current_width > 1 && current_height > 1) {
          let new_width = scale_factor * current_width;
          let new_height = scale_factor * current_height;
          let new_xmin = xmin + (current_width - new_width) / 2.0;
          let new_ymin = ymin + (current_height - new_height) / 2.0;
          p.fill(p.random(0, 255), 120, 120);
          p.rect(new_xmin, new_ymin, new_width, new_height);
          current_width = new_width;
          current_height = new_height;
          xmin = new_xmin;
          ymin = new_ymin;
        }
        p.noFill();
      }
    }
  };

  p.drawLandmarks = function (indexArray, hue) {
    p.noFill();
    p.strokeWeight(8);
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = indexArray[0]; j < indexArray[1]; j++) {
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        // let z = detections.multiHandLandmarks[i][j].z;
        p.stroke(hue, 40, 255);
        p.point(x, y);
      }
    }
  };

  p.drawLines = function (index) {
    p.stroke(0, 0, 255);
    p.strokeWeight(3);
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = 0; j < index.length - 1; j++) {
        let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
        let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j + 1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j + 1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  };
};

let myp5 = new p5(sketch);
*/
