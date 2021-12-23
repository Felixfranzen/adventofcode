const SKIP_DISTANCE = 4;

const solution = input => {
  let maxIndex = input.length - SKIP_DISTANCE
  let index = 0;

  while (index < maxIndex) {

    const command = input[index];
    if (command === 99) {
      return input[0];
    }

    const value1Index = input[index + 1];
    const value2Index = input[index + 2];
    const writeIndex = input[index + 3]

    const result = command === 1
      ? input[value1Index] + input[value2Index]
      : input[value1Index] * input[value2Index]

    input[writeIndex] = result;
    index += SKIP_DISTANCE;
  }

}

module.exports = solution