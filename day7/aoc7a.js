const fs = require("fs");
const rows = fs.readFileSync("./input.txt", "utf8").split("\n").map((row) => row.split("->")).filter((row) => row.length > 1);

let input = {}

rows.forEach((row) => {
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