const WIDTH_HEIGHT = 100;
// Hue access information

const studio_lab_lights = {
  lab_feather: 14,
  lab_main_1: 11,
  lab_main_2: 12,
  lab_main_3: 13,
  lab_side_1: 9,
  lab_side_2: 10,
  downstairs_studio_1: 6,
  downstairs_studio_2: 7,
  downstairs_studio_3: 8,
};
// Some times, the hue bridge gets a different ip address
// Use the hue app on the phone to get the ip address and update accordingly.
// api_key is my private api_key, which is in the file api_key.js
const url = "http://192.168.1.15/api/" + api_key + "/lights";

let clicked = false;
let json_message;

let hue_slider;

function preload() {}

function setup() {
  colorMode(HSB);
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  // Brightness from 1 to 254
  // Saturation from 0 to 254
  // Hue from 0 to 65535
  // Transition time is in multiples of 100ms
  json_message = { on: false, sat: 254, bri: 254, hue: 30, transitiontime: 1 };
  hue_slider = document.getElementById("myHue");
  hue_slider.oninput = change_hue;
}

function draw() {
  background(255);
}

function change_hue() {
  json_message.hue = parseInt(hue_slider.value);
  //print(json_message.hue);
  //json_message.hue = parseInt(random(0, 65536));
  json_message.on = true;
  json_message.transitiontime = 10;
  httpDo(
    url + `/${studio_lab_lights["lab_feather"]}/state`,
    "PUT",
    json_message
  );
  httpDo(
    url + `/${studio_lab_lights["lab_main_1"]}/state`,
    "PUT",
    json_message
  );
  httpDo(
    url + `/${studio_lab_lights["lab_main_2"]}/state`,
    "PUT",
    json_message
  );

  httpDo(
    url + `/${studio_lab_lights["lab_main_3"]}/state`,
    "PUT",
    json_message
  );
  httpDo(
    url + `/${studio_lab_lights["lab_side_1"]}/state`,
    "PUT",
    json_message
  );
  httpDo(
    url + `/${studio_lab_lights["lab_side_2"]}/state`,
    "PUT",
    json_message
  );
}

function keyPressed() {
  if (key == "r" || key == "R") {
    // randomize color
    json_message.hue = parseInt(random(0, 65536));
    json_message.on = true;
    json_message.transitiontime = 10;
    httpDo(
      url + `/${studio_lab_lights["lab_feather"]}/state`,
      "PUT",
      json_message
    );
  }
}

/*
function mouseClicked() {
  if (clicked) {
    json_message.on = false;

    httpDo(
      url + `/${studio_lab_lights["lab_feather"]}/state`,
      "PUT",
      json_message
    );
    clicked = false;
  } else {
    json_message.on = true;
    httpDo(
      url + `/${studio_lab_lights["lab_feather"]}/state`,
      "PUT",
      json_message
    );
    clicked = true;
  }

  console.log("The light is turned " + json_message.on);
}
*/
