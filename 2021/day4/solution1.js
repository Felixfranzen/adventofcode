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
  for (const condition of winningStates) {
    const hasWon = condition.every(i => markedIndexes[i])
    if (hasWon) {
      return true
    }
  }
  return false
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
      if (!markedIndexes[indexKey(rowIndex, colIndex)]) {
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
  for (const number of numbers) {
    for (const board of boards) {
      const foundCoordinate = boardHasNumber(number, board.board)
      if (foundCoordinate) {
        const [foundRow, foundCol] = foundCoordinate
        markBoard(foundRow, foundCol, board.markedIndexes)
        const hasWon = hasWinCondition(board.markedIndexes)
        if (hasWon) {
          const unmarkedNumbers = findUnmarkedNumbers(board.markedIndexes, board.board)
          return calculateScore(unmarkedNumbers, number)
        }
      }
    }
  }
}

console.log(solution(numbers, boards))