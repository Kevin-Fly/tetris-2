/**
 *
 * Created by Awei on 2016/10/12.
 */

/*
* Game类负责与游戏的进行，和游戏的逻辑判断。
* */
var game = {
    rowCount:20,    //总行数
    colCount:10,    //总列数
    cwidth:26,      //每个单元格的宽度和高度
    offsetX:15,
    offsetY:15,
    bgDiv:null,     //作为游戏背景的DIV
    timer:null,
    interval:500,   //游戏速度的控制

    //当前正在下落的积木
    currentShape:null,

    //下一块积木
    nextShape:null,


    //保存已经下落的积木
    //20*10 的二维数组
    wall:[],



    //游戏初始化
    init:function () {
        this.bgDiv = document.getElementsByClassName("playground")[0];
        this.currentShape = this.random();
        this.nextShape = this.random();
        //将wall数组初始化
        for(var i=0; i<this.rowCount; this.wall[i++]=[]);


        document.onkeydown = function () {
            var e = window.event || arguments[0];
            switch (e.keyCode){
                case 38:    //上
                    game.rotateR();
                    game.paint();
                    break;
                case 40:    //下
                    game.drop();
                    game.paint();
                    break;
                case 37:    //左
                    game.left();
                    game.paint();
                    break;
                case 39:    //右
                    game.right();
                    game.paint();
                    break;
                case 80:    //P
                    break;
                case 81:    //Q
                    break;
                case 32:
                    game.space();
                    break;

            }

        };


        this.timer = setInterval(function () {
            game.drop();
            game.paint();
        },this.interval);

    },


    rotateR:function () {
        this.currentShape.rotateR();
    },

    rotateL:function () {
        this.currentShape.rotateL();
    },



    space:function () {

    },

    paint:function () {
        //清空以前绘制的所有内容
        var str = this.bgDiv.innerHTML.replace(/<img(.*?)>/ig,"");
        this.bgDiv.innerHTML = str;

        //绘制所有已经下落的积木
        this.draWall();

        //绘制下一个需要操作的积木
        this.draNextShape();

        //绘制每一帧的游戏界面
        this.drawShape();
    },

    //绘制所有已经下落的积木
    draWall:function () {
        //遍历wall中的每一个单元格，如果这个单元格有cell对象
        //就意味着游戏界面中对应的格子里应该要显示一个img
        for (var r=0; r<this.rowCount; r++){
            for(var c=0; c<this.colCount; c++){
                //如果单于昂格中有cell
                var cell = this.wall[r][c];
                if(cell){
                    //不为空，创建一个img
                    var img = new Image;
                    var x = cell.col*this.cwidth+this.offsetX;
                    var y = cell.row*this.cwidth+this.offsetY;
                    img.src = cell.img;
                    img.style.left = x+"px";
                    img.style.top = y+"px";
                    this.bgDiv.appendChild(img);
                }
            }
        }
    },

    //绘制下一个需要操作的积木
    draNextShape:function () {

    },

    //控制当前积木下坠
    drop:function () {
      if(this.canDrop()){
         this.currentShape.drop();
      }else {
          if(!this.isGameOver()){
              // 积木不能下坠，需要将积木加入到wall数组中
          this.addIntoWall();

              //产生下一块要操作的积木
              this.nextShape = this.random();

              //将等待的nextShape替换为currentShape
              this.currentShape = this.nextShape;
          }else {
             // 游戏结束
              clearInterval(this.timer);
              this.timer = null;
          }
      }
    },

    isGameOver:function () {
        var cells = this.nextShape.cells;
        for(var i=0; i<cells.length; i++){
            if(this.wall[cells[i].row][cells[i].col]){
                return true;
            }
        }
    },

    //把currentShape的每一个方块加入到wall
    addIntoWall:function () {
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            //wall是一个二维数组，所以cells[i]应该放到wall的第r行，第c列当中
            this.wall[cells[i].row][cells[i].col] = cells[i]
        }
    },

    //判断当前积木是否能够继续下坠
    canDrop:function () {
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
                if(cells[i].row == this.rowCount-1){
                return false;
            }
            //判断当前cell的下方是否有值
            if(this.wall[cells[i].row+1][cells[i].col]){
                return false;
            }

        }
        return true;
    },


    //控制当前积木左移
    left:function () {
        if(this.canLeft()){
            this.currentShape.moveL();
        }
    },

    //判断当前积木是否能够继续左移
    canLeft:function () {
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            if(cells[i].col == 0){
                return false;
            }

            //判断当前cell的左方是否有值
            if(this.wall[cells[i].row][cells[i].col-1]){
                return false;
            }
        }
        return true;
    },



    //控制当前积木右移
    right:function () {
        if(this.canRight()){
            this.currentShape.moveR();
        }
    },

    //判断当前积木是否能够继续右移
    canRight:function () {
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            if(cells[i].col == this.colCount-1){
                return false;
            }

            //判断当前cell的右方是否有值
            if(this.wall[cells[i].row][cells[i].col+1]){
                return false;
            }
        }
        return true;
    },


    //绘制当前积木的方法
    drawShape:function () {
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            var img = new Image();
            img.src = this.currentShape.img;

            //x = col*cwidth+offsetX
            //y = row*cwidth+offsetY
            var x = cells[i].col*this.cwidth+this.offsetX;
            var y = cells[i].row*this.cwidth+this.offsetY;

            img.style.left = x+"px";
            img.style.top = y+"px";

            this.bgDiv.appendChild(img);
        }
    },

    random:function () {
        var list = [L,J,S,Z,T,I,O];
        var num = Math.floor(Math.random()*7);
        return new list[num]();
    }

};

window.onload = function () {
    game.init();
};