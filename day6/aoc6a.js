const puzzle = "5  1 10  0 1 7 13  14  3 12  8 10  7 12  0 6";
const input = puzzle.split(/\s+/g).map((element) => parseInt(element));

let memo = {}

function findLargestIndex(array){
  let max = Math.max(...array);
  let index = array.indexOf(max);
  return index;
}

function solve(input){
  let steps = 1;

  while(true){
    let index = findLargestIndex(input);

    let blocks = input[index];
    input[index] = 0;

    while (blocks > 0){
      index = (index + 1) % input.length
      input[index]++;
      blocks--;
    }

    let key = input.toString();
    if (memo[key]){
      break;
    }

    memo[key] = true;
    steps++;
  }

  return steps;
}

console.log(solve(input));