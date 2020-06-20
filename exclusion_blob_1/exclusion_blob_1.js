function setup() {
    createCanvas(windowWidth, windowHeight);
noFill();
noStroke();
angleMode(DEGREES);
makeNodes();
colors = [
color(255, 0, 0),
color(0, 255, 0),
color(0, 0, 255)
];

}
let nodes = [];
let num = 180;
let mode;
let thick;
let timer = 0;
let colors;

function draw() {
blendMode(BLEND);
background(255);
blendMode(EXCLUSION);
//background(255,1);
for(let i = 0; i < nodes.length;i++){
    nodes[i].display();
    nodes[i].move();
}
console.log(frameCount,100,100);
timer+=0.5;
}

function drawBg(){
background(255);
fill(0);
}

function makeNodes(){
drawBg();
let count = 180;
nodes.splice(0,nodes.length);
num = 360/count;
let c = 0;
for(let i = 0; i < 360; i+=num){

    nodes.push(new node(width/2,height/2,i,c));
    c++;
}
}

class node{
constructor(x,y,a,c){
    this.x = x;
    this.y = y;
    this.a = a;
    this.i = c;
}

move(){
    this.a+=0.5;
    this.x = this.x+sin(this.a)*1.5;
    this.y = this.y+cos(this.a)*1.5;
}

display(){
    fill(colors[this.i%3]);
    ellipse(this.x,this.y,abs(sin(this.a)*100)+200);
}

}