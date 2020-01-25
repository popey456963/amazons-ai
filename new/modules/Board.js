const util = require('util')
const _ = require('lodash')

const { BOARD_SIZE, EMPTY_SPACE, WHITE_QUEEN, BLACK_QUEEN, ARROW } = require('../Constants')
const paths = require('../data/paths')

const state = {
    board: [],
    currentPlayer: 0, // 0 - white : 1 - black
    whiteQueens: [],
    blackQueens: [],
}

function createBoard() {
    let board = new Array(BOARD_SIZE * BOARD_SIZE).fill(0)

    board[2] = WHITE_QUEEN
    board[33] = WHITE_QUEEN

    board[17] = BLACK_QUEEN
    board[18] = BLACK_QUEEN

    return board
}

function generateQueenMoves(board, queens) {
    let availableMoves = []

    for (let [qIndex, q] of queens.entries()) {
        const queenValue = board[q]
        board[q] = EMPTY_SPACE
        for (let move of generatePieceMoves(board, q)) {
            for (let arrow of generatePieceMoves(board, move)) {
                availableMoves.push([qIndex, q, move, arrow])
            }
        }
        board[q] = queenValue
    }

    return availableMoves
}

function generatePieceMoves(board, pos) {
    const moves = []
    const path = paths[pos]
    for (let strip of path) {
        for (let point of strip) {
            if (board[point] !== EMPTY_SPACE) break
            moves.push(point)
        }
        
    }

    return moves
}

function move(board, from, to, arrow) {
    board[to] = board[from]
    board[from] = EMPTY_SPACE
    board[arrow] = ARROW
}

function print(board) {
    let line = ''
    for (let i in board) {
        line += '□♕♔♙'[board[i]] + '  '
        if ((Number(i) + 1) % BOARD_SIZE === 0) {
            console.log(line)
            line = ''
        }
    }
    console.log()
}

const log = false
console.time('computing 100,000 games')
for (let i = 0; i < 100000; i++) {
    const board = createBoard()
    const whiteQueens = [2, 33]
    const blackQueens = [17, 18]

    while (1) {
        {
            const availableMoves = generateQueenMoves(board, whiteQueens)
            if (availableMoves.length === 0) { log ? console.log('white wins') : undefined; break }

            let [qIndex, q, move, arrow] = _.sample(availableMoves)

            board[q] = EMPTY_SPACE
            board[move] = WHITE_QUEEN
            board[arrow] = ARROW
            whiteQueens[qIndex] = move
        }

        log ? print(board) : undefined

        {
            const availableMoves = generateQueenMoves(board, blackQueens)
            if (availableMoves.length === 0) { log ? console.log('white wins') : undefined; break }
            let [qIndex, q, move, arrow] = _.sample(availableMoves)

            board[q] = EMPTY_SPACE
            board[move] = BLACK_QUEEN
            board[arrow] = ARROW
            blackQueens[qIndex] = move
        }

        log ? print(board) : undefined
    }
}
console.timeEnd('computing 100,000 games')
