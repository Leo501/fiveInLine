let my = {};
window.my = my;
my.confMap = {};
my.confMap.ChessColor = {
    white: 1,
    black: 2
};
my.confMap.GameState = {
    ide: 1,
    play: 2,
    over: 3,
};
my.gameModel = require('GameModel');
my.chessAl = require('AlLogic');