const { SIZE, EMPTY, WHITE, BLACK } = require('./Constants')

class Board {
    constructor() {}

    setValue(x, y, v) {
        board[x][y] = v
    }

    getValue(x, y) {
        return board[x][y]
    }

    setInitialBoard() {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                this.setValue(i, j, EMPTY)
            }
        }

        this.setValue(0, 3, BLACK)
        this.setValue(0, 6, BLACK)
        this.setValue(3, 0, BLACK)
        this.setValue(3, 9, BLACK)

        this.setValue(6, 0, WHITE)
        this.setValue(6, 9, WHITE)
        this.setValue(9, 3, WHITE)
        this.setValue(9, 6, WHITE)

    }
}

module.exports = Board