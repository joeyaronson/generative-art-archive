function setup() {
    createCanvas(windowWidth, windowHeight);
    rot = 2;
    rot2 = 0.02;
    o = 0;
    o2 = 0;
    timer = 0;
    strokeWeight(0.3);
}
var c = [];
var z = [];
var rot;
var rot2;
var o;
var o2;
var o3;
var model;
var timer;

function draw() {
    background(255);
    rot -= rot2;
    o2 += 0.005;
    o = 200 * sin(o2);

    for (let i = 0; i < width + 1; i += 2) {
        c.push(new coord(i * 1, height / 2 + o * cos(-rot + i / (500 / 10))));
        z.push(
            new coord(i * 1, height / 2 + 100 - o * cos(rot + i / (500 / 10)))
        );
    }
    noFill();
    beginShape();
    stroke(0);
    for (let i = 20; i < c.length; i++) {
        vertex(c[i].x, c[i].y);
        vertex(z[i - 20].x, z[i - 20].y);
    }
    endShape();
    c.splice(0, c.length);
    z.splice(0, z.length);
}

function coord(x, y) {
    this.x = x;
    this.y = y;
}
