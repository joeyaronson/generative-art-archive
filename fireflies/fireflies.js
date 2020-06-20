function setup() {
	createCanvas(windowWidth,windowHeight);
    colorMode(HSB,100);
    noStroke();
    hypotenuse = sqrt(width*width + height*height);
    for(let i = 0; i < 1000; i++){
        p.push(new Particle(random(width),random(height)));
    }
}
let p = [];
let noiseVal = 0.02
let globalColor = 0;
let hypotenuse;
let part;
let fr

function draw() {

    background(0,15)
    for(let i = 0; i < p.length; i++){
        p[i].display();
        p[i].move();
    }
    globalColor+=0.5;
    fill(100)
    textSize(20)
    if(frameRate() < 30){
        p.splice(0,1);
    }
    if(frameRate() > 45){
        p.push(new Particle(random(width),random(height)));
    }

		if(frameCount % 10 == 0){
			part = p.length;
			fr = floor(frameRate());
		}
		text("particles: "+part,20,30);
		text("framerate: " +fr,20,60);

}

class Particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.ax = random(-0.03,0.03);
        this.ay = random(-0.03,0.03);
        this.h = globalColor;
    }

    display(){
        fill(this.h%100,100,100);
        ellipse(this.x,this.y,3,3);
    }
    move(){
        let dx = noise(this.x*noiseVal+this.ax, this.y * noiseVal+this.ax, frameCount *this.ax);
        let dy = noise(this.x*noiseVal+this.ay, this.y * noiseVal+this.ay, frameCount *this.ay);
        let ddx = map(dx,0,1,-10,10);
        let ddy = map(dy,0,1,-10,10);

        this.x +=ddx;
        this.y +=ddy;
        //this.h+=1;
        let delx = mouseX - this.x;
        let dely = mouseY - this.y;

        let angle = atan2(delx,dely)

        let ax = sin(angle);
        let ay = cos(angle);

        let d = dist(this.x,this.y,mouseX,mouseY);

        let ds = map(d,0,hypotenuse,3,10)
        if(mouseIsPressed){
            this.h += ds/2;
            this.x+= ax*ds;
            this.y += ay*ds;
        }
        else{
            this.h = globalColor;
            if(d < 100){
                let rs = map(d,100,0,3,0.5);
                this.x-=ax*rs;
                this.y-=ay*rs;
            }

        }
    }
}