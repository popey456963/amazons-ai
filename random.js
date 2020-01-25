// amazons.

const Board = require('./Board')
const Constants = require('./Constants')

const _ = require('lodash')

const board = new Board(6)

board.moveQueen(0, Constants.BLACK_QUEEN, { x: 0, y: 2 })
board.moveQueen(1, Constants.BLACK_QUEEN, { x: 5, y: 3 })

board.moveQueen(0, Constants.WHITE_QUEEN, { x: 3, y: 0 })
board.moveQueen(1, Constants.WHITE_QUEEN, { x: 2, y: 5 })

while(1) {
    // WHITE
    // move to random location
    {
        let moves = []
        for (let queenIndex in board.whiteQueens) {
            const queen = board.whiteQueens[queenIndex]
            moves = moves.concat(board.movesFromSquare(queen).map(move => Object.assign(move, { queen: Number(queenIndex) })))
        }

        if (moves.length === 0) { console.log('BLACK WINS'); break }

        let move = _.sample(moves)
        board.moveQueen(move.queen, Constants.WHITE_QUEEN, move)

        // shoot to random location
        board.setSquare(Constants.ARROW, _.sample(board.movesFromSquare(move)))
    }

    // BLACK
    // move to random location
    {
        let moves = []
        for (let queenIndex in board.blackQueens) {
            const queen = board.blackQueens[queenIndex]
            moves = moves.concat(board.movesFromSquare(queen).map(move => Object.assign(move, { queen: Number(queenIndex) })))
        }

        if (moves.length === 0) { console.log('WHITE WINS'); break }

        let move = _.sample(moves)
        board.moveQueen(move.queen, Constants.BLACK_QUEEN, move)

        // shoot to random location
        board.setSquare(Constants.ARROW, _.sample(board.movesFromSquare(move)))
    }
}

board.displayBoard()