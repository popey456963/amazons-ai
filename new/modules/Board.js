const _ = require('lodash')

const { BOARD_SIZE, EMPTY_SPACE, WHITE_QUEEN, BLACK_QUEEN, ARROW } = require('../Constants')
const paths = require('../data/paths')

function createBoard() {
    let board = new Array(BOARD_SIZE * BOARD_SIZE).fill(0)

    board[2] = WHITE_QUEEN
    board[33] = WHITE_QUEEN

    board[17] = BLACK_QUEEN
    board[18] = BLACK_QUEEN

    return board
}

function generatePlayerMoves(state, player) {
    if (player === 0) return generateQueenMoves(state.board, state.whiteQueens)
    if (player === 1) return generateQueenMoves(state.board, state.blackQueens)
}

function generateQueenMoves(board, queens) {
    let availableMoves = []

    for (let [qIndex, q] of queens.entries()) {
        const queenValue = board[q]
        board[q] = EMPTY_SPACE
        for (let move of generatePieceMoves(board, q, true)) {
            for (let arrow of generatePieceMoves(board, move, false)) {
                availableMoves.push([qIndex, q, move, arrow])
            }
        }
        board[q] = queenValue
    }

    return _.shuffle(availableMoves)
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

function migrate(board, from, to, arrow) {
    board[to] = board[from]
    board[from] = EMPTY_SPACE
    board[arrow] = ARROW
}

function applyMove(state, fullMove, duplicate = true) {
    // console.log('applying a move', fullMove)

    const [qIndex, q, move, arrow] = fullMove

    if (duplicate) {
        const child = clone(state)
        migrate(child.board, q, move, arrow)
        child[child.player === 0 ? 'whiteQueens' : 'blackQueens'][qIndex] = move
        child.player = 1 - child.player
        return child
    } else {
        migrate(state.board, q, move, arrow)
        state[state.player === 0 ? 'whiteQueens' : 'blackQueens'][qIndex] = move
        state.player = 1 - state.player
        return state
    }
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

function clone(state) {
    return {
        board: state.board.slice(),
        whiteQueens: state.whiteQueens.slice(),
        blackQueens: state.blackQueens.slice(),
        player: state.player
    }
}

function alphabeta(state, depth, alpha, beta, maximizingPlayer, history=[]) {
    const moves = generatePlayerMoves(state, state.player)

    // console.log('Generated', moves.length, 'moves')

    if (maximizingPlayer) {
        if (moves.length === 0) {
            // console.log('We have reached the end game')

            return [Infinity, history]
        }
        if (depth === 0) {
            // console.log('We have no space left to search, returning value')

            const opponentMoves = generatePlayerMoves(state, 1 - state.player)
            return [moves.length - opponentMoves.length, history]
        }

        let value = -Infinity
        let bestHistory = []
        for (let move of moves) {
            const [newValue, newHistory] = alphabeta(applyMove(state, move), depth - 1, alpha, beta, false, history.concat([move]))
            if (newValue > value) {
                value = newValue
                bestHistory = newHistory
            }
            alpha = Math.max(alpha, value)
            if (alpha >= beta) break
        }
        return [value, bestHistory]
    } else {
        if (moves.length === 0) return [-Infinity, history]
        if (depth === 0) {
            const opponentMoves = generatePlayerMoves(state, 1 - state.player)
            return [opponentMoves.length - moves.length, history]
        }

        let value = Infinity
        let bestHistory = []
        for (let move of moves) {
            const [newValue, newHistory] = alphabeta(applyMove(state, move), depth - 1, alpha, beta, true, history.concat([move]))
            if (newValue < value) {
                value = newValue
                bestHistory = newHistory
            }
            beta = Math.min(beta, value)
            if (alpha > beta) break
        }
        return [value, bestHistory]
    }
}

const log = false
console.time('computing 100,000 games')
for (let i = 0; i < 1; i++) {
    const state = {
        board: createBoard(),
        whiteQueens: [2, 33],
        blackQueens: [17, 18],
        player: 0
    }

    while (1) {
        let [value, history] = alphabeta(state, 3, -Infinity, Infinity, true)
        if (history.length === 0) { console.log('GAME WON BY', 1 - state.player); break }
        applyMove(state, history[0], false)
        print(state.board)
    }
}
console.timeEnd('computing 100,000 games')
