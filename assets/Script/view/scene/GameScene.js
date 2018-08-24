cc.Class({
    extends: cc.Component,

    properties: {
        scriptChessBoard: cc.require('ChessBoardUi'),
    },


    onLoad() {
        //本人为黑子
        my.gameModel.setMyColor(my.confMap.ChessColor.black);
        //ai为白子
        my.chessAl.setAlColor(my.confMap.ChessColor.white);
        //初始化
        this.scriptChessBoard.init();
        //初始化获取棋子数据,并初始化五元组
        my.chessAl.init(this.scriptChessBoard.getChessScriptArr());
        //白子先下
        my.gameModel.setChessColor(my.confMap.ChessColor.white);
        this.scriptChessBoard.getChessScriptArr()[112].onEventClicked_checkGame();
    },

    // start () {

    // },

    // update (dt) {},

    //onDestroy(){}
});