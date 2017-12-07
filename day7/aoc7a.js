const fs = require("fs");
const rows = fs.readFileSync("./input.txt", "utf8").split("\n").map((row) => row.split("->"));

let input = {}

rows.forEach((row) => {
  // Is leaf node
  if (row.length == 1){
    return
  }

  let parent = row[0].split(" ")[0];
  let children = row[1].replace(" ","").split(",");

  children.forEach((child) => {
    input[child.trim()] = parent;
  });
});

function solve(parent, input){
  let newParent = input[parent]
  if (!newParent){
      return parent
  }
  return solve(newParent, input);
}

console.log(solve(Object.keys(input)[0], input));