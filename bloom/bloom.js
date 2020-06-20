function setup() {
    createCanvas(windowWidth,windowHeight)
angleMode(DEGREES);
strokeWeight(0.3);
colorMode(HSB,100)
background(0);
}

var b = [];
var timer = 200;
function draw() {
background(0,1);

if(timer > 200)
{
    b.push(new Burst(width/2+25,height/2-25));
    timer = 0;
}

for(let i = 0; i < b.length; i++)
{
    b[i].display();
    b[i].grow();
}

for(let i = 0; i < b.length; i++)
{
    if(b[i].size > width-300)
    {
       b.splice(i,1);
    }
}


timer++;
fill(255);
text("joey aronson 2018",100,height-50);


}

class Burst
{
constructor(x,y)
{
    this.x = x;
    this.y = y;

    this.c = random(0,100);
    this.c2 = random(0.01,1);

    this.size = 0;

}

display()
{
    fill(255,0.1);
    stroke(this.c,100,100);
    beginShape();
    for(let i = 1; i < 360; i+=1)
    {
        var n = noise(i * 0.5, this.size*0.05, frameCount * 0.0005);
        var n2 = noise(this.size*0.05, i*0.5, frameCount * 0.05);
        vertex(this.x+sin(i)*this.size-n*50,this.y+cos(i)*this.size+n2*50);
        // stroke(i,360,360);
        // point(500+sin(i)*x-n*100,500+cos(i)*x+n2*100);
        //vertex(500+sin(i)*10,500+cos(i)*10);
    }
    endShape(CLOSE);
}

grow()
{
    this.size+=0.5;

    this.c+=this.c2;

    if(this.c <0 || this.c > 100)
    {
        this.c2  = -this.c2;
    }
}
}