(function(){
    //构造函数
    window.Game = function(){
        this.tableRow = 24; //表格20行
        this.tableCol = 16; //表格12列
        this.score = 0; //记录得分
        this.time = 0; //用时
        this.timer = null //存放定时器
        this.blockArr = [] //
        this.init(); //初始化函数,创建表格布局
        this.nextInit()
        this.blindKeyEvent();
        this.block = new Block(this);
        this.map = new Map(this);
    }
    //布局初始化方法，定义在原形上
    Game.prototype.init = function(){
        this.table = document.createElement("table"); //把创建的表格对象作为Gmae的一个Dom对象属性，方便其它函数调用
        document.getElementById("game").appendChild(this.table);
        var tr,td;
        for(var i=0; i<this.tableRow; i++){
            tr = document.createElement("tr");
            for(var j=0; j<this.tableCol; j++){
                td = document.createElement("td");
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
    }
    //下一个形状的初始化函数
    Game.prototype.nextInit = function(){
        this.nextTable = document.createElement("table");
        document.getElementsByClassName("next")[0].appendChild(this.nextTable);
        var tr,td;
        for(var i = 0; i<4; i++){
            tr = document.createElement("tr");
            for(var j=0; j<4; j++){
                td = document.createElement("td");
                tr.appendChild(td);
            }
            this.nextTable.appendChild(tr);
        }
    }

    //提供操作DOM元素的方法
    Game.prototype.addColorClass = function(r,c,classname){
        this.table.rows[r].cells[c].className = classname;
    }

    //提供操作下一个形状的DOM元素的方法
    Game.prototype.nextAddColorClass = function(r,c,classname){
        this.nextTable.rows[r].cells[c].className = classname;
    }
    //清屏方法
    Game.prototype.clear = function(){
        //对游戏单元格清除背景颜色类
        for(var i=0; i<this.tableRow; i++){
            for(var j=0; j<this.tableCol; j++){
                this.table.rows[i].cells[j].removeAttribute("class");
            }
        }
        //对下一方块所在表格单元格清除背景颜色类
        for(var i = 0;i<4; i++ ){
            for(var j=0; j<4;j++){
                this.nextTable.rows[i].cells[j].removeAttribute("class");
            }
        }
    }
    //游戏每帧的渲染
    Game.prototype.startGame = function(){
        var self = this
        var count = 0; //计数器，为每隔1s下落方块
        this.timer = setInterval(function(){
            count++;
            self.clear()
            if(count%20==0) {
                self.block.blockDown(); //生成下落方块的帧
                document.getElementById("score").value = self.score; //写入分数
                document.getElementById("timeout").value = parseInt(count/20/60)+" : "+ (count/20)%60; //写入计时
            }
            self.block.render(); //渲染方块
            self.map.mapRender() //渲染地图
        },50)
        
    }

    //键盘事件监听
    Game.prototype.blindKeyEvent = function(){
        var self = this;
        var count =0; //为页面一刷新就开始了游戏了，下面要判断奇偶，所以再按一次空格键相当于偶数，所以初始为1
        var voicetaggle = true;
        document.onkeyup = function(ev){
            ev ? ev = ev : ev = window.event;
            // console.log(ev.keyCode);
            switch(ev.keyCode){
                case 37: //左箭头
                    self.block.toLeft();
                    document.getElementById("toLeftRight").play();
                    break;
                case 38: //上箭头 旋转变换方向
                    self.block.toRotate();
                    document.getElementById("toRotate").play();
                    break;
                case 39://右箭头
                    self.block.toRight();
                    document.getElementById("toLeftRight").play();
                    break;
                case 40://加速向下
                    self.block.toFastDown();
                    document.getElementById("toFastDown").play();
                    break;
                 //空格键暂停和继续
                 case 32:
                    count++;
                    if(count%2 == 0){
                        clearInterval(self.timer);
                        // console.log("停止了");
                    }
                    else{ //奇数次时，先关掉之前的定时器，再重新开启一个
                        clearInterval(self.timer);
                        self.startGame()
                    };
                    break;
            }
        }
        //刷新页面重新开始
        document.getElementsByClassName("reset")[0].onclick = function(){
            window.location.reload();
        }
    }

})();