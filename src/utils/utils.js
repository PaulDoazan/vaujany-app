const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const getDistance = (x1, x2, y1, y2) => {
    const a = x1 - x2
    const b = y1 - y2

    return Math.sqrt(a * a + b * b)
}

export { shuffleArray, getDistance }