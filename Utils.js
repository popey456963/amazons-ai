module.exports.move = (location, relative) => {
    return {
        x: location.x + relative.x,
        y: location.y + relative.y
    }
}