function setup() {
    createCanvas(windowWidth,windowHeight);
    background(0);
    strokeWeight(0.3);
    colorMode(HSB,100);
    textAlign(CENTER);
    angleMode(DEGREES);
    textSize(20);
    fill(255);
    text("draw with your mouse\n press any key to change color mode",width/2,height/2);
}
let b = [];
var mode = "b"
let noiseVal = 0.02;
function draw() {

if(b.length === 0){
    background(0,5);
    fill(255);
    text("draw with your mouse\n press any key to change color mode",width/2,height/2);
}
for(let i = 0; i < b.length;i++){
   b[i].display();
   b[i].move();

   if(b[i].timer > 800){
       b.splice(i,1);
   }
}



if(mouseIsPressed){
   b.push(new Ball(mouseX,mouseY));
}
}

function keyReleased(){
   if(mode === 'b'){
       mode = 'c';
   }
   else{
       mode = 'b';
   }
   background(0);
}

class Ball{
constructor(x,y){
    this.x = x;
    this.y = y;
    this.ax = random(-0.03,0.03);
    this.ay = random(-0.03,0.03);
    this.c = random(0,100);
    this.timer = 0;
}
display(){
    if(mode === 'c'){
        fill(100,20)
        stroke((this.c+frameCount)%100,100,100);
    }
    else{
        stroke(100);
        fill(0);
    }
            let s = noise(this.x*noiseVal+this.ax, this.y * noiseVal+this.ax, this.timer *this.ax);
            let ss = map(s,0,1,-20,20);
            //ss= map(this.y,0,height,-20,10);
    ellipse(this.x,this.y,20+ss,20+ss);
}

move(){
    let dx = noise(this.x*noiseVal+this.ax, this.y * noiseVal+this.ax, frameCount *this.ax);
    let dy = noise(this.x*noiseVal+this.ay, this.y * noiseVal+this.ay, frameCount *this.ay);

    let ddx = map(dx,0,1,-2,2);
    let ddy = map(dy,0,1,-2,2);

    this.x +=ddx;
    this.y +=ddy;
    this.timer++;
}

}