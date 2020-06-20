function setup() {
    createCanvas(1000, 1000);
      background(0);
    colorMode(HSB, d = width / 2);
    angleMode(DEGREES);
    strokeWeight(0.15);
    stroke(0, 0, 0, d / 2)
  }

  let d;
  let globalFrame = 0;
  let steps = 360;

  function draw() {
    let r = width / 5;
    let newR = sqrt(r * r + r * r)
    let sp = 0.25
    for (let i = 0; i < steps; i++) {
      circ(width / 2, height / 2, newR - r, 0, sp);
      circ(width / 2, height / 2, newR - r, 90, sp);
      circ(width / 2, height / 2, newR - r, 180, sp);
      circ(width / 2, height / 2, newR - r, 270, sp);
      globalFrame++;
    }
  }

  function circ(x, y, r, a, s) {
    let newR = sqrt(r * r + r * r)
    let dis = dist(x, y, width / 2, height / 2);
    fill((dis + frameCount) % d, d, d, d / 2);
    let nx = x + sin((globalFrame * s + a)) * (newR + r * 2);
    let ny = y + cos((globalFrame * s + a)) * (newR + r * 2);
    let s2 = sin(globalFrame) * 0.003;
    if (r > 5) {
      circ(nx, ny, newR - r, 0, s2);
    } else {
      ellipse(nx, ny, r * 5);
    }
  }