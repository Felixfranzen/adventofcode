const fs = require('fs')
const input = fs.readFileSync('./input').toString().split('\n').map(row => row.split(''))

let gamma = ''
let epsilon = ''
for (let rowIndex = 0; rowIndex < input[0].length; rowIndex++) {
  let count = [0, 0] // [0, 1]
  for (let columnIndex = 0; columnIndex < input.length; columnIndex++) {
    const element = input[columnIndex][rowIndex]
    if (element == 0) {
      count = [count[0] + 1, count[1]]
    } else {
      count = [count[0], count[1] + 1]
    }
  }

  if (count[0] > count[1]) {
    gamma += '0'
    epsilon += '1'
  } else {
    gamma += '1'
    epsilon += '0'
  }
}
console.log(gamma, epsilon)