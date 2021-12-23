const target = {
  x: {
    start: 269,
    end: 292
  },
  y: {
    start: -68,
    end: -44
  }
}

const solution = () => {

  const step = ([currentX, currentY], [velocityX, velocityY]) => {
    const newX = currentX + velocityX
    const newY = currentY + velocityY
    const newXVelocity = velocityX === 0 ? 0 : velocityX > 0 ? velocityX - 1 : velocityX + 1
    const newYVelocity = velocityY - 1
    return [
      [newX, newY], [newXVelocity, newYVelocity]
    ]
  }

  const isWithinTarget = ([x, y]) => {
    return x >= target.x.start && x <= target.x.end && y >= target.y.start && y <= target.y.end
  }

  let coordinate = [0, 0]
  let velocity = [28, 1]
  let maxY = 0

  console.log('-->', coordinate, velocity)

  while (coordinate[0] <= target.x.end && coordinate[1] >= target.y.start) {
    const [newCoordinates, newVelocity] = step(coordinate, velocity)

    if (newCoordinates[1] > maxY) {
      maxY = newCoordinates[1]
    }

    if (isWithinTarget(newCoordinates)) {
      return [maxY, newCoordinates]
    }

    coordinate = newCoordinates
    velocity = newVelocity
    console.log(coordinate, velocity)
  }
}

console.log('---->', solution(target))