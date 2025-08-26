const WIDTH_HEIGHT = 800;

const text_msg = `
+ + + + + + + + + + [ >
+ + + + + + + > + + + + 
+ + + + + + > + + + > + 
< < < < - ] > . > + + + 
+ + + + + + + + + + + + 
+ + . - - - - - - - - - 
- - - - - - - - - . + + 
+ + + + + + . > + + . < 
< + + + + + + + + + + + 
+ + + . > + + + + + + + 
. + + + . - - - - - - - 
- . + + + . > + . > . .`;

let fontLoaded = false;
let run = true;

WebFont.load({
  google: {
    families: ["JetBrains Mono"],
  },
  active: function () {
    fontLoaded = true;
  },
});

let color_palette = ["#ff3250", "#ffb33a", "#008c36", "#0085c6", "#4c4c4c"];
function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  textSize(45);
  textFont("JetBrains Mono");
  noStroke();
}

function draw() {
  if (fontLoaded && run) {
    run = false;
    background("#000000");
    let y = 100;
    const lineHeight = 50;

    for (let i = 0; i < text_msg.length; i++) {
      let ch = text_msg[i];

      // Assign a random color to each character
      fill(color_palette[floor(random(0, color_palette.length))]);

      if (ch === "\n") {
        y += lineHeight;
        x = 85;
      } else {
        text(ch, x, y);
        x += textWidth(ch); // move to next character
      }
    }
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "jpg");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}
