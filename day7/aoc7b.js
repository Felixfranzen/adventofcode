const fs = require("fs");
const rows = fs.readFileSync("./input.txt", "utf8").split("\n").map((row) => row.split("->"));

let input = {}

rows.forEach((row) => {
  let parentArr = row[0].split(" ")
  let children = row[1] && row[1].replace(" ","").split(",").map((child) => child.trim());

  let parent = {
    key: parentArr[0].trim(),
    weight: parseInt(parentArr[1].replace("(", "").replace(")","")),
    children: children || []
  }

  input[parentArr[0]] = parent
});

function findUnique(sums){
  let set = new Set(sums);
  let unique;
  set.forEach((element) => {
    let count = 0;
    sums.forEach((sum) => {
      if (sum == element){
        count += 1;
      }
    });

    if (count === 1){
      unique = element;
    }
  });

  return sums.indexOf(unique);
}

function findSum(parent, input){
  let sum = parent.weight;
  parent.children.forEach((child) => {
    sum += findSum(input[child], input);
  });

  return sum;
}

function solve(parent, input){
  let sums = []
  parent.children.forEach((child) => {
    sums.push(findSum(input[child], input));
  });

  let difference = (Math.max(...sums) - Math.min(...sums));
  if (difference > 0){
    let index = findUnique(sums);
    let next = input[parent.children[index]]
    let found = solve(next, input);
    if (found){
      console.log(next.weight - difference)
    }
  } else {
    return true;
  }
}

// 'mxke' is the root node accuired from A
solve(input.mkxke, input);