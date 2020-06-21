function setup() {
    createCanvas(windowWidth, windowHeight);
    if (width > height) {
        max = width;
    } else {
        max = height;
    }
    colorMode(HSB, 360);
    noFill();
    //noStroke();
    stroke(360);
    strokeWeight(0.8);
    angleMode(DEGREES);

    makeNodes();
}
let nodes = [];
let num = 180;
let max;
let mode;
let thick;

function draw() {
    background(0);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].display();
        nodes[i].move();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (width > height) {
        max = width;
    } else {
        max = height;
    }
    makeNodes();
}

function makeNodes() {
    nodes.splice(0, nodes.length);
    num = 360 / 360;
    for (let i = 0; i < 360; i += num) {
        nodes.push(new node(width / 2, height / 2, i));
    }
}

class node {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.i = a;
    }

    move() {
        this.a += 0.5;
        this.x = this.x + (sin(this.a) * max) / 1000;
        this.y = this.y + (cos(this.a) * max) / 1000;
    }

    display() {
        fill(this.a % 360, 360, 360, 400 - this.i);
        translate(this.x, this.y);
        rotate(this.a * 3);
        ellipse(0, 0, max / 10, (max / 10) * 0.75);
        resetMatrix();
    }
}
