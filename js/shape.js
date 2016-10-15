/**
 * 在这个文件中定义对应不同形状积木的类
 *
 * Created by Awei on 2016/10/12.
 */

function Cell(row,col,img) {
    this.row = row;
    this.col = col;
    this.img = img;
}

//下落
Cell.prototype.drop = function () {
    this.row++;
};
//往左
Cell.prototype.moveL = function () {
    this.col--;
};
//往右
Cell.prototype.moveR = function () {
    this.col++;
};


function State(r0,c0,r1,c1,r2,c2,r3,c3){
    //第1个方块相对于旋转中心的坐标偏移
    this.r0 =r0;
    this.c0 = c0;

    //第2个方块相对于旋转中心的坐标偏移
    this.r1 =r1;
    this.c1 = c1;

    //第3个方块相对于旋转中心的坐标偏移
    this.r2 =r2;
    this.c2 = c2;

    //第4个方块相对于旋转中心的坐标偏移
    this.r3 =r3;
    this.c3 = c3;
}


//定义一个父类，表示各种不同的积木
function Shape(img,center) {

    this.img = img;
    //保存当前积木的旋转中心
    this.center = center;
    //保存当前积木的所有可变状态的数组
    this.states = [];
    //当前状态
    this.currentState =0;
}

//下落
Shape.prototype.drop = function () {
    for(var i=0; i<this.cells.length; i++){
        this.cells[i].drop();
    }
};
//往左
Shape.prototype.moveL = function () {
    for(var i=0; i<this.cells.length; i++){
        this.cells[i].moveL();
    }
};
//往右
Shape.prototype.moveR = function () {
    for(var i=0; i<this.cells.length; i++){
        this.cells[i].moveR();
    }
};
//顺时针旋转
Shape.prototype.rotateR = function () {
    //将当前的状态值加1,this.currentState++
    this.currentState++;
    //如果currentState越界，置0
    if(this.currentState >= this.states.length)this.currentState =0;
    //获得旋转后的状态值
    var sta = this.states[this.currentState];
    //计算旋转后四个方块的新坐标
        //首先需要获得旋转中心点的方块坐标
    var center_row = this.cells[this.center].row;
    var center_col = this.cells[this.center].col;
        //
    for (var i=0; i<this.cells.length; i++){
        this.cells[i].row = center_row + sta["r"+i];
        this.cells[i].col = center_col + sta["c"+i];
    }
};

//左旋转
Shape.prototype.rotateL = function () {

};





//分别定义不同形状的积木，他们都应该是Shape的子类

//定义O积木
function O() {
    //使用组合继承
    Shape.call(this,"img/O.png",0);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)]
}
O.prototype =new Shape("img/O.png",0);

//定义L积木
function L() {
    //使用组合继承
    Shape.call(this,"img/L.png",1);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(2,4,this.img),new Cell(2,5,this.img)]
    //state中保存了四个方块在当前状态下的
    //                  相对中心点的偏移量
    this.states[0] = new State(-1,0,0,0,1,0,1,1);
    this.states[1] = new State(0,1,0,0,0,-1,1,-1);
    this.states[2] = new State(-1,-1,0,0,-1,0,1,0);
    this.states[3] = new State(0,-1,0,0,0,1,-1,1);
}
L.prototype =new Shape("img/L.png",1);

//定义I积木
function I() {
    //使用组合继承
    Shape.call(this,"img/I.png",1);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(2,4,this.img),new Cell(3,4,this.img)]
    //state中保存了四个方块在当前状态下的
    //                  相对中心点的偏移量
    this.states[0] = new State(-1,0,0,0,1,0,2,0);
    this.states[1] = new State(0,1,0,0,0,-1,0,-2);
}
I.prototype =new Shape("img/I.png",1);
I.constructor = I;

//定义J积木
function J() {
    //使用组合继承
    Shape.call(this,"img/J.png",1);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(2,4,this.img),new Cell(2,3,this.img)]
    //state中保存了四个方块在当前状态下的
    //                  相对中心点的偏移量
    this.states[0] = new State(-1,0,0,0,1,0,1,-1);
    this.states[1] = new State(0,1,0,0,0,-1,-1,-1);
    this.states[2] = new State(-1,1,0,0,-1,0,1,0);
    this.states[3] = new State(1,1,0,0,0,1,0,-1);
}
J.prototype =new Shape("img/J.png",1);
J.constructor = I;


//定义S积木
function S() {
    //使用组合继承
    Shape.call(this,"img/S.png",1);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img),new Cell(2,5,this.img)]
    //state中保存了四个方块在当前状态下的
    //                  相对中心点的偏移量
    this.states[0] = new State(-1,0,0,0,0,1,1,1);
    this.states[1] = new State(0,1,0,0,1,0,1,-1);
}
S.prototype =new Shape("img/S.png",1);
S.constructor = S;


//定义Z积木
function Z() {
    //使用组合继承
    Shape.call(this,"img/Z.png",1);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(1,3,this.img),new Cell(2,3,this.img)]
    //state中保存了四个方块在当前状态下的
    //                  相对中心点的偏移量
    this.states[0] = new State(-1,0,0,0,0,-1,1,-1);
    this.states[1] = new State(0,1,0,0,-1,0,-1,-1);
}
Z.prototype =new Shape("img/Z.png",1);
Z.constructor = Z;


//定义T积木
function T() {
    //使用组合继承
    Shape.call(this,"img/T.png",1);
    //cells定义组成这个方块的四个小方块
    this.cells = [new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img)]
    //state中保存了四个方块在当前状态下的
    //                  相对中心点的偏移量
    this.states[0] = new State(0,-1,0,0,0,1,1,0);
    this.states[1] = new State(-1,0,0,0,1,0,0,-1);

    this.states[2] = new State(-1,0,0,0,0,1,0,-1);
    this.states[3] = new State(-1,0,0,0,0,1,1,0);

}
T.prototype =new Shape("img/T.png",1);
T.constructor = T;
