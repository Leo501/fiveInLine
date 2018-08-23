cc.Class({
    extends: cc.Component,

    properties: {
        prefabChess: cc.Prefab,
        nodeChessContainer: cc.Node,
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
        console.log('chessScriptArr=', this.chessScriptArr);
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
        //切换颜色
        my.gameModel.nextChessColor();
    },

    // update (dt) {},

    //onDestroy(){}
});