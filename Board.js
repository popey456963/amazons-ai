const Constants = require('./Constants')
const Utils = require('./Utils')

class Board {
    constructor(size) {
        this.size = size
        this.board = (new Array(size).fill(Constants.EMPTY_SPACE)).map(item => (new Array(size).fill(Constants.EMPTY_SPACE)))
        this.whiteQueens = []
        this.blackQueens = []
        this.currentPlayer = 'white'
    }

    moveQueen(index, colour, location) {
        if (colour === Constants.BLACK_QUEEN) {
            this.blackQueens[index] !== undefined ? this.setSquare(Constants.EMPTY_SPACE, this.blackQueens[index]) : false
            this.setSquare(Constants.BLACK_QUEEN, location)
            this.blackQueens[index] = location
        } else if (colour === Constants.WHITE_QUEEN) {
            this.whiteQueens[index] !== undefined ? this.setSquare(Constants.EMPTY_SPACE, this.whiteQueens[index]) : false
            this.setSquare(Constants.WHITE_QUEEN, location)
            this.whiteQueens[index] = location
        } else {
            throw new Error('error in move queen')
        }
    }

    getSquare(location) {
        const y = this.size - location.y - 1
        const x = location.x

        if (y >= this.size || y < 0 || x >= this.size || x < 0) return Constants.NOT_A_SQUARE
        return this.board[y][x]
    }

    setSquare(piece, location) {
        this.board[this.size - location.y - 1][location.x] = piece
    }

    isSquareOccupied(location) {
        // console.log(location, this.getSquare(location))
        return this.getSquare(location) !== Constants.EMPTY_SPACE
    }

    clone() {
        const board = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        board.board = board.board.map(row => row.slice())
        return board
    }
    
    displayBoard() {
        for (let row of this.board) {
            let line = ''
            for (let square of row) {
                if (square === Constants.EMPTY_SPACE) line += '□  '
                if (square === Constants.WHITE_QUEEN) line += '♕  '
                if (square === Constants.BLACK_QUEEN) line += '♔  '
                if (square === Constants.ARROW) line += '♙  '
            }

            console.log(line)
        }
    }

    getMovesForPlayer(player) {
        let moves = []
        for (const [queenIndex, queen] of this[player.queens].entries()) {
            moves = moves.concat(this.movesFromSquare(queen).map(move => Object.assign(move, { queen: Number(queenIndex) })))
        }

        return moves
    }

    stopAtBoundary(locations) {
        // console.log('locations', locations)
        for (let i = 0; i < locations.length; i++) {
            if (this.isSquareOccupied(locations[i])) {
                // console.log(locations[i], 'returned true, returning up to', i, this.isSquareOccupied(locations[i]))
                // console.log('returning', locations.slice(0, i))
                return locations.slice(0, i)
            }
        }
    }

    movesFromSquare(location) {
        // console.log(this)

        // return a list of all valid moves from a position
        let directions = [
            { x: -1, y: -1 },
            { x: -1, y:  0 },
            { x: -1, y:  1 },
            { x:  0, y: -1 },
            { x:  0, y:  1 },
            { x:  1, y: -1 },
            { x:  1, y:  0 },
            { x:  1, y:  1 }
        ]
        const possible_squares = directions.map(direction =>
            this.stopAtBoundary(
                new Array(6)
                    .fill(0)
                    .map((item, index) =>
                        Utils.move(location, { x: direction.x * (index + 1), y: direction.y * (index + 1) })
                    )
            )
        ).flat()

        return possible_squares
    }
}

module.exports = Board