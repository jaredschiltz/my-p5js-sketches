"use strict";

let pineapple_image;
let circle_size_array; // Diameters
let circle_array;

function preload() {
  pineapple_image = loadImage("pineapple.png");
}

function setup() {
  //createCanvas(1080 / 2, 1350 / 2);
  createCanvas(600, 600);
  circle_size_array = [175, 150, 125, 100, 75, 50, 25];
  circle_array = new Array();
  for (let i = 0; i < circle_size_array.length; i++) {
    let max_num_tries = 2000;
    let tries = 0;
    while (tries < max_num_tries) {
      let new_circle = {
        x: random(0, width),
        y: random(0, height),
        d: circle_size_array[i],
      };

      // Make sure circles stay inside edge of canvas
      if (
        new_circle.x + new_circle.d / 2 > width ||
        new_circle.x - new_circle.d / 2 < 0 ||
        new_circle.y + new_circle.d / 2 > height ||
        new_circle.y - new_circle.d / 2 < 0
      ) {
        continue;
      }
      if (circle_array.length == 0) {
        circle_array.push(new_circle);
      } else {
        // Make sure that none of the circles intersect
        let unique = true;
        for (let c of circle_array) {
          if (
            sqrt((new_circle.x - c.x) ** 2 + (new_circle.y - c.y) ** 2) <
            new_circle.d / 2 + c.d / 2
          ) {
            unique = false;
          }
        }
        if (unique == true) {
          circle_array.push(new_circle);
        }
      }
      tries++;
    }
  }

  noLoop();
}

function draw() {
  background(255);
  noFill();
  stroke(0);
  ellipseMode(CENTER);
  for (let c of circle_array) {
    //circle(c.x, c.y, c.d);
    push();
    translate(c.x, c.y);
    rotate(random(0, TWO_PI));
    let pineapple_width = c.d;
    image(
      pineapple_image,
      -pineapple_width / 2,
      -pineapple_width / 2,
      pineapple_width,
      pineapple_width
    );

    pop();
  }
  //rotate(-PI / 4);

  /*
  let pineapple_width = 500;
  image(
    pineapple_image,
    -pineapple_width / 2,
    -pineapple_width / 2,
    pineapple_width,
    pineapple_width
  );
  */
  //circle(width / 2, height / 2, circle_size_array[0]);
  //image(pineapple_image, 0, 0, 100, 100);
}
