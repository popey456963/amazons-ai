const Board = require('../Board')
const Constants = require('../Constants')

test('can create a board', () => {
    const board = new Board(6)
})

test('can set pieces', () => {
    const board = new Board(6)

    board.setSquare(Constants.ARROW, { x: 1, y: 1 })
    board.setSquare(Constants.BLACK_QUEEN, { x: 2, y: 1 })
    board.setSquare(Constants.WHITE_QUEEN, { x: 3, y: 1 })

    // overwrite piece
    board.setSquare(Constants.ARROW, { x: 4, y: 1 })
    board.setSquare(Constants.EMPTY_SPACE, { x: 4, y: 1 })

    expect(board.board[4][1] === 3)
    expect(board.board[4][2] === 2)
    expect(board.board[4][3] === 1)
    expect(board.board[4][4] === 0)
})

test('it can find avaialable moves', () => {
    const board = new Board(6)

    board.board = [
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 2],
        [3, 2, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [3, 3, 0, 0, 0, 0]
    ]

    console.log(board.movesFromSquare({ x: 0, y: 1 }))
})