const Board = require('./Board')
const Constants = require('./Constants')

const _ = require('lodash')

function alphabeta(node, depth, alpha, beta, maximizingPlayer) {
    const moves = board.getMovesForPlayer(node.currentPlayer)

    if (depth === 0 || )
}

function getBestMove(board, colour, depth = 0) {
    const player = Constants[colour]
    const moves = board.getMovesForPlayer(player)

    if (moves.length === 0) {
        return { [player.opponent] : 1 }
    }

    let result = { white: 0, black: 0 }

    for (const [moveIndex, move] of moves.entries()) {
        const tempBoard = board.clone()
        tempBoard.moveQueen(move.queen, player.queen, move)
        // console.log(tempBoard.board)
        // tempBoard.displayBoard()
        // console.log(move)
        const arrowMoves = tempBoard.movesFromSquare(move)
        // console.log(arrowMoves)

        // console.log(arrowMoves)

        tempBoard.setSquare(Constants.ARROW, _.sample(arrowMoves))

        // tempBoard.displayBoard()
        // console.log()

        const branchResult = getBestMove(tempBoard, player.opponent, depth + 1)
        result.white += branchResult.white || 0
        result.black += branchResult.black || 0
    }

    return result
}

// BOARD SETUP
const board = new Board(6)

board.moveQueen(0, Constants.BLACK_QUEEN, { x: 0, y: 2 })
board.moveQueen(1, Constants.BLACK_QUEEN, { x: 5, y: 3 })

board.moveQueen(0, Constants.WHITE_QUEEN, { x: 3, y: 0 })
board.moveQueen(1, Constants.WHITE_QUEEN, { x: 2, y: 5 })

// RUNNING THE GAME
while(1) {
    console.log(getBestMove(board, 'white'))
    break
}