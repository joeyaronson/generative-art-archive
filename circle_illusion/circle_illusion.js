function setup() {
    createCanvas(windowWidth,windowHeight);
rectMode(CENTER)
angleMode(DEGREES);
noStroke()
}
let a = 0;
let a2 = 0;
let timer = 0;
let mode = "one";
let next = "";
function draw() {


if(mode === "one"){
    background(255);
    draw1();
}
else if(mode === "two"){
    background(255);
    draw2();
}
else if(mode === "three"){
    background(255);
    draw3();
}
else if(mode === "wait"){
    wait();
}

// if(frameCount > 785)
// 		exit()

}

function wait(){
timer++;
if(timer > 60){
    mode = next;
    timer = 0;
}
}

function draw1(){
fill(0);
for(let i = 0; i < width/200; i++){
    for(let j = 0; j < height/200; j++){
        translate(50+i*200,50+j*200);
        rotate(a);
        arc(0,0,100,100,90,0,PIE)
        resetMatrix();

        translate(150+i*200,50+j*200);
        rotate(a);
        arc(0,0,100,100,180,90,PIE)
        resetMatrix();

        translate(50+i*200,150+j*200);
        rotate(a);
        arc(0,0,100,100,0,270,PIE)
        resetMatrix();

        translate(150+i*200,150+j*200);
        rotate(a);
        arc(0,0,100,100,270,180,PIE)
        resetMatrix();
    }
}
if(a == 180){
    next = "three"
    mode = "wait";
}
if(a == 360){
    next = "two"
    mode = "wait"
    a = 0;
}


a++;
}

function draw2(){

for(let i = 0; i < width/200; i++){
    for(let j = 0; j < height/200; j++){
        fill(0);
        translate(50+i*200,50+j*200);
        rotate(a);
        ellipse(0,0,100,100)
        resetMatrix();

        translate(150+i*200,50+j*200);
        rotate(a);
         ellipse(0,0,100,100)
        resetMatrix();

        translate(50+i*200,150+j*200);
        rotate(a);
         ellipse(0,0,100,100)
        resetMatrix();

        translate(150+i*200,150+j*200);
        rotate(a);
         ellipse(0,0,100,100)
        resetMatrix();
    }
}
for(let i = -1; i < width/200; i++){
    for(let j = -1; j < height/200; j++){
        xoff = map(a2,0,90,0,200)
        translate(100+i*200+xoff,100+j*200);
        rotate(a2);
        fill(255);
        rect(0,0,100,100);
        resetMatrix();
    }
}


if(a2 == 90){
    next = "one"
    mode = "wait";
    a2 = 0;
}
a2++;
}
function draw3(){

for(let i = 0; i < width/200 + 1; i++){
    for(let j = 0; j < height/200 + 1; j++){
        fill(0);
        translate(50+i*200,50+j*200);
        rotate(a);
        ellipse(0,0,100,100)
        resetMatrix();

        translate(150+i*200,50+j*200);
        rotate(a);
         ellipse(0,0,100,100)
        resetMatrix();

        translate(50+i*200,150+j*200);
        rotate(a);
         ellipse(0,0,100,100)
        resetMatrix();

        translate(150+i*200,150+j*200);
        rotate(a);
         ellipse(0,0,100,100)
        resetMatrix();

    }
}
for(let i = 0; i < width/200 +2; i++){
    for(let j = 0; j < height/200 +2; j++){
        xoff = map(a2,0,90,0,200)
        translate(i*200-xoff,j*200);
        rotate(-a2);
        fill(255);
        rect(0,0,100,100);
        resetMatrix();
    }
}


if(a2 == 90){
    next = "one"
    mode = "wait";
    a2 = 0;
}
 a2++;
}
//joey aronson 2019