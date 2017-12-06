const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n").map((n) => parseInt(n));

function solve(input){
  let index = 0;
  let stepCounter = 0;
  while (index < input.length){
    let amountOfSteps = input[index];
    input[index] += 1;
    index += amountOfSteps;

    stepCounter += 1;
  }

  return stepCounter
}

console.log(solve(input));