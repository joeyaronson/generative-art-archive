function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100);
    background(0);
    m = sqrt(pow(width / 2, 2) + pow(height / 2, 2)) - 300;
    dh = new DisplayHandler();
    mtemp = m;
    noStroke();
    dh.loadNodes(nodeCount);
}

let n = [];
let m;
let mtemp;
let dh;
let nodeCount = 4000;
let noiseVal = 0.007;

function draw() {
    background(0, 15);
    let n = noise(
        (width / 2) * noiseVal,
        (height / 2) * noiseVal,
        frameCount * noiseVal
    );
    let nm = map(n, 0, 1, 0, 100);
    fill(nm % 100, 100, 100);

    ellipse(width / 2, height / 2, 10, 10);
    dh.updateNodes();
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 1;
        this.size = 0;
        this.d = dist(this.x, this.y, width / 2, height / 2);
    }

    display() {
        let n = noise(
            this.x * noiseVal,
            this.y * noiseVal,
            frameCount * noiseVal
        );
        let nm = map(n, 0, 1, 0, 100);
        let hm = map(this.d, 0, mtemp * 2, 0, 200);
        fill((hm + nm) % 100, 100, 100);
        ellipse(this.x, this.y, this.size, this.size);
    }

    move() {
        let angle = atan2(width / 2 - this.x, height / 2 - this.y);
        this.d = dist(this.x, this.y, width / 2, height / 2);
        let n = noise(
            this.x * noiseVal,
            this.y * noiseVal,
            frameCount * noiseVal
        );
        let nm = map(n, 0, 1, -0.5, 0.5);
        let speed = -map(this.d, 0, m, 10, 0);
        this.x += sin(angle + nm) * speed;
        this.y += cos(angle + nm) * speed;
    }

    grow() {
        this.size += 0.1;
    }
}

class DisplayHandler {
    constructor() {
        this.mode = "grow";
        this.timer = 30;
        this.next;
    }

    loadNodes(num) {
        for (let i = 0; i < num; i++) {
            n.push(
                new Node(random(-400, width + 400), random(-400, height + 400))
            );
        }
    }

    updateNodes() {
        switch (this.mode) {
            case "grow":
                this.grow();
                break;
            case "move":
                this.move();
                break;
            case "wait":
                this.wait(this.next);
                break;
        }
    }

    grow() {
        for (let i = 0; i < n.length; i++) {
            n[i].display();
            n[i].grow();
        }

        if (n[0].size > 10) {
            this.next = "move";
            this.mode = "wait";
        }
    }

    move() {
        for (let i = 0; i < n.length; i++) {
            n[i].display();
            n[i].move();
        }
        if (m > 4) {
            m -= 3;
        } else {
            n.splice(0, n.length);
            m = mtemp;
            this.loadNodes(nodeCount);
            this.next = "grow";
            this.mode = "wait";
        }
    }

    wait(mode) {
        for (let i = 0; i < n.length; i++) {
            n[i].display();
        }
        if (this.timer > 0) {
            this.timer--;
        } else {
            this.mode = mode;
            this.timer = 30;
        }
    }
}
