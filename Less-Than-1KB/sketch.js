f = 0;
function draw() {
  f++ || createCanvas((w = 600), w);
  background(255);
  a = PI / 100;
  translate((b = w / 2), b);
  c = (d) => {
    push();
    rotate((d * frameCount) / 2);
    for (i = 200; i--; ) {
      fill(i % 2 == 0 ? "#000000ff" : "#ffffff00");
      arc(0, 0, (e = w * 2), e, i * a, (i + 1) * a);
    }
    pop();
  };
  c(1);
  translate(20, 20);
  c(-1);
}
