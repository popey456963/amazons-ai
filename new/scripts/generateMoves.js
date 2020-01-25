const jetpack = require('fs-jetpack')

const Utils = require('../modules/Utils')
const { BOARD_SIZE } = require('../Constants')

function generatePaths(startX, startY, deltaX, deltaY) {
    const paths = []
    while (true) {    
        startX += deltaX
        startY += deltaY

        if (Utils.isValid(startX, startY)) {
            paths.push(Utils.xyToLinear(startX, startY))
        } else {
            break
        }
    }

    return paths
}

const locations = []

for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const [x, y] = Utils.linearToXY(i)

    const paths = []
    
    paths.push(generatePaths(x, y, -1, -1))
    paths.push(generatePaths(x, y, -1, 0))
    paths.push(generatePaths(x, y, -1, 1))
    paths.push(generatePaths(x, y, 0, -1))
    paths.push(generatePaths(x, y, 0, 1))
    paths.push(generatePaths(x, y, 1, -1))
    paths.push(generatePaths(x, y, 1, 0))
    paths.push(generatePaths(x, y, 1, 1))

    locations[i] = paths.filter(i => i.length !== 0)
}

console.log(JSON.stringify(locations))
jetpack.write('../data/paths.json', JSON.stringify(locations))