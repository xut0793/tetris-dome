(function(){
    //方块构造函数，获取随便生成方块的形状编码
    window.Block = function(obj){
        this.game = obj;
        //每次随机生成两个方块，压入数组，每次从数组前面一个渲染在游戏界面，第二个渲染在下一个图形中
        var typeArr = ["I","L","J","O","Z","S","T","P"]  //建一个数组存储方块类型，以便在json对象里找到对应的属性
        this.type_randomNull_1 = Math.floor(Math.random()*typeArr.length); //生成一个类型选择的随机数0-7
        this.blockType_1 = typeArr[this.type_randomNull_1]; //获取方块类型
        this.blockTypeDirectionLength_1 = blockType_json[this.blockType_1].length; //找到该类型方块可选择的方向数量
        this.direction_randomNull_1 = Math.floor(Math.random()*this.blockTypeDirectionLength_1); //生成方向选择的随机数
       
        this.type_randomNull_2 = Math.floor(Math.random()*typeArr.length); //生成一个类型选择的随机数0-7
        this.blockType_2 = typeArr[this.type_randomNull_2]; //获取方块类型
        this.blockTypeDirectionLength_2 = blockType_json[this.blockType_2].length; //找到该类型方块可选择的方向数量
        this.direction_randomNull_2 = Math.floor(Math.random()*this.blockTypeDirectionLength_2); //生成方向选择的随机数
        
        //压入数组
        this.game.blockArr.push([this.blockType_1,this.direction_randomNull_1]);
        this.game.blockArr.push([this.blockType_2,this.direction_randomNull_2]);
        //依次取出前面两个用于下一步渲染                   
        this.blockCode_1 = blockType_json[this.game.blockArr[0][0]][this.game.blockArr[0][1]];
        this.blockCode_2 = blockType_json[this.game.blockArr[1][0]][this.game.blockArr[1][1]];

        //方块在表格开始出现的中间位置出现
        this.row = 0;
        this.col = 6;
    }
    //方块渲染，根据方块编码渲染至表格DOM中
    Block.prototype.render = function(){
        //游戏方块渲染
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.blockCode_1[i][j] == 1 ){
                    //取出方块数组第一个调用Game中设置DOM中单元格设置背景颜色
                    this.game.addColorClass(this.row+i,this.col+j,this.game.blockArr[0][0]);
                }
            }
        }
        //下一个方块渲染
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.blockCode_2[i][j] == 1 ){
                    //取出方块数组第二个调用Game中设置DOM中单元格设置背景颜色
                    this.game.nextAddColorClass(i,j,this.game.blockArr[1][0]);
                }
            }
        }
    }
    
    //方块下落的帧
    Block.prototype.blockDown = function(){
        // if(this.gameover()) return;
        if(this.check(this.row+1,this.col)){
            this.die();
            this.game.map.delLine();
            this.gameover()
            this.game.blockArr.shift();
            this.game.block = new Block(this.game);
        }else{            
            this.row++;
        }
    }
    
    //碰撞检测 碰到返回true 没有碰到false
    Block.prototype.check = function(r,c){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.blockCode_1[i][j] !=0 && this.game.map.mapCode[r+i][c+j] != 0 ){
                    return true;
                }
            }
        }
    }
    //方块死亡,将死亡方块的code传map。
    Block.prototype.die = function(){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.blockCode_1[i][j] != 0){
                    this.game.map.mapCode[this.row+i][this.col+j] = this.game.blockArr[0][0];
                }
            }
        }
    }
    //游戏是否结束
    Block.prototype.gameover = function () {
        for(var i=0; i<this.game.tableCol; i++){
            if(this.game.map.mapCode[0][i] != 0){
                clearInterval(this.game.timer);
                alert("游戏结束");
                return true;
            }
        }
    }

    //方块左移动
    Block.prototype.toLeft = function(){
        if(this.check(this.row,this.col-1)) return;
        this.col--;
    }
    //方块右移动
    Block.prototype.toRight = function(){
        if(this.check(this.row+1,this.col+1)) return;
        this.col++;
    }
    //一键到底
    Block.prototype.toFastDown = function(){
        //当检查下一步可以下落时候就持续下落
        while(!this.check(this.row+1,this.col)) {
            this.row++;
        };
    }
    //方块旋转
    Block.prototype.toRotate = function(){
        var oldDirection = this.game.blockArr[0][1];
        if(this.game.blockArr[0][1] == blockType_json[this.game.blockArr[0][0]].length-1){
            this.game.blockArr[0][1] = 0;
        }else{
            this.game.blockArr[0][1]++;
        }
        this.blockCode_1 = blockType_json[this.game.blockArr[0][0]][this.game.blockArr[0][1]];
        if(this.check(this.row,this.col)) {
            this.game.blockArr[0][1]=oldDirection;
        this.blockCode_1 = blockType_json[this.game.blockArr[0][0]][this.game.blockArr[0][1]];

        }


        // 没有添加nextblock时的写法
        // var oldDirection = this.direction_randomNull;
        // if(this.direction_randomNull == this.blockTypeDirectionLength-1){
        //     this.direction_randomNull = 0;
        // }else{
        //     this.direction_randomNull++;
        // }
        // this.blockCode = blockType_json[this.blockType][this.direction_randomNull];
        // if(this.check(this.row,this.col)) {
        //     this.direction_randomNull=oldDirection;
        //     this.blockCode = blockType_json[this.blockType][this.direction_randomNull];
        // }
    }




})();