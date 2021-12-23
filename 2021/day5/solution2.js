const fs = require('fs')
const input = fs.readFileSync('./input')
  .toString()
  .split('\n')
  .map(row => row.split(' -> '))
  .map(([firstCoordinate, secondCoordinate]) =>
    [
      firstCoordinate.split(',').map(n => parseInt(n)),
      secondCoordinate.split(',').map(n => parseInt(n))
    ])

const getExclusiveRangeBetween = (start, end) => {
  const entries = []
  if (start > end) {
    const temp = start
    start = end
    end = temp
  }
  let item = start + 1
  while (item < end) {
    entries.push(item)
    item++
  }
  return entries
}

const getExclusiveDiagonalRangeBetween = ([[startX, startY], [endX, endY]]) => {
  const entries = []
  // up right
  if (startX > endX && startY < endY) {
    let x = startX - 1
    let y = startY + 1
    while (x > endX && y < endY) {
      entries.push([x, y])
      x--
      y++
    }
    return entries
  }

  // down right
  if (startX < endX && startY < endY) {
    let x = startX + 1
    let y = startY + 1
    while (x < endX && y < endY) {
      entries.push([x, y])
      x++
      y++
    }
    return entries
  }

  // up left
  if (startX > endX && startY > endY) {
    let x = startX - 1
    let y = startY - 1
    while (x > endX && y > endY) {
      entries.push([x, y])
      x--
      y--
    }
    return entries
  }

  // down left
  if (startX < endX && startY > endY) {
    let x = startX + 1
    let y = startY - 1
    while (x < endX && y > endY) {
      entries.push([x, y])
      x++
      y--
    }
    return entries
  }
}


const getKey = (coordinate) => `${coordinate[0]}, ${coordinate[1]}`

const registerSeenCoordinate = (seenCoordinates, coordinate) => {
  const key = getKey(coordinate)
  if (seenCoordinates[key]) {
    seenCoordinates[key] = seenCoordinates[key] + 1
  } else {
    seenCoordinates[key] = 1
  }
}

const solution = (coordinates) => {
  const seenCoordinates = {}
  for (const coordinatePair of coordinates) {
    const [[startX, startY], [endX, endY]] = coordinatePair
    registerSeenCoordinate(seenCoordinates, [startX, startY])
    registerSeenCoordinate(seenCoordinates, [endX, endY])
    if (startX === endX) {
      const range = getExclusiveRangeBetween(startY, endY)
      for (const item of range) {
        registerSeenCoordinate(seenCoordinates, [startX, item])
      }
    } else if (startY === endY) {
      const range = getExclusiveRangeBetween(startX, endX)
      for (const item of range) {
        registerSeenCoordinate(seenCoordinates, [item, startY])
      }
    } else {
      const range = getExclusiveDiagonalRangeBetween(coordinatePair)
      for (const [x, y] of range) {
        registerSeenCoordinate(seenCoordinates, [x, y])
      }
    }
  }

  return Object.values(seenCoordinates).filter(val => val > 1).length
}

console.log(solution(input))