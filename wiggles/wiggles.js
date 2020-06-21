// Joey Aronson 2018

//Click to cycle through color modes
function setup() {
    //angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
    strokeWeight(0.5);
    noStroke();
    colorMode(HSB, 100);
    background(0);
}
var p = [];
var mode = "color";
var timer = 0;
function draw() {
    p.push(new Particle(width / 2, height / 2));

    if (mouseIsPressed && timer > 20) {
        if (mode === "color") {
            mode = "dark";
            timer = 0;
        } else if (mode === "dark") {
            timer = 0;
            mode = "stripes";
        } else if (mode === "stripes") {
            timer = 0;
            mode = "color";
        }
    }

    for (let i = 0; i < p.length; i++) {
        p[i].display();
        p[i].move();
    }
    for (let i = 0; i < p.length; i++) {
        if (
            p[i].x > width + 100 ||
            p[i].x < -100 ||
            p[i].y > height + 100 ||
            p[i].y < -100
        ) {
            p.splice(i, 1);
        }
    }

    timer++;
    fill(255);
    text("joey aronson 2018", 100, height - 50);
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 0;
        this.t = 0;

        //starting angle
        this.degx = random(0, 1);
        this.degy = random(0, 1);

        this.xs = random(-3, 3);

        if (this.xs < 1 && this.xs > -1) {
            this.rany = round(random(0, 1));
            if (this.rany === 0) {
                this.ys = random(1, 3);
            } else {
                this.ys = random(-3, -1);
            }
        } else {
            this.ys = random(3, -3);
        }

        this.hue = random(100);

        this.hue2 = 1;
    }

    display() {
        if (mode === "dark") {
            fill(0, 0, 0);
        }
        if (mode === "color") {
            fill(this.hue, 100, 100);
        }
        if (mode === "stripes") {
            if (frameCount % 2 < 1) {
                fill(0, 0, 0);
            } else {
                fill(this.hue, 100, 100);
            }
        }

        stroke(100 - this.hue, 100, 100);
        ellipse(this.x, this.y, this.s, this.s);
    }

    move() {
        this.t += 0.02;
        this.x += this.xs * this.t + cos(this.degx) * this.t;
        this.y += this.ys * this.t + cos(this.degy) * this.t;
        this.s += 0.2;
        this.degx += random(0.1, 0.8);
        this.degy += random(0.1, 0.8);

        this.hue += this.hue2;

        if (this.hue > 100 || this.hue < 0) {
            this.hue2 *= -1;
        }
    }
}

// Joey Aronson 2018
