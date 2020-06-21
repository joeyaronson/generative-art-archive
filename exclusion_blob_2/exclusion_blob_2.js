function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    noFill();
    noStroke();
    angleMode(DEGREES);

    makeNodes();

    // array of colors: red, green blue
    colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255)];
}

//making the array of nodes
let nodes = [];
let num;
let colors;

function draw() {
    //default blend mode
    blendMode(BLEND);
    background(255);
    // turn on exclusion
    blendMode(EXCLUSION);

    //display every node and move them
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].display();
        nodes[i].move();
    }
}

//fills the nodes array with the nodes
function makeNodes() {
    //set number of nodes
    let count = 180;

    //calculated number of degrees inbetween nodes
    num = 360 / count;

    //indexing for nodes
    let c = 0;
    // adds the nodes into the array
    for (let i = 0; i < 360; i += num) {
        nodes.push(new node(width / 2, height / 2, i, c));
        c++;
    }
}

//node class
class node {
    //sets starting positions, angles and indexes
    constructor(x, y, a, c) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.i = c;
    }

    //moves the nodes in circular motion
    move() {
        this.a += 0.5;
        this.x = this.x + sin(this.a) * 1.25;
        this.y = this.y + cos(this.a) * 1.25;
    }

    //draws the nodes
    display() {
        //fills node with either red green or blue depending on the index
        fill(colors[this.i % 3]);
        //translates to the position for rotation
        translate(this.x, this.y);
        //rotates nodes
        rotate(this.a / 2);
        rect(
            0,
            0,
            abs(sin(this.a) * 100) + 200,
            abs(sin(this.a) * 100) + 200,
            50
        );
        //resets translation
        resetMatrix();
    }
}

//Joey Aronson 2019
