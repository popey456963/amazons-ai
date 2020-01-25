// amazons.

const Board = require('./Board')
const Constants = require('./Constants')

const _ = require('lodash')

const board = new Board(6)

const players = {
    white: {
        queens: 'whiteQueens',
        queen: Constants.WHITE_QUEEN,
        opponent: 'black',
    },
    black: {
        queens: 'blackQueens',
        queen: Constants.BLACK_QUEEN,
        opponent: 'white'
    }
}

let highestDepth = 900
console.time('depth')

function getBestBranch(board, colour, depth = 0) {
    const player = players[colour]
    
    // get all available moves
    let moves = []
    for (const [queenIndex, queen] of board[player.queens].entries()) {
        moves = moves.concat(board.movesFromSquare(queen).map(move => Object.assign(move, { queen: Number(queenIndex) })))
    }

    if (moves.length === 0) {
        return { [player.opponent] : 1 }
    }

    let result = { white: 0, black: 0 }

    let i = 0

    for (const [moveIndex, move] of moves.entries()) {

        try {
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

            const branchResult = getBestBranch(tempBoard, player.opponent, depth + 1)
            result.white += branchResult.white || 0
            result.black += branchResult.black || 0

            // break
            // if (i > 2) break
            // i+= 1
        } catch(e) {
            // throw e
        }
    }

    if (depth < highestDepth) {
        console.timeEnd('depth')
        console.log('lowest point reached', depth, result)
        highestDepth = depth
        console.time('depth')
    }

    return result
}

board.moveQueen(0, Constants.BLACK_QUEEN, { x: 0, y: 2 })
board.moveQueen(1, Constants.BLACK_QUEEN, { x: 5, y: 3 })

board.moveQueen(0, Constants.WHITE_QUEEN, { x: 3, y: 0 })
board.moveQueen(1, Constants.WHITE_QUEEN, { x: 2, y: 5 })

while(1) {
    console.log(getBestBranch(board, 'white'))
}

board.displayBoard()