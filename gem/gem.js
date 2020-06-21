let n = [];

function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    colorMode(HSB, 100);
    strokeWeight(2);
    loadNodes();
}

function draw() {
    background(0);
    displayNodes();
}

class Node {
    constructor(x, y, i) {
        this.x = x;
        this.y = y;
        this.a = i;
        this.i = i;
    }

    move() {
        this.x += sin(this.a + this.i);
        this.y -= cos(this.a + this.i);
        this.a++;
    }
}

function loadNodes() {
    for (let i = 0; i < 360; i += 3) {
        n.push(
            new Node(
                width / 2 + (sin(i) * width) / 3,
                height / 2 + (cos(i) * width) / 3,
                i
            )
        );
    }
}

function displayNodes() {
    for (let i = 0; i < n.length; i += 1) {
        let hue = map(i, 0, n.length, 0, 100);
        stroke(hue, 100, 100);
        if (i < (floor(frameCount / 2) % n.length) * 3) {
            let offsetIndex = (i + floor(frameCount / 2)) % n.length;
            line(n[i].x, n[i].y, n[offsetIndex].x, n[offsetIndex].y);
        }
        let nextIndex = (i + 1) % n.length;
        line(n[i].x, n[i].y, n[nextIndex].x, n[nextIndex].y);
        n[i].move();
    }
}
