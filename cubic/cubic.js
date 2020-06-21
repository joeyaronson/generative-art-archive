setup = () => {
    createCanvas(1000, 1000, WEBGL);

    rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();
    SIZE = width / 40;
    loadCubes();
    colorMode(HSB, 360);
};
let c = [];
let SIZE;
let fc = 0;
const count = 8;
draw = () => {
    background(180);
    ambientLight(360, 0, 360);
    pointLight(360, 0, 180, 0, 0, 0);

    rotateX(60);
    rotateZ(fc);
    rotateY(fc);

    for (let i = 0; i < c.length; i++) {
        c[i].move();
        c[i].display();
    }
    fc++;
};

class Cube {
    constructor(x, y, z) {
        this.x = -SIZE * (count / 2) + x * SIZE;
        this.y = -SIZE * (count / 2) + y * SIZE;
        this.z = -SIZE * (count / 2) + z * SIZE;
        this.off = 1;
    }
    display() {
        let d = dist(this.x, this.y, this.z, 0, 0, 0);
        let m = map(d, 0, 200, 0, 1);
        push();

        translate(this.x * this.off, this.y * this.off, this.z * this.off);
        specularMaterial((d * 2 + fc) % 360, 360, 360);
        box(SIZE - ((this.off - 1) * m * width) / 8);

        pop();
    }
    move() {
        this.off += sin(fc) / (width / 5);
    }
}

loadCubes = () => {
    for (let i = 0; i <= count; i++) {
        for (let j = 0; j <= count; j++) {
            for (let k = 0; k <= count; k++) {
                c.push(new Cube(i, j, k));
            }
        }
    }
};

pad = (a, b) => (1e15 + a + "").slice(-b);
