setup = () => {
    createCanvas(1000, 1000, WEBGL);
    rectMode(CENTER);
    angleMode(DEGREES);
    SIZE = width / 40;
    loadTiles();
    colorMode(HSB, 360);
};
let t = [];
let H = 10;
let D = 200;
let SIZE;
let fc = 0;
draw = () => {
    background(180);
    rotateX(60);
    rotateZ(fc / 2);

    for (let i = 0; i < t.length; i++) {
        t[i].move();
        t[i].display();
    }
    fc++;
};

class Tile {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    display() {
        stroke(0);
        let c = map((this.d + fc) % 400, 0, 400, 0, 360);
        fill((this.d + fc) % 360, 360, 360);
        push();
        let x = -width / 4 + this.x * SIZE;
        let y = -width / 4 + this.y * SIZE;

        translate(x, y, this.z);
        rotateX(this.z + fc);
        rotateY(this.z + fc);
        box(SIZE, SIZE, SIZE / 5);

        pop();
    }
    move() {
        this.d = dist(
            0,
            0,
            -width / 4 + this.x * SIZE,
            -width / 4 + this.y * SIZE
        );
        this.z += sin(this.d + fc);
    }
}

loadTiles = () => {
    let count = width / 2 / SIZE;
    for (let i = 0; i <= count; i++) {
        for (let j = 0; j <= count; j++) {
            t.push(new Tile(i, j, i));
        }
    }
};

pad = (a, b) => (1e15 + a + "").slice(-b);
