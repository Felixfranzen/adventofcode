const input = PUZZLE_INPUT.split("\n").map((n) => parseInt(n));

// Solve task 2 (the first solution is pretty much identical)
function solve2(input){
  let index = 0;
  let stepCounter = 0;
  while (index < input.length){
    let amountOfSteps = input[index];
    input[index] += amountOfSteps > 2 ? -1 : 1
    index += amountOfSteps

    stepCounter += 1;
  }

  return stepCounter
}

console.log(solve1(input));