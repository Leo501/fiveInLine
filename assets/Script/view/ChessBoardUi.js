cc.Class({
    extends: cc.Component,

    properties: {
        prefabChess: cc.Prefab,
        nodeChessContainer: cc.Node,
        labelGameOver: cc.Label,
    },

    onLoad() {
        // this.init();
    },

    init() {
        this.chessScriptArr = [];
        this.nodeChessContainer.removeAllChildren();
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                let node = this.createChess(i * 15 + j, this.onTouchChess.bind(this));
                this.chessScriptArr.push(node.script);
            }
        }
        console.log('chessScriptArr=');
    },

    getChessScriptArr() {
        return this.chessScriptArr;
    },

    createChess(name, fn) {
        // console.log('name=', name);
        let node = cc.instantiate(this.prefabChess);
        this.nodeChessContainer.addChild(node);
        node.name = '' + name;
        node.script = node.getComponent('ChessUi');
        node.script.init(fn);
        return node;
    },

    onTouchChess(name, script) {
        console.log(name, script, this);
        //设置下棋颜色
        this.chessScriptArr[name].setCheckSpriteFrame(my.gameModel.getChessColor());
        my.chessAl.chessJudge(name, script, (code) => {
            console.log('chessJudge code=', code);
            if (code == 1) {
                let isWin = (my.gameModel.getChessColor() == my.gameModel.getMyColor());
                this.labelGameOver.string = isWin ? '你赢了！\n666' : '你输了！\n555'
                // return;
            }
        });
        setTimeout(() => {
            //切换颜色
            my.gameModel.nextChessColor();
            // if (my.gameModel.getMyColor() != my.gameModel.getChessColor()) {
            //     let pos = my.chessAl.ai();
            //     console.log('pos', pos);
            //     this.getChessScriptArr()[pos].onEventClicked_checkGame();
            // }
        }, 1);
    },

    // update (dt) {},

    //onDestroy(){}
});