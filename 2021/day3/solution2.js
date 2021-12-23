const fs = require('fs')
const input = fs.readFileSync('./input').toString().split('\n').map(row => row.split(''))

const getRating = (binaryInput, bitIndex, predicate) => {
  if (binaryInput.length === 1) {
    return binaryInput[0]
  }

  const bits = binaryInput.map(row => row[bitIndex])
  const zeroCount = bits.filter(b => b === '0').length
  const oneCount = bits.filter(b => b === '1').length
  const mostCommonBit = predicate(zeroCount, oneCount)
  const filtered = binaryInput.filter(row => row[bitIndex] === mostCommonBit)
  return getRating(filtered, bitIndex + 1, predicate)
}

const solution = (input) => {
  return [
    getRating(input, 0, (zeroCount, oneCount) => zeroCount > oneCount ? '0' : '1'),
    getRating(input, 0, (zeroCount, oneCount) => zeroCount <= oneCount ? '0' : '1')
  ].map(entry => entry.join(''))
}

console.log(solution(input))