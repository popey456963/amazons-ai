const Constants = require('./Constants')
const Utils = require('./Utils')

const _ = require('lodash')

class Board {
    constructor(size) {
        this.size = size
        this.board = (new Array(size).fill(Constants.EMPTY_SPACE)).map(item => (new Array(size).fill(Constants.EMPTY_SPACE)))
        this.whiteQueens = [{ x: 3, y: 0 }, { x: 2, y: 5 }]
        this.blackQueens = [{ x: 0, y: 2 }, { x: 5, y: 3 }]
        this.currentPlayer = 'white'
    }

    move(queen, move, arrow) {
        const player = Constants[this.currentPlayer]

        // console.log('Setting square', this[player.queens][queen], 'to empty')
        this.setSquare(Constants.EMPTY_SPACE, this[player.queens][queen])

        // console.log('Setting new square as a queen', move)
        this.setSquare(player.queen, move)
        this[player.queens][queen] = move

        // console.log('Setting arrow location to', arrow)
        this.setSquare(Constants.ARROW, arrow)

        // console.log('Moving to new player')
        this.nextPlayer()
    }

    nextPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white'
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
        if (!location) throw new Error('Location not provided to set square')

        this.board[this.size - location.y - 1][location.x] = piece
    }

    isSquareOccupied(location) {
        // console.log(location, this.getSquare(location))
        return this.getSquare(location) !== Constants.EMPTY_SPACE
    }

    clone() {
        const board = new Board(6)
        board.whiteQueens = _.cloneDeep(this.whiteQueens)
        board.blackQueens = _.cloneDeep(this.blackQueens)
        board.currentPlayer = _.cloneDeep(this.currentPlayer)
        board.board = _.cloneDeep(this.board)

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
        console.log()
    }

    getMovesForPlayer(player) {
        let moves = []

        for (const [queenIndex, queen] of this[player.queens].entries()) {
            moves = moves.concat(
                this.movesFromSquare(queen)
                    .map(move => {
                        this.setSquare(Constants.EMPTY_SPACE, queen)
                        const arrowLocations = this.movesFromSquare(move)
                        this.setSquare(player.queen, queen)
                        return arrowLocations.map(arrow => ({
                            arrow,
                            x: move.x,
                            y: move.y,
                            queen: Number(queenIndex)
                        }))
                    })
            ).flat()
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