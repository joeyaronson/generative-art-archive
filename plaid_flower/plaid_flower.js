function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    angleMode(DEGREES);

    colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
    strokeWeight(50);
    noFill();
    makeNodes();
}
let nodes = [];
let num = 180;
let thick;
let colors;

function draw() {
    blendMode(BLEND);
    background(255);
    // turn on exclusion
    blendMode(EXCLUSION);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].display();
        nodes[i].move();
    }
}

function makeNodes() {
    let count = 18;
    nodes.splice(0, nodes.length);
    num = 360 / count;

    let counter = 0;
    for (let i = 0; i < 360; i += num) {
        nodes.push(new node(width / 2, height / 2, i, counter));
        counter++;
    }
}

class node {
    constructor(x, y, a, c) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.i = c;
    }

    move() {
        this.a += 0.125;
        this.x = this.x + sin(this.a * 5);
        this.y = this.y + cos(this.a * 5);
    }

    display() {
        stroke(colors[this.i % 3]);
        fill(colors[(this.i + 1) % 3]);
        ellipse(this.x, this.y, 200, 200, 50);
    }
}
