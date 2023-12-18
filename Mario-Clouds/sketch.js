let background_color;
let sun_image;
let clouds_image;
let cloud1;
let cloud2;
let cloud_array;
cloud_speed = 0.2;
let sun_object;

function preload() {
  sun_image = loadImage("Angry_Sun.png");
  clouds_image = loadImage("clouds.png");
}

function setup() {
  createCanvas(700, 700);
  background_color = color("#3fbfff");
  sun_image.resize(60, 60);
  clouds_image.resize(0, 200);
  cloud1 = createImage(200, 100);
  cloud2 = createImage(200, 100);
  cloud1.copy(clouds_image, 0, 0, 200, 100, 0, 0, 200, 100);
  cloud2.copy(clouds_image, 0, 100, 200, 100, -60, 11, 200, 100);
  cloud_array = new Array();
  cloud_array.push({ xpos: 0, x: 0, y: 50, cloud_num: 0 });
  cloud_array.push({ xpos: 400, x: 400, y: 50, cloud_num: 1 });
  cloud_array.push({ xpos: 550, x: 550, y: 50, cloud_num: 1 });
  cloud_array.push({ xpos: 500, x: 500, y: 550, cloud_num: 0 });
  cloud_array.push({ xpos: 100, x: 100, y: 550, cloud_num: 1 });
  cloud_array.push({ xpos: 200, x: 200, y: 300, cloud_num: 0 });
  cloud_array.push({ xpos: 900, x: 900, y: 50, cloud_num: 0 });
  cloud_array.push({ xpos: 700, x: 700, y: 200, cloud_num: 1 });
  cloud_array.push({ xpos: 1200, x: 1200, y: 400, cloud_num: 0 });
  sun_object = { x: 0, y: 0 };
}

function draw() {
  background(background_color);
  stroke(255, 0, 0);
  line(700, 0, 700, height);
  for (let i = 0; i < cloud_array.length; i++) {
    if (cloud_array[i].cloud_num == 0) {
      image(cloud1, cloud_array[i].xpos, cloud_array[i].y);
    } else {
      image(cloud2, cloud_array[i].xpos, cloud_array[i].y);
    }
    cloud_array[i].xpos -= cloud_speed * deltaTime;
    if (cloud_array[i].xpos <= -700) {
      cloud_array[i].xpos = cloud_array[i].x + 1400;
    }
  }
  push();
  translate(width / 2, height / 2);
  image(
    sun_image,
    sun_object.x - sun_image.width / 2,
    sun_object.y - sun_image.height / 2
  );
  sun_object.y = 200 * Math.sin(frameCount * 0.05);
  sun_object.x = 100 * Math.cos(frameCount * 0.06);
  pop();
}

function keyPressed() {
  if (key === "s") {
    saveGif("angry_sun", 10);
  }
}
