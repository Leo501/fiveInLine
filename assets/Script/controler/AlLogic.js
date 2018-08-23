/**
 * 参考文档:https://blog.csdn.net/onezeros/article/details/5542379
 */
class AlLogic {
    constructor() {
        //棋盘中每一个五格相连的线，称之为五元组
        this.fiveGroup = [];
        this.fiveGroupScore = [] //五元组分数
        this.alChessColor = my.confMap.ChessColor.white;
    }

    /**
     * 初始化五元组
     */
    initFiveGroup() {
        //横向
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 11; x++) {
                this.fiveGroup.push([y * 15 + x, y * 15 + x + 1, y * 15 + x + 2, y * 15 + x + 3, y * 15 + x + 4]);
            }
        }
        //纵向
        for (var x = 0; x < 15; x++) {
            for (var y = 0; y < 11; y++) {
                this.fiveGroup.push([y * 15 + x, (y + 1) * 15 + x, (y + 2) * 15 + x, (y + 3) * 15 + x, (y + 4) * 15 + x]);
            }
        }
        //右上斜向
        for (var b = -10; b <= 10; b++) {
            for (var x = 0; x < 11; x++) {
                if (b + x < 0 || b + x > 10) {
                    continue;
                } else {
                    this.fiveGroup.push([(b + x) * 15 + x, (b + x + 1) * 15 + x + 1, (b + x + 2) * 15 + x + 2, (b + x + 3) * 15 + x + 3, (b + x + 4) * 15 + x + 4]);
                }
            }
        }
        //右下斜向
        for (var b = 4; b <= 24; b++) {
            for (var y = 0; y < 11; y++) {
                if (b - y < 4 || b - y > 14) {
                    continue;
                } else {
                    this.fiveGroup.push([y * 15 + b - y, (y + 1) * 15 + b - y - 1, (y + 2) * 15 + b - y - 2, (y + 3) * 15 + b - y - 3, (y + 4) * 15 + b - y - 4]);
                }
            }
        }
    }


    setChessColor(color) {
        this.alChessColor = color;
    }

    getChessColor() {
        return this.alChessColor;
    }
    /**
     * 设置棋子对象数组
     * @param {*} arr 
     */
    setChessArr(arr) {
        this.chessArr = arr;
    }

    getChessArr() {
        return this.chessArr;
    }

    /**
     * 该位置是否为黑子
     * @param {*} i 
     * @param {*} j 
     */
    isBlackChess(i, j) {
        let pos = this.fiveGroup[i][j];
        let scriptChess = this.getChessArr()[pos];
        console.log('scriptChess=', scriptChess);
        if (scriptChess)
            return scriptChess.isBlackChess();
        return false;
    }

    /**
     * 该位置是否为白子
     * @param {*} i 
     * @param {*} j 
     */
    isWhiteCheck(i, j) {
        let pos = this.fiveGroup[i][j];
        let scriptChess = this.getChessArr()[pos];
        console.log('scriptChess=', scriptChess);
        if (scriptChess)
            return scriptChess.isWhiteChess();
        return false;
    }

    /**
     * 是否已下
     * @param {*} i 
     * @param {*} j 
     * return true 为有子
     * false 为无子
     */
    isHaveChessByPos(i, j) {
        let pos = this.fiveGroup[i][j];
        let scriptChess = this.getChessArr()[pos];
        if (scriptChess) {
            return scriptChess.isHaveChess();
        }
        return false;
    }

    //电脑下棋逻辑
    chessAI() {
        //评分
        for (var i = 0; i < this.fiveGroup.length; i++) {
            var b = 0; //五元组里黑棋的个数
            var w = 0; //五元组里白棋的个数
            for (var j = 0; j < 5; j++) {
                this.getComponent(cc.Sprite).spriteFrame
                if (this.isBlackChess(i, j)) {
                    b++;
                } else if (this.isWhiteCheck(i, j)) {
                    w++;
                }
            }
            if (b + w == 0) {
                this.fiveGroupScore[i] = 7;
            } else if (b > 0 && w > 0) {
                this.fiveGroupScore[i] = 0;
            } else if (b == 0 && w == 1) {
                this.fiveGroupScore[i] = 35;
            } else if (b == 0 && w == 2) {
                this.fiveGroupScore[i] = 800;
            } else if (b == 0 && w == 3) {
                this.fiveGroupScore[i] = 15000;
            } else if (b == 0 && w == 4) {
                this.fiveGroupScore[i] = 800000;
            } else if (w == 0 && b == 1) {
                this.fiveGroupScore[i] = 15;
            } else if (w == 0 && b == 2) {
                this.fiveGroupScore[i] = 400;
            } else if (w == 0 && b == 3) {
                this.fiveGroupScore[i] = 1800;
            } else if (w == 0 && b == 4) {
                this.fiveGroupScore[i] = 100000;
            }
        }
        //找最高分的五元组
        var hScore = 0;
        var mPosition = 0;
        for (var i = 0; i < this.fiveGroupScore.length; i++) {
            if (this.fiveGroupScore[i] > hScore) {
                hScore = this.fiveGroupScore[i];
                mPosition = (function (x) { //js闭包
                    return x;
                })(i);
            }
        }
        //在最高分的五元组里找到最优下子位置
        var flag1 = false; //无子
        var flag2 = false; //有子
        var nPosition = 0;
        for (var i = 0; i < 5; i++) {
            //如果无子
            if (!flag1 && !this.isHaveChessByPos(mPosition, i)) {
                nPosition = (function (x) {
                    return x
                })(i);
            }
            //有子
            if (!flag2 && this.isHaveChessByPos(mPosition, i)) {
                flag1 = true;
                flag2 = true;
            }
            //无子
            if (flag2 && !this.isHaveChessByPos(mPosition, i)) {
                nPosition = (function (x) {
                    return x
                })(i);
                break;
            }
        }
        //返回最优位置下子位置
        return this.fiveGroup[mPosition][nPosition];
    }

    chessColorByPos(pos) {
        return this.getChessArr()[pos].getChessColor();
    }

    /**
     * 当前下子是否可以五子成线
     * @param {*} chess 
     */
    chessJudge(name, chess, resultFn) {
        let chessColor = chess.getChessColor();
        var x0 = name % 15;
        var y0 = parseInt(name / 15);
        //判断横向
        var fiveCount = 0;
        for (var x = 0; x < 15; x++) {
            // if ((this.chessList[y0 * 15 + x].getComponent(cc.Sprite)).spriteFrame === this.touchChess.getComponent(cc.Sprite).spriteFrame) {
            if (this.chessColorByPos(y0 * 15 + x) == chessColor) {
                fiveCount++;
                if (fiveCount == 5) {
                    resultFn(1);
                    // if (this.gameState === 'black') {
                    //     this.overLabel.string = "你赢了";
                    //     this.overSprite.node.x = 0;
                    // } else {
                    //     this.overLabel.string = "你输了";
                    //     this.overSprite.node.x = 0;
                    // }
                    // this.gameState = 'over';
                    return;
                }
            } else {
                fiveCount = 0;
            }
        }
    }
}

module.exports = new AlLogic();