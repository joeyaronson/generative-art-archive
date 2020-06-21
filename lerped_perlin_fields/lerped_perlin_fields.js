function setup() {
    createCanvas(1000, 1000);
    background(b_color);
    //add colors here
    colors = [
        color("#67E1E8"),
        color("#3366ff"),
        color("#FF00FF"),
        color("#5428AB"),
    ];
    loadColors();
    drawParticles();
    stroke(color(str_color));
    strokeWeight(s_weight);
}
let p = [];
let num = 60;
let noiseVal = 0.008;
let noiseVal2 = 0.002;

//color parameters
let colors;
let col_array = [];
const steps = 50;
let str_color = "rgb(0,30,30)";
let s_weight = 0.5;
let b_color = "rgb(0,30,30)";

function loadColors() {
    for (let i = 0; i < steps; i++) {
        col_array.push(color(colors[0]));
    }

    for (let i = 0; i < colors.length - 1; i++) {
        let from = colors[i];
        let to = colors[i + 1];

        for (let j = 0; j < steps; j++) {
            let c = lerpColor(from, to, j * (1 / steps));
            col_array.push(color(c));
        }
    }

    for (let i = 0; i < steps; i++) {
        col_array.push(color(colors[colors.length - 1]));
    }
}

function draw() {
    // background(0,0.5)
    for (let i = 0; i < p.length; i++) {
        p[i].move();
        p[i].display();

        // if(p[i].x > width ||  p[i].x <0 ||p[i].y > height || p[i].y < 0){
        //     p.splice(i,1);
        //     p.push(new Particle(random(width), random(height)))
        // }
    }

    if (mouseIsPressed) {
        background(0);
        p.splice(0, p.length);
        drawParticles();
        noiseVal = random(0.001, 0.009);
        noiseVal2 = random(0.001, 0.009);
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.nx;
        this.ny;
    }

    display() {
        // let h = map(this.nx+this.ny,0,2,-70,170);
        // stroke(100-h,100,20)

        let h = map(this.nx, 0, 1, 0, col_array.length);
        fill(col_array[floor(h)]);
        ellipse(this.x, this.y, 5);
    }

    move() {
        this.nx = noise(
            this.x * noiseVal,
            this.y * noiseVal,
            frameCount * noiseVal
        );
        this.ny = noise(
            this.y * noiseVal2,
            this.x * noiseVal2,
            frameCount * noiseVal2
        );

        let nx = map(this.nx, 0, 1, -5, 5);
        let ny = map(this.ny, 0, 1, -5, 5);
        this.x += nx;
        this.y += ny;
    }
}

function drawParticles() {
    for (let i = -1; i <= num + 1; i += 1) {
        for (let j = -1; j <= num + 1; j += 1) {
            p.push(new Particle((i * width) / num, (j * width) / num));
        }
    }
}
