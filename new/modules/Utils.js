const { BOARD_SIZE } = require('../Constants')

module.exports.xyToLinear = (x, y) => {
    return y * BOARD_SIZE + x
}

module.exports.linearToXY = (linear) => {
    return [linear % BOARD_SIZE, Math.floor(linear / BOARD_SIZE)]
}

module.exports.isValid = (x, y) => {
    return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE
}