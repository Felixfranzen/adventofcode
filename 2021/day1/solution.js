const fs = require('fs')
const input = fs.readFileSync('./input').toString().split('\n').map(i => parseInt(i, 10))

let count = 0
let firstPointer = 2
let secondPointer = 3
while (secondPointer < input.length) {
  const sumPrevious = input[firstPointer - 2] + input[firstPointer - 1] + input[firstPointer]
  const sumCurrent = input[secondPointer - 2] + input[secondPointer - 1] + input[secondPointer]
  if (sumPrevious < sumCurrent) {
    count++
  }
  firstPointer++
  secondPointer++
}
console.log(count)