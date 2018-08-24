const ChessColor = {
    white: 1,
    black: 2
};
class GameModel {
    constructor() {
        this.info = {};
    }

    /**
     * 设置本人下棋颜色
     * @param {*} color 
     */
    setMyColor(color) {
        this.info.parsonColor = color;
    }

    getMyColor() {
        return this.info.parsonColor;
    }

    /**
     * 现在是到哪一方下棋
     */
    getChessColor() {
        return this.info.chessColor;
    }

    /**
     * 设置当前下棋颜色
     * @param {*} color 
     */
    setChessColor(color) {
        this.info.chessColor = color;
    }

    /**
     * 设置游戏状态
     * @param {*} state 
     */
    setGameState(state) {
        this.info.gameState = state;
    }

    /**
     * 获取游戏状态
     */
    getGameState() {
        return this.info.gameState || my.confMap.GameState.ide;
    }

    isPlayState() {
        return this.info.gameState == my.confMap.GameState.play;
    }



    /**
     * 切换到下一种颜色
     */
    nextChessColor() {
        if (this.getChessColor() == ChessColor.white) {
            this.setChessColor(ChessColor.black);
        } else {
            this.setChessColor(ChessColor.white);
        }
    }
}

module.exports = new GameModel();