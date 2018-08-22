cc.Class({
    extends: cc.Component,

    properties: {
        prefabChess: cc.Prefab,
        nodeChessContainer: cc.Node
    },

    onLoad() {
        this.init();

    },

    init() {
        this.nodeChessContainer.removeAllChildren();
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                this.createChess(i * 15 + j, this.onTouchChess.bind(this));
            }
        }
    },

    createChess(name, fn) {
        // console.log('name=', name);
        let node = cc.instantiate(this.prefabChess);
        this.nodeChessContainer.addChild(node);
        node.name = '' + name;
        node.script = node.getComponent('ChessUi');
        node.script.init(fn);
    },

    onTouchChess(name, script) {
        console.log(name, script, this);
    },

    // update (dt) {},

    //onDestroy(){}
});