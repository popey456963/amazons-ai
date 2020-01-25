// amazons.

const Board = require('./Board')
const Constants = require('./Constants')

const _ = require('lodash')

const board = new Board(6)

board.setSquare(Constants.BLACK_QUEEN, { x: 2, y: 1 })
board.setSquare(Constants.ARROW, { x: 5, y: 1 })

board.displayBoard()

const moves = board.movesFromSquare({ x: 2, y: 1 })

console.log()
console.log(moves)
console.log()

const move = _.sample(moves)
board.setSquare(Constants.EMPTY_SPACE, { x: 2, y : 1 })
board.setSquare(Constants.BLACK_QUEEN, move)
board.setSquare(Constants.ARROW, _.sample(board.movesFromSquare(move)))

board.displayBoard()