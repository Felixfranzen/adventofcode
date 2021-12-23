const fr = mass => Math.floor(parseInt(mass) / 3) - 2

const frForModule = (input, sum = 0) => {
  const fuel = fr(input);
  return fuel <= 0
    ? sum
    : frForModule(fuel, sum + fuel);
}

const solution = input => input.reduce((acc, next) => acc + frForModule(next), 0);

module.exports = solution
