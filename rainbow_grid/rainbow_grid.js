function setup() {
    c = createCanvas(windowWidth, windowHeight);
    background(0);
    diag = sqrt(pow(width, 2) + pow(height, 2));
    loadNodes();
    noFill();
    colorMode(HSB, 100);
  }
  let spacing = 50;
  let n = []
  let noiseVal = 0.005;
  let diag;
  let c;

  function draw() {
      background(0,10);
    drawNodes();
    moveNodes();
  }

  function loadNodes() {
    let ws = width / spacing;
    for (let i = 0; i <= width; i += ws) {
      let tn = [];
      for (let j = 0; j <= height; j += ws) {
        tn.push(new Node(i, j));
      }
      n.push(tn);

    }
  }

  function keyPressed(){
     saveCanvas(c, 'myCanvas', 'jpg');
  }

  function drawNodes() {
    for (let i = 0; i < n.length - 1; i++) {
      for (let j = 0; j < n[i].length - 1; j++) {
        n[i][j].hue();

        bezier(
          n[i][j].x, n[i][j].y,
          n[i][j + 1].x, n[i][j + 1].y,
          n[i + 1][j].x, n[i + 1][j].y,
          n[i + 1][j + 1].x, n[i + 1][j + 1].y
        );

        bezier(
          n[i + 1][j].x, n[i + 1][j].y,
          n[i + 1][j + 1].x, n[i + 1][j + 1].y,
          n[i][j].x, n[i][j].y,
          n[i][j + 1].x, n[i][j + 1].y
        );
      }
    }
  }

  function moveNodes() {
    for (let i = 0; i < n.length; i++) {
      for (let j = 0; j < n[i].length; j++) {
        n[i][j].update();
        if (mouseIsPressed) {
          n[i][j].move();
        } else {
          n[i][j].revert();
        }
      }
    }
  }

  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.ox = x;
      this.oy = y;
      this.d = 0;
      this.dp = 0;
      this.nx = 0;
      this.ny = 0;
    }

    update() {
      this.d = dist(this.x, this.y, this.ox, this.oy);
      this.dp = dist(this.x, this.y, mouseX, mouseY);
      this.nx = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
      this.ny = noise(this.x * noiseVal, this.y * noiseVal, frameCount * noiseVal);
    }
    move() {
      let a = atan2(this.x - mouseX, this.y - mouseY);
      let dm = map(this.dp, 0, diag / 2, 2, 0);
      this.x += sin(a) * dm;
      this.y += cos(a) * dm;
      this.x += this.nx;
      this.y += this.ny;
    }

    revert() {
      if (this.d > 2) {
        let a = atan2(this.x - this.ox, this.y - this.oy);
        let dm = map(this.d, 0, diag / 2, 2, 0);
        this.x -= sin(a) * dm;
        this.y -= cos(a) * dm;
      }
    }

    hue() {
      let nm = map(this.nx, 0, 1, 0, 200);
      stroke((this.d + nm) % 100, 100, 100);
    }
  }