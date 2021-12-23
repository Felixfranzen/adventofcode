const fs = require('fs')
const { Set } = require('immutable')
const input = fs.readFileSync('./input')
  .toString()
  .split('\n')
  .map(row => row.split('')
    .map(n => parseInt(n)))

const range = (count) => [...Array(count).keys()]

const key = (coordinate) => `${coordinate[0]}-${coordinate[1]}`

const incrementLevels = (matrice) => {
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

const findCoordinatesThatShouldFlash = (matrice) => matrice.reduce((accRow, row, rowIndex) => {
  const flashingColIndexes = row.reduce((accCol, col, colIndex) => {
    const coordinate = key([rowIndex, colIndex])
    return col > 9 ? accCol.add(coordinate) : accCol
  }, Set())
  return accRow.merge(flashingColIndexes)
}, Set())

const flashAndReset = (flashedThisStep, coordinatesThatShouldFlash, matrice) => {
  return matrice.map((row, rowIndex) => row.map((col, colIndex) => {
    const coordinate = [rowIndex, colIndex]
    if (coordinatesThatShouldFlash.has(key(coordinate))) {
      return 0
    }

    if (flashedThisStep.has(key(coordinate))) {
      return col
    }

    const sharedCoordinates = getAdjacent(coordinate).intersect(coordinatesThatShouldFlash)
    return col + sharedCoordinates.size
  }))
}

const runStep = (flashedCoordinates, coordinatesThatShouldFlash, matrice) => {
  if (coordinatesThatShouldFlash.size === 0) {
    return [matrice, flashedCoordinates.size]
  }

  const updatedMatrice = flashAndReset(flashedCoordinates, coordinatesThatShouldFlash, matrice)
  const updatedFlashedIndexes = flashedCoordinates.merge(coordinatesThatShouldFlash)
  return runStep(
    updatedFlashedIndexes,
    findCoordinatesThatShouldFlash(updatedMatrice, updatedFlashedIndexes),
    updatedMatrice
  )
}

const solution = () => {
  const [_, flashes] = range(100).reduce(([matrice, flashes]) => {
    const incrementedMatrice = incrementLevels(matrice)
    const coordinatesToFlash = findCoordinatesThatShouldFlash(incrementedMatrice)
    const [updatedMatrice, flashesForStep] = runStep(Set(), coordinatesToFlash, incrementedMatrice)
    return [updatedMatrice, flashes + flashesForStep]
  }, [input, 0])

  return flashes
}

console.log(solution())