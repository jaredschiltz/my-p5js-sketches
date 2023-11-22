"use strict";

let img;

let faceapi;
let detections;

let eyes;
const EYE_SIZE = 41;
const PUPIL_FRACTION = 0.6;
const PUPIL_SIZE = EYE_SIZE * PUPIL_FRACTION;

// by default all options are set to true
const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

function preload() {
  img = loadImage("img_old.jpg");
  eyes = new Array();
  faceapi = ml5.faceApi(detectionOptions, modelReady);
}

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(img, gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }

  detections = result;

  // Have to do the processing logic in here, because this is the only
  // place where detection operation is deemed to be completed
  for (let d of detections) {
    let x_right_eye_avg = 0;
    let y_right_eye_avg = 0;
    for (let i = 0; i < d.parts.rightEye.length; i++) {
      x_right_eye_avg += d.parts.rightEye[i].x;
    }
    x_right_eye_avg /= d.parts.rightEye.length;
    for (let i = 0; i < d.parts.rightEye.length; i++) {
      y_right_eye_avg += d.parts.rightEye[i].y;
    }
    y_right_eye_avg /= d.parts.rightEye.length;

    let x_left_eye_avg = 0;
    let y_left_eye_avg = 0;
    for (let i = 0; i < d.parts.leftEye.length; i++) {
      x_left_eye_avg += d.parts.leftEye[i].x;
    }
    x_left_eye_avg /= d.parts.leftEye.length;
    for (let i = 0; i < d.parts.leftEye.length; i++) {
      y_left_eye_avg += d.parts.leftEye[i].y;
    }
    y_left_eye_avg /= d.parts.leftEye.length;

    eyes.push({
      right_eye: {
        x: x_right_eye_avg,
        y: y_right_eye_avg,
        rotation_amount: random(0, TWO_PI),
        rotation_direction: int(random(0, 2)),
      },
      left_eye: {
        x: x_left_eye_avg,
        y: y_left_eye_avg,
        rotation_amount: random(0, TWO_PI),
        rotation_direction: int(random(0, 2)),
      },
    });
  }
  print(eyes);
}

function setup() {
  createCanvas(1000, 927);
}

function draw() {
  background(255);
  image(img, 0, 0, img.width, img.height);
  fill(255, 255, 255);
  noStroke();
  ellipseMode(CENTER);
  for (let e of eyes) {
    ellipse(e.right_eye.x, e.right_eye.y, EYE_SIZE, EYE_SIZE);
    ellipse(e.left_eye.x, e.left_eye.y, EYE_SIZE, EYE_SIZE);
  }
  fill(0);
  for (let e of eyes) {
    push();
    translate(e.right_eye.x, e.right_eye.y);
    rotate(e.right_eye.rotation_amount * e.right_eye.rotation_direction);
    if (e.right_eye.rotation_direction == 0) {
      rotate(-frameCount * 0.1);
    } else {
      rotate(frameCount * 0.1);
    }
    translate(7, 0);
    ellipse(0, 0, PUPIL_SIZE, PUPIL_SIZE);
    pop();
    push();
    translate(e.left_eye.x, e.left_eye.y);
    rotate(e.left_eye.rotation_amount * e.left_eye.rotation_direction);
    if (e.left_eye.rotation_direction == 0) {
      rotate(-frameCount * 0.1);
    } else {
      rotate(frameCount * 0.1);
    }
    translate(7, 0);
    ellipse(0, 0, PUPIL_SIZE, PUPIL_SIZE);
    pop();
  }
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === "s") {
    saveGif("googly-eyes", 5);
  }
}
