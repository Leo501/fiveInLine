const chessAl = require('AlLogic');
cc.Class({
    extends: cc.Component,

    properties: {
        scriptChessBoard: cc.require('ChessBoardUi'),
        chessAl: null,
    },


    onLoad() {
        my.gameModel.setParsonColor(my.confMap.ChessColor.black);
        my.gameModel.setChessColor(my.confMap.ChessColor.white);
        this.scriptChessBoard.init();
        //获取棋子数据
        chessAl.setChessArr(this.scriptChessBoard.getChessScriptArr());
    },

    // start () {

    // },

    // update (dt) {},

    //onDestroy(){}
});