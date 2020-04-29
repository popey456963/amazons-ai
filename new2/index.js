const Board = require('./Board')



function run() {
    const board = new Board()
    const currentPlayer = 1

    const white = new Player(1)
    const black = new Player(2)
    
    board.setup()
}