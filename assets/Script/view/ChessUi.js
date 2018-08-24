const ChessType = cc.Enum({
    white: 1, //白子
    black: 2 //黑子
});
cc.Class({
    extends: cc.Component,

    properties: {
        spriteChess: cc.Sprite,
        whiteSpriteFrame: cc.SpriteFrame,
        blackSpriteFrame: cc.SpriteFrame
    },

    onLoad() {

    },

    init(checkFn) {
        this.checkFn = checkFn;
    },

    /**
     * 在本位置下棋
     */
    onEventClicked_checkGame() {
        let target = this.node;
        // console.log('target=', target);
        if (this.spriteChess.spriteFrame) {
            console.log('已选择');
            return;
        }
        this.checkFn && this.checkFn(target.name, this);
    },

    /**
     * 设置棋子
     */
    setCheckSpriteFrame(chessType) {
        // console.log('setCheckSpriteFrame');
        if (chessType == ChessType.white) {
            this.spriteChess.spriteFrame = this.whiteSpriteFrame;
        } else if (chessType == ChessType.black) {
            this.spriteChess.spriteFrame = this.blackSpriteFrame;
        } else {
            console.error('setCheckSpriteFrame err');
        }
    },

    /**
     * 是否空
     */
    isNullChess() {
        return this.spriteChess.spriteFrame == null;
    },

    /**
     * 是否为白子
     */
    isWhiteChess() {
        return this.spriteChess.spriteFrame == this.whiteSpriteFrame;
    },

    /**
     * 是否为黑子
     */
    isBlackChess() {
        return this.spriteChess.spriteFrame == this.blackSpriteFrame;
    },

    /**
     * 返回当前颜色
     */
    getChessColor() {
        if (this.isBlackChess()) return my.confMap.ChessColor.black;
        if (this.isWhiteChess()) return my.confMap.ChessColor.white;
        return -1;
    }

    // start () {

    // },

    // update (dt) {},

    //onDestroy(){}
});