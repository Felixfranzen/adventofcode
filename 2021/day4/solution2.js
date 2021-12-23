const fs = require('fs')
const input = fs.readFileSync('./input').toString()

const [rawNumbers, ...rawBoards] = input.split('\n')
const numbers = rawNumbers.split(',').map((n) => parseInt(n, 10))
const boards = rawBoards.reduce((boards, row) => {
  if (row === '') {
    return [...boards, []]
  }
  const incompleteBoard = boards[boards.length - 1]
  const boardRow = row.split(' ')
  return [...boards.slice(0, boards.length - 1), [...incompleteBoard, boardRow]]
}, [])
  .filter(row => row.length > 0)
  .map(board =>
    board
      .map(row => row.filter(item => !!item)
        .map(n => parseInt(n, 10))))

  .map(board => ({
    markedIndexes: {},
    board,
  }))

const indexKey = (row, col) => `${row},${col}`

const hasWinCondition = (markedIndexes) => {
  const winningStates = [
    ['0,0', '0,1', '0,2', '0,3', '0,4'],
    ['1,0', '1,1', '1,2', '1,3', '1,4'],
    ['2,0', '2,1', '2,2', '2,3', '2,4'],
    ['3,0', '3,1', '3,2', '3,3', '3,4'],
    ['4,0', '4,1', '4,2', '4,3', '4,4'],
    ['0,0', '1,0', '2,0', '3,0', '4,0'],
    ['0,1', '1,1', '2,1', '3,1', '4,1'],
    ['0,2', '1,2', '2,2', '3,2', '4,2'],
    ['0,3', '1,3', '2,3', '3,3', '4,3'],
    ['0,4', '1,4', '2,4', '3,4', '4,4'],
  ]
  return winningStates.some((condition) => condition.every(i => markedIndexes[i]))
}

const boardHasNumber = (number, board) => {
  for (const rowIndex in board) {
    for (const colIndex in board) {
      const item = board[rowIndex][colIndex]
      if (item === number) {
        return [rowIndex, colIndex]
      }
    }
  }
}

const markBoard = (row, col, markedIndexes) => {
  markedIndexes[indexKey(row, col)] = true
}

const findUnmarkedNumbers = (markedIndexes, board) => {
  const unmarked = []
  for (const rowIndex in board) {
    for (const colIndex in board) {
      const isMarked = markedIndexes[indexKey(rowIndex, colIndex)]
      if (!isMarked) {
        unmarked.push(board[rowIndex][colIndex])
      }
    }
  }
  return unmarked
}

const calculateScore = (unmarkeditems, finalNumber) => {
  const unmarkedSum = unmarkeditems.reduce((acc, next) => acc + next, 0)
  return unmarkedSum * finalNumber
}

const solution = (numbers, boards) => {

  let mem = { drawnNumbers: 0, number: null, board: null }

  for (const boardIndex in boards) {
    for (const numberIndex in numbers) {
      const board = boards[boardIndex]
      const number = numbers[numberIndex]

      const foundCoorindate = boardHasNumber(number, board.board)
      if (foundCoorindate) {
        const [foundRow, foundCol] = foundCoorindate
        markBoard(foundRow, foundCol, board.markedIndexes)
        const hasWon = hasWinCondition(board.markedIndexes)
        if (hasWon) {
          if (numberIndex > mem.drawnNumbers) {
            mem = { drawnNumbers: numberIndex, number, board }
          }
          break
        }
      }
    }
  }

  const unmarkedNumbers = findUnmarkedNumbers(mem.board.markedIndexes, mem.board.board)
  return calculateScore(unmarkedNumbers, mem.number)
}

console.log(solution(numbers, boards))