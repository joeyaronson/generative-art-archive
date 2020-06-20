function setup() {

    angleMode(DEGREES);
    createCanvas(windowWidth,windowHeight);
		createList();
    createSects();

    strokeWeight(1.5);
    colorMode(HSB,100);
    background(0);
}

var angleList = [];
var sectList = [];
function draw() {
    background(0,5);
    //p.display();

    for(let i = 0; i < sectList.length;i++)
    {
        sectList[i].display();

    }

}

function coordinate(x,y)
{
    this.x = x;
    this.y = y;
}
function createList()
{
    for(let i = 0; i < 360; i+=10)
    {
        angleList.push(new coordinate(width/2+(sin(i)*450),height/2+(cos(i)*450)))
    }
}

function createSects()
{
    for(let i = 0; i < angleList.length;i++)
    {
        sectList.push(new Section(width/2,height/2,angleList[i].x,angleList[i].y))
    }
}
class Section
{
    constructor(x1,y1,x2,y2,d)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.num = 100;

        this.size = 3;

        this.a = 0;
        this.a2 = 0.08;


    }

    display()
    {
        var difx = (this.x2 - this.x1)/this.num;
        var dify = (this.y2 - this.y1)/this.num;

       beginShape();
        for(let i = 0; i < this.num; i++)
        {
            stroke((i+abs(this.a*2))%100,100,100);
            line(this.x1 + cos(this.a*i)* 50 + i * difx,this.y1+ sin(this.a*i)* 50 +i*dify,this.x1 + cos(this.a*(i-1))* 50 + (i-1) * difx,this.y1+ sin(this.a*(i-1))* 50 +(i-1)*dify)
        }
        endShape();

        this.a+=this.a2;

        if(this.a > 20 || this.a < -20)
        {
            this.a2 *= -1;
        }

    }
}