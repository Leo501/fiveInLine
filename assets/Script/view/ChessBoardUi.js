cc.Class({
    extends: cc.Component,

    properties: {
        prefabChess: cc.Prefab,
        nodeChessContainer: cc.Node,
        labelGameOver: cc.Label,
    },

    onLoad() {
        // this.init();
        this.registerTouchEvent();
    },

    init() {
        this.chessScriptArr = new Array(225);
        console.log(this.chessScriptArr);
        this.nodeChessContainer.removeAllChildren();
    },

    registerTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            if (!this.canDownChess())
                return;
            let localPos = this.node.convertToNodeSpaceAR(event.getLocation());
            let originPos = cc.v2(262.5, 262.5);
            let logicPos = localPos.add(originPos);
            logicPos.y = 525 - logicPos.y;
            let x = parseInt(logicPos.x / 35);
            let y = parseInt(logicPos.y / 35);
            let name = '' + (y * 15 + x);
            this.createChess(name);
        });
    },

    canDownChess() {
        if (!my.gameModel.isPlayState()) {
            console.log('不能下棋了');
            return false;
        }
        if (my.gameModel.getMyColor() != my.gameModel.getChessColor()) {
            console.log('请等待对方下棋');
            return false;
        }
        return true;
    },

    getPosByNo(No) {
        let x = No % 15;
        let y = parseInt(No / 15);
        return cc.v2(-246 + x * 35, 246 - y * 35);
    },

    getChessScriptArr() {
        return this.chessScriptArr;
    },

    createChess(name) {
        // console.log('name=', name);
        if (this.chessScriptArr[name]) {
            console.log('已存在');
            return;
        }
        let node = cc.instantiate(this.prefabChess);
        this.nodeChessContainer.addChild(node);
        node.name = '' + name;
        node.setPosition(this.getPosByNo(name));
        node.script = node.getComponent('ChessUi');
        this.chessScriptArr[name] = node.script;
        this.onTouchChess(name, node.script);
        return node;
    },

    onTouchChess(name, script) {
        // console.log(name, script);
        //设置下棋颜色
        script.init(my.gameModel.getChessColor());
        my.chessAl.chessJudge(name, script, (code) => {
            console.log('chessJudge code=', code);
            if (code == 1) {
                let isWin = (my.gameModel.getChessColor() == my.gameModel.getMyColor());
                this.labelGameOver.string = isWin ? '你赢了！\n666' : '你输了！\n555';
                my.gameModel.setGameState(my.confMap.GameState.over);
                return;
            }
        });
        my.gameModel.nextChessColor();
        setTimeout(() => {
            if (my.gameModel.getMyColor() != my.gameModel.getChessColor()) {
                let pos = my.chessAl.ai();
                console.log('pos', pos);
                this.createChess('' + pos);
            }
        }, 100);
    },

    // update (dt) {},

    //onDestroy(){}
});