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

// https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
function randomProperty(obj) {
  let keys = Object.keys(obj);
  return keys[parseInt(keys.length * Math.random())];
};


function solve(parent, input){
  let newParent = input[parent]
  if (!newParent){
      return parent
  }
  return solve(newParent, input);
}

console.log(solve(randomProperty(input), input));