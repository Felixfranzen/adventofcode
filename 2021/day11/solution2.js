const fs = require('fs')
const { Set, update } = require('immutable')

const input = fs.readFileSync('./input')
  .toString()
  .split('\n')
  .map(row => row.split('')
    .map(n => parseInt(n)))

const key = (coordinate) => `${coordinate[0]}-${coordinate[1]}`

const increaseLevel = (matrice) => {
  return matrice.map(row => row.map(col => col + 1))
}

const getAdjacent = ([row, col]) => {
  const adjacent = [
    [row - 1, col],
    [row - 1, col - 1],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1]
  ]

  return Set(adjacent.map(co => key(co)))
}

const findIndexesThatShouldFlash = (matrice, flashedIndexes) => matrice.reduce((accRow, row, rowIndex) => {
  const flashingColIndexes = row.reduce((accCol, col, colIndex) => {
    const coordinate = key([rowIndex, colIndex])
    return col > 9 && !flashedIndexes.has(coordinate) ? accCol.add(coordinate) : accCol
  }, Set())
  return accRow.merge(flashingColIndexes)
}, Set())

const flashAndReset = (flashedThisStep, indexesThatShouldFlash, matrice) => {
  return matrice.map((row, rowIndex) => row.map((col, colIndex) => {
    const coordinate = [rowIndex, colIndex]
    if (indexesThatShouldFlash.has(key(coordinate))) {
      return 0
    }

    if (flashedThisStep.has(key(coordinate))) {
      return col
    }

    const sharedCoordinates = getAdjacent(coordinate).intersect(indexesThatShouldFlash)
    return col + sharedCoordinates.size
  }))
}

const runStep = (matrice) => {
  const increasedMatrice = increaseLevel(matrice)
  let flashedIndexes = Set()
  let newMatrice = increasedMatrice
  let indexesThatShouldFlash = findIndexesThatShouldFlash(newMatrice, flashedIndexes)
  while (indexesThatShouldFlash.size > 0) {
    const updatedMatrice = flashAndReset(flashedIndexes, indexesThatShouldFlash, newMatrice)
    flashedIndexes = flashedIndexes.merge(indexesThatShouldFlash)
    newMatrice = updatedMatrice
    indexesThatShouldFlash = findIndexesThatShouldFlash(newMatrice, flashedIndexes)
  }

  return [newMatrice, flashedIndexes.size]
}

const allFlashed = (matrice) => matrice.every(row => row.every(col => col === 0))

const solution = () => {
  let matrice = input
  let steps = 0
  while (!allFlashed(matrice)) {
    [newMatrice, newFlashes] = runStep(matrice)
    matrice = newMatrice
    steps += 1
  }
  return [newMatrice, steps]
}

console.log(solution())