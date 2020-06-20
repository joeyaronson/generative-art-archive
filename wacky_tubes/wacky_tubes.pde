void setup() {
    // size(windowWidth,windowHeight);
		fullScreen();
    background(40,40,50);
    loadArr();
    loadColors();
    strokeWeight(0.25);
}

void loadNodes(float x,float y){
    n.add(new Node(x,y));
}

ArrayList<Node> n = new ArrayList<Node>();
float noiseVal = 0.005;
float timer = 0;
float roff = random(0,100);
ArrayList<ArrayList<Integer>> clist = new ArrayList<ArrayList<Integer>>();
ArrayList<ArrayList<Integer>> col_array = new ArrayList<ArrayList<Integer>>();

float steps = 30;
boolean debug = false;

int num_color_schemes = 30;
int cols_per_scheme = 10;

void loadArr(){
   for(int i = 0; i < num_color_schemes; i++){
      ArrayList<Integer> c = new ArrayList<Integer>();
      for(int j = 0; j < cols_per_scheme ;j++){
        c.add(color(int(random(0,255)),int(random(0,255)),int(random(255))));
      }
      clist.add(c);
   }

}

void loadColors() {
  //you need to take a color list from clist and use it to generate steps into col_array[][]

  for(int j = 0; j < clist.size();j ++){
    ArrayList<Integer> c = new ArrayList<Integer>();
    for (int i = 0; i < steps; i++) {
      c.add(clist.get(j).get(0));
    }

    for (int i = 0; i < clist.get(j).size()-1; i++) {
      color from = clist.get(j).get(i);
      color to = clist.get(j).get(i+1);

      //println("from " + from);
      //println("to " + to);
      for (float k = 0; k < steps; k++) {
        color tempc = lerpColor(from, to, k*(1/steps));
        //println("tempc " +tempc);
        c.add(tempc);
      }
    }

    for (int i = 0; i < steps; i++) {

      c.add(clist.get(j).get(clist.get(j).size()-1));
    }
    col_array.add(c);
  }

}
int col_index = floor(random(0,col_array.size()));

void draw() {
    for(int i = 0; i < n.size(); i++){
        for(float j = 0; j < 360; j++){
            n.get(i).move();
            n.get(i).display();
        }
        if(n.get(i).y < -200){
            n.remove(i);
        }
    }

    timer++;
    if(debug){
      for(int i = 0; i < col_array.size(); i ++){
         for(int j = 0; j < col_array.get(i).size();j++){
            fill(col_array.get(i).get(j));
            ellipse(j*10,i*20,10,10);
         }
      }
    }
}

void mousePressed(){
    if(timer > 30){
      roff = random(0,100);
      //noiseVal = random(0.0025,0.005);
      loadNodes(mouseX,mouseY);
      mouseX = 8000;
      timer = 0;
    }
}

class Node{
    float x;
    float y;
    float s;
    float xoff;
    float yoff;
    float xmult;
    float ymult;
    float a;
    float n;
    int col_index;


    Node(float x,float y){
        this.x = x;
        this.y = y;
        this.s = random(10,20);
        this.xmult = random(30,100);
        this.ymult = random(25,50);
        this.a = 0;
        this.col_index = floor(random(0,col_array.size()));
    }

    void display(){
        float hn = noise((this.x+this.xoff+roff) * noiseVal*2, (this.y + this.yoff+roff)* noiseVal*2);
        int hnn = int(map(hn,0,1,0,col_array.get(this.col_index).size()));
        fill(col_array.get(this.col_index).get(hnn));
        float sw = map(yoff,50,-50,0,1.25);
        strokeWeight(sw);
        ellipse(this.x+this.xoff,this.y+this.yoff,this.s+this.yoff/10,this.s+this.yoff/10);
    }

    void move(){

        this.a++;
        this.y -= 0.033;
        this.xoff = sin(radians(this.a))*this.xmult;
        this.yoff = cos(radians(this.a))*this.ymult;
        this.n = noise((this.x+this.xoff) * noiseVal, (this.y + this.yoff)* noiseVal, frameCount * noiseVal);
        float nn = map(this.n,0,1,-0.8,1);
        float nnx = map(this.n,0,1,-0.01,0.01);
        this.xmult += nn/50;
        this.x+=nnx;

    }
}