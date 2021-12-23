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



