const Board = require('./Board')
const Constants = require('./Constants')

const _ = require('lodash')

function applyMove(board, move, player, clone = true) {
    if (clone) {
        const child = board.clone()
        child.move(move.queen, move, move.arrow)
        return child
    } else {
        board.move(move.queen, move, move.arrow)
        return board
    }
}

function alphabeta(node, depth, alpha, beta, maximizingPlayer, lastMove) {
    const player = Constants[node.currentPlayer]
    const moves = node.getMovesForPlayer(player)

    // terminal node
    if (moves.length === 0) {
        maximizingPlayer ? Infinity : -Infinity
    }

    // no search space left
    if (depth === 0) {
        const opponentMoves = node.getMovesForPlayer(Constants[player.opponent])
        return [lastMove, opponentMoves.length - moves.length]
    }

    if (maximizingPlayer) {
        value = -Infinity
        valueMove = undefined
        for (let move of moves) {
            const [newValueMove, newValue] = alphabeta(applyMove(node, move, player), depth - 1, alpha, beta, false, move)
            if (newValue > value) {
                value = newValue
                valueMove = newValueMove
            }
            alpha = Math.max(alpha, value)
            if (alpha >= beta) break
        }
        return [valueMove, value]
    } else {
        value = Infinity
        for (let move of moves) {
            const [newValueMove, newValue] = alphabeta(applyMove(node, move, player), depth - 1, alpha, beta, true, move)
            if (newValue < value) {
                value = newValue
                valueMove = newValueMove
            }
            beta = Math.min(beta, value)
            if (alpha > beta) break
        }
        return [valueMove, value]
    }
}

// BOARD SETUP
const board = new Board(6)

board.moveQueen(0, Constants.BLACK_QUEEN, { x: 0, y: 2 })
board.moveQueen(1, Constants.BLACK_QUEEN, { x: 5, y: 3 })

board.moveQueen(0, Constants.WHITE_QUEEN, { x: 3, y: 0 })
board.moveQueen(1, Constants.WHITE_QUEEN, { x: 2, y: 5 })

// board.displayBoard()

// RUNNING THE GAME
console.time('runtime')
while (1) {
    // console.log('White to move!')
    let [move, score] = alphabeta(board, 1, -Infinity, Infinity, true)
    if (move === undefined) { console.log('BLACK WINS'); break }
    // console.log(move)
    applyMove(board, move, Constants.white, false)
    // board.displayBoard()

    // console.log('Black to move!')
    ;[move, score] = alphabeta(board, 1, -Infinity, Infinity, true)
    if (move === undefined) { console.log('WHITE WINS'); break }
    // console.log(move)
    applyMove(board, move, Constants.black, false)
    // board.displayBoard()
}
console.timeEnd('runtime')