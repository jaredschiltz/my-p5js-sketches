//

let total = 50;
let offset = 0;
let globe = [];
let r = 100;

let a = 1;
let b = 1;

let sliderSuperShape1M;
let sliderSuperShape1N1;
let sliderSuperShape1N2;
let sliderSuperShape1N3;

let sliderSuperShape2M;
let sliderSuperShape2N1;
let sliderSuperShape2N2;
let sliderSuperShape2N3;
let myFont;

function superShape(theta, m, n1, n2, n3) {
  let t1 = abs((1 / a) * cos((m * theta) / 4));
  t1 = pow(t1, n2);

  let t2 = abs((1 / b) * sin((m * theta) / 4));
  t2 = pow(t2, n3);

  t3 = t1 + t2;
  let radius = pow(t3, -1 / n1);
  return radius;
}

function preload() {
  myFont = loadFont('C64_Pro-STYLE.ttf');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  createEasyCam();
  colorMode(HSB);
  
  sliderSuperShape1M = createSlider(0, 100, 2, 0.1);
  sliderSuperShape1N1 = createSlider(0, 100, 0.7, 0.1);
  sliderSuperShape1N2 = createSlider(0, 100, 0.3, 0.1);
  sliderSuperShape1N3 = createSlider(0, 100, 0.2, 0.1);
  sliderSuperShape1M.position(0, 0);
  sliderSuperShape1N1.position(0, 20);
  sliderSuperShape1N2.position(0, 40);
  sliderSuperShape1N3.position(0, 60);
  sliderSuperShape2M = createSlider(0, 100, 3, 0.1);
  sliderSuperShape2N1 = createSlider(0, 100, 100, 0.1);
  sliderSuperShape2N2 = createSlider(0, 100, 100, 0.1);
  sliderSuperShape2N3 = createSlider(0, 100, 100, 0.1);
  sliderSuperShape2M.position(0, 80);
  sliderSuperShape2N1.position(0, 100);
  sliderSuperShape2N2.position(0, 120);
  sliderSuperShape2N3.position(0, 140);
  textFont(myFont);
}

function draw() {
  background(0);
  lights();
  noStroke();
  
  textSize(12);


  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
    var lat = map(i, 0, total, -HALF_PI, HALF_PI);

    //let r2 = superShape(lat, 7, 0.2, 1.7, 1.7);
    let r2 = superShape(
      lat,
      sliderSuperShape2M.value(),
      sliderSuperShape2N1.value(),
      sliderSuperShape2N2.value(),
      sliderSuperShape2N3.value()
    );
    for (let j = 0; j < total + 1; j++) {
      var lon = map(j, 0, total, -PI, PI);

      //let r1 = superShape(lon, 7, 0.2, 1.7, 1.7);
      let r1 = superShape(
        lon,
        sliderSuperShape1M.value(),
        sliderSuperShape1N1.value(),
        sliderSuperShape1N2.value(),
        sliderSuperShape1N3.value()
      );
      var x = r * r1 * cos(lon) * r2 * cos(lat);
      var y = r * r1 * sin(lon) * r2 * cos(lat);
      var z = r * r2 * sin(lat);

      globe[i].push(createVector(x, y, z));
    }
  }

  offset += 5;

  for (let i = 0; i < total; i++) {
    let hu = map(i, 0, total, 0, 255 * 6);
    fill((hu + offset) % 255, 255, 255);

    /*
    if(i % 2 == 0) {
      fill(255, 0, 0);
    }else {
      fill(0);
    }
    */

    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
   
}
