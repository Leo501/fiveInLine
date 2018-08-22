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

    onEventClicked_checkGame(event) {
        let target = event.target;
        // console.log('target=', target);
        if (this.spriteChess.spriteFrame) {
            console.log('已选择');
            return;
        }
        this.setCheckSpriteFrame(ChessType.black);
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
    }

    // start () {

    // },

    // update (dt) {},

    //onDestroy(){}
});