const input = 347991;

const DELTAS = {
 up: [-1, 0],
 down: [1, 0],
 left: [0, -1],
 right: [0, 1]
}

const NEXT_DIRECTION = {
  "up": "left",
  "left": "down",
  "down": "right",
  "right": "up"
}

// Solve task 1
function solve1(input, count, r, c, steps, direction, iterations){
  let counter = count;
  let nrSteps = steps;
  let row = r;
  let col = c;

  if (direction === "up" || direction === "right"){
    nrSteps = nrSteps - 1;
  }

  for (var i = 0; i < nrSteps; i++){
    counter += 1;

    const deltas = DELTAS[direction]
    row  += deltas[0]
    col += deltas[1]
    if (counter >= input){
      return [row, col]
    }
  }

  let nextSteps = steps
  if (iterations % 4 == 0){
    nextSteps += 2
  }
  return solve1(input, counter, row, col, nextSteps, NEXT_DIRECTION[direction], iterations + 1)
}

function calculateDistance(data, startPoint){
  return Math.abs(data[0]) + Math.abs(data[1]);
}


const res1 = solve1(input, 1, 0, 0, 2, "right", 1);
console.log(calculateDistance(res1));


// Solve task 2
let memo = {
  0: {
    0: 1
  }
}

function calculateAdjacentSum(row,col, matrix){
  sum = 0;
  matrix[row] && matrix[row][col+1] ? sum += matrix[row][col+1] : ''
  matrix[row-1] && matrix[row-1][col+1] ? sum += matrix[row-1][col+1] : ''
  matrix[row-1] && matrix[row-1][col] ? sum += matrix[row-1][col] : ''
  matrix[row-1] && matrix[row-1][col-1] ? sum += matrix[row-1][col-1] : ''
  matrix[row] && matrix[row][col-1] ? sum += matrix[row][col-1] : ''
  matrix[row+1] && matrix[row+1][col-1] ? sum += matrix[row+1][col-1] : ''
  matrix[row+1] && matrix[row+1][col] ? sum += matrix[row+1][col] : ''
  matrix[row+1] && matrix[row+1][col+1] ? sum += matrix[row+1][col+1] : ''

  return sum;
}

function updateMemo(row, col, value){
  if (!memo[row]){
    memo[row] = {}
  }
  memo[row][col] = value;

}

function solve2(input, count, r, c, steps, direction, iterations){
  let counter = count;
  let nrSteps = steps;
  let row = r;
  let col = c;

  if (direction === "up" || direction === "right"){
    nrSteps = nrSteps - 1;
  }

  for (var i = 0; i < nrSteps; i++){
    counter += 1;

    const deltas = DELTAS[direction]
    row  += deltas[0]
    col += deltas[1]

    let adjacentSum = calculateAdjacentSum(row, col, memo)
    updateMemo(row, col, adjacentSum)
    if (adjacentSum >= input){
      return adjacentSum
    }
  }

  let nextSteps = steps
  if (iterations % 4 == 0){
    nextSteps += 2
  }
  return solve2(input, counter, row, col, nextSteps, NEXT_DIRECTION[direction], iterations + 1)
}


const res2 = solve2(input, 1, 0, 0, 2, "right", 1);
console.log(res2);



