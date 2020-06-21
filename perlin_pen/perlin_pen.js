function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER);
    background(0);
    strokeWeight(0.3);
    colorMode(HSB, 100);
}
let b = [];
var mode = "b";
let noiseVal = 0.02;
let start = false;
function draw() {
    if (b.length > 0) {
        background(0);
        for (let i = 0; i < b.length; i++) {
            for (let j = i; j < b.length; j++) {
                let dis = dist(b[i].x, b[i].y, b[j].x, b[j].y);
                if (dis < 150 && i != j) {
                    stroke((b[i].c + frameCount) % 100, 100, 100);
                    let str = map(dis, 0, 150, 3, 0.03);
                    strokeWeight(str);
                    line(b[i].x, b[i].y, b[j].x, b[j].y);
                }
            }

            b[i].move();

            if (b[i].timer > 600) {
                b.splice(i, 1);
            }
        }

        if (mouseIsPressed && mouseX < 9000) {
            b.push(new Ball(mouseX, mouseY));
            mouseX = 9000;
        }
    } else {
        textSize(50);
        fill(100);
        noStroke();
        text("Draw with your mouse", width / 2, height / 2);
        if (mouseIsPressed && mouseX < 9000) {
            b.push(new Ball(mouseX, mouseY));
            mouseX = 9000;
        }
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.ax = random(-0.03, 0.03);
        this.ay = random(-0.03, 0.03);
        this.c = random(0, 100);
        this.timer = 0;
    }

    move() {
        let dx = noise(
            this.x * noiseVal + this.ax,
            this.y * noiseVal + this.ax,
            frameCount * this.ax
        );
        let dy = noise(
            this.x * noiseVal + this.ay,
            this.y * noiseVal + this.ay,
            frameCount * this.ay
        );

        let ddx = map(dx, 0, 1, -2, 2);
        let ddy = map(dy, 0, 1, -2, 2);

        this.x += ddx;
        this.y += ddy;
        this.timer++;
    }
}
