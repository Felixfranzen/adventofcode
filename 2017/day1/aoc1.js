const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("").map((i) => parseInt(i));
const match = input.length / 2;

// Solve task 2
function solve(input){
  var sum = 0;
  for (var i = 0; i < input.length - 1; i++) {
    const element = input[i]
    const hasMatch = (i + match) < input.length ? input[i + match] === element : input[(match - (input.length - i))] === element
    if (hasMatch){
      sum += element
    }
  }
  return sum;
}

console.log(solve(input));