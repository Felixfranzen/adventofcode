const solution = input => input.reduce((acc, next) => acc + (Math.floor(next / 3) - 2), 0);

module.exports = solution