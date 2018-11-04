(function(){
    //地图的构造函数，生成一个与Game一样规格的表格，用来存放和渲染死亡的方块
    window.Map = function(obj){
        this.game = obj;
        this.mapCode = [];
        for(var i=0; i<this.game.tableRow; i++){
            this.mapCode.push([]);
            for(var j=0; j<this.game.tableCol; j++){
                this.mapCode[i].push(0);
            }
        }
        this.mapCode.push([1,1,1,1,1,1,1,1,1,1,1,1]); //最下面插入一行非0的数据，让方块确底死亡
    //     //写一个“一柱擎天”测试形状块的左右碰撞
    //    this.mapCode[10][5] = "L";
    //    this.mapCode[11][5] = "L";
    //    this.mapCode[12][5] = "L";
    //    this.mapCode[13][5] = "L";
    //    this.mapCode[14][5] = "L";
    //    this.mapCode[15][5] = "L";
    //    this.mapCode[16][5] = "L";
    //    this.mapCode[17][5] = "L";
    //    this.mapCode[18][5] = "L";
    //    this.mapCode[19][5] = "L";
       this.mapRender();
    }

    //地图渲染
    Map.prototype.mapRender = function(){
        for(var i=0; i<this.game.tableRow; i++){
            for(var j=0; j<this.game.tableCol; j++){
                if(this.mapCode[i][j] != 0) {
                    this.game.addColorClass(i,j,this.mapCode[i][j]);
                }
            }
        }
    }

    //消行判断
    Map.prototype.delLine = function(){
        for(var i = 0;i < this.game.tableRow; i++){
            if(!this.game.map.mapCode[i].includes(0)){
                this.game.score++;
                //如果没有0，就删除行
                this.game.map.mapCode.splice(i ,1);
                document.getElementById("delLine").play();
                //删除行之后，再重新在头部填充一行全是0的
                this.game.map.mapCode.unshift(new Array(this.game.tableCol).fill(0));
            }
        }
    }

})()