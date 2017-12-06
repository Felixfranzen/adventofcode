const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n").map((line) => line.split(" "));

const res1 = input.reduce((sum, line) => {
  let memo = {}
  let isUnique = true
  line.forEach((element) => {
    if (memo[element]){
      isUnique = false
      return
    }

    memo[element] = true
  })

  if (isUnique){
    return sum + 1;
  }

  return sum

}, 0);

console.log(res1);