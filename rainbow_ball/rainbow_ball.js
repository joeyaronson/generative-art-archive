function setup() {
    colorMode(HSB, 360);
    angleMode(DEGREES);
    createCanvas(windowWidth, windowHeight);
    background(360);
    strokeWeight(10);
    ellipse(width / 2, height / 2, 800, 800);
    stroke(0, 0, 0);
    strokeWeight(0.3);
    setVars();
}

let angle1;
let angle2;
let angle3;
let angle4;

function draw() {
    chord();
    chord();

    if (mouseIsPressed) {
        background(360);
        setVars();
        stroke(0);
        strokeWeight(10);
        ellipse(width / 2, height / 2, 800, 800);
        strokeWeight(0.3);
    }
}

function chord() {
    stroke(angle1 % 360, 300, 300);
    angle1 += angle3;
    angle2 += angle4;
    let xpos1 = width / 2 + 400 * cos(angle1);
    let ypos1 = height / 2 + 400 * sin(angle1);

    let xpos2 = width / 2 + 400 * cos(angle2);
    let ypos2 = height / 2 + 400 * sin(angle2);

    line(xpos1, ypos1, xpos2, ypos2);
}

function setVars() {
    angle1 = 0;
    angle2 = 0;
    angle3 = random(0, 5);
    angle4 = random(0, 5);

    while (abs(angle3 - angle4) < 0.25) {
        angle3 = random(0, 5);
        angle4 = random(0, 5);
    }
}
