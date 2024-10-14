"use strict";

let img;

let faceMesh;
let options = { maxFaces: 2, refineLandmarks: false, flipHorizontal: false };
let detections;
let got_eyes = false;

let eyes;
const EYE_SIZE = 41;
const PUPIL_FRACTION = 0.6;
const PUPIL_SIZE = EYE_SIZE * PUPIL_FRACTION;

function preload() {
  img = loadImage("img_old.jpg");
  eyes = new Array();
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(1000, 927);
  image(img, 0, 0);
  faceMesh.detectStart(img, gotFaces);
}

function gotFaces(results, error) {
  if (got_eyes == false) {
    detections = results;
    for (let d of detections) {
      eyes.push({
        right_eye: {
          x: d.rightEye.centerX,
          y: d.rightEye.centerY,
          rotation_amount: random(0, TWO_PI),
          rotation_direction: int(random(0, 2)),
        },
        left_eye: {
          x: d.leftEye.centerX,
          y: d.leftEye.centerY,
          rotation_amount: random(0, TWO_PI),
          rotation_direction: int(random(0, 2)),
        },
      });
    }
    got_eyes = true;
    //print(eyes);
  }
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
