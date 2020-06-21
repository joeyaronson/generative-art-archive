//2018 joey aronson
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    strokeWeight(2.3);
    colorMode(HSB, 100);
    frameRate(20);
    b.push(new Burst(width / 2 - 25, 475, height - 250));
    b.push(new Burst(width / 2 - 25, 475, height - 50));
    b.push(new Burst(width / 2 - 25, 475, height + 150));
    b.push(new Burst(width / 2 - 25, 475, height + 350));
    background(0);
}

var b = [];
var timer = 0;

var noiseScale = 0.08;
var n = 10;

var col = 0;

var y = -50;
var x = 0;

var w = 0;
function draw() {
    background(0, 4);
    noFill();

    for (let i = 0; i < b.length; i++) {
        b[i].display();
        b[i].grow();
    }

    fill(255);
    text("joey aronson 2018", 100, height - 50);
}

class Burst {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;

        this.c = random(0, 100);
        this.c2 = 1;

        this.size = s;
        this.done = false;

        this.timer = 0;
    }

    display() {
        fill(255, 0.1);
        stroke(this.c, 100, 100);

        beginShape();
        for (let i = 1; i < 360; i += 1) {
            var xn = noise((this.x + i) * noiseScale, frameCount * noiseScale);
            var yn = noise(frameCount * noiseScale, (this.y + i) * noiseScale);
            vertex(
                this.x + sin(i) * this.size + xn * 80,
                this.y + cos(i) * this.size + yn * 80
            );
        }
        endShape(CLOSE);
    }

    grow() {
        this.size -= 2.5;

        this.c += this.c2;

        if (this.c < 0 || this.c > 100) {
            this.c2 = -this.c2;
        }

        if (this.size < 0) {
            this.size = height - 250;
            this.c = random(100);
        }
    }
}
//2018 joey aronson
