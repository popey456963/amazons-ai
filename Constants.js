module.exports = {
    NOT_A_SQUARE: -1,
    EMPTY_SPACE: 0,
    WHITE_QUEEN: 1,
    BLACK_QUEEN: 2,
    ARROW: 3
}

module.exports.white = {
    queens: 'whiteQueens',
    queen: module.exports.WHITE_QUEEN,
    opponent: 'black',
}

module.exports.black = {
    queens: 'blackQueens',
    queen: module.exports.BLACK_QUEEN,
    opponent: 'white'
}