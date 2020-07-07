setup = () => {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    colorMode(HSB, 360);
    loadNodes();
};

let n = [];
let A = 36;
let B = 20;
let C = 7;

draw = () => {
    background(80);
    displayNodes();
    displayNodes2();
};

displayNodes = () => {
    for (let i = 0; i < n.length; i++) {
        n[i].move();
        n[i].displayLine();
    }
};

displayNodes2 = () => {
    for (let i = 0; i < n.length; i++) {
        n[i].move();
        n[i].displayEllipse();
    }
};

loadNodes = () => {
    for (let i = 0, j = 0; i < 360; i += 0.5, j++) {
        n.push(new Node(i, j));
    }
};

class Node {
    constructor(i, j) {
        this.j = j;
        this.i = i;
        this.a = i;
        this.r = 500 + cos(this.i) * 250;
    }

    displayEllipse() {
        let fx = width / 2;
        let fy = height / 2;
        this.x = fx + sin(this.a) * this.r;
        this.y = fy + cos(this.a) * this.r;
        stroke(this.i % 360, 360, 360);
        fill(this.i % 360, 360, 180);
        ellipse(this.x, this.y, width / 150, width / 150);
    }

    displayLine() {
        let fx = width / 2;
        let fy = height / 2;
        this.x = fx + sin(this.a) * this.r;
        this.y = fy + cos(this.a) * this.r;
        stroke(this.i % 360, 360, 360);
        line(
            this.x,
            this.y,
            n[(this.j + C) % n.length].x,
            n[(this.j + C) % n.length].y
        );
    }

    move() {
        this.a -= 0.25;
        this.r =
            width / 4 +
            (cos(frameCount) * width) / 16 +
            (cos((this.i * width) / 10 + frameCount) * width) / B;
    }
}
