module.exports = function (...args) {
    let sum = 0;
    for (const i of args) {
        sum += i;
    }

    return sum;
}