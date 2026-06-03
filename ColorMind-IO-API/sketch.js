const WIDTH_HEIGHT = 800;
let palette = [];

function preload() {}

function setup() {
  createCanvas(WIDTH_HEIGHT, WIDTH_HEIGHT);
  noLoop();
  loadRandomPalette();
}

function draw() {
  background(220);
  let num_colors = palette.length;
  let spacing = WIDTH_HEIGHT / (num_colors + num_colors + 1);
  for (let cols = 0; cols < num_colors; cols++) {
    //print(palette[cols]);
    fill(palette[cols]);
    rect(
      spacing + cols * spacing * 2,
      spacing,
      spacing,
      WIDTH_HEIGHT - 2 * spacing,
    );
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas("output", "png");
    //image.save("image_mask", "png"); // This saves a transparent mask png file
    //saveGif("output_gif", 10);
  }
}

async function loadRandomPalette() {
  // 1. Generate a random timestamp to completely bypass the CORS proxy cache
  let proxyUrl = "https://corsproxy.io/?";
  let apiUrl = "http://colormind.io/api/";

  let targetUrl = proxyUrl + encodeURIComponent(apiUrl); //+ cacheBuster;

  try {
    // 2. Use native fetch to safely post JSON through the proxy wrapper
    // cacheBuster forces a reload of the data. Otherwise, the browser
    // always returns the same colors
    let response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "default", cacheBuster: Date.now() }),
    });

    let data = await response.json();

    // 3. Map the random RGB values to p5.js Color objects
    palette = data.result.map((c) => color(c[0], c[1], c[2]));

    // 4. Force a redraw now that the new palette is ready
    redraw();
  } catch (error) {
    console.error("Failed to load Colormind palette:", error);
  }
}

function mousePressed() {
  // Clear the old palette so you know it's loading a new one
  palette = [];

  // Trigger a fresh, un-cached API call
  loadRandomPalette();
}
