function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    rectMode(CENTER);
    angleMode(DEGREES);
    colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
}
let colors;
let s = 0;
function draw() {
    blendMode(BLEND);
    background(255);
    // turn on exclusion
    blendMode(EXCLUSION);
    fill(255);
    let count = 0;
    for (let i = -2; i < width / 100; i++) {
        for (let j = -1; j < height / 100; j++) {
            translate(i * 100, j * 100);
            a = sin(s);

            rotate(s);

            a2 = map(a, 0, 1, 0, 200);

            fill(colors[count % 3]);
            rect(0, 0, a2, a2);
            resetMatrix();
            count++;
        }
        count++;
    }

    s += 0.25;
}
