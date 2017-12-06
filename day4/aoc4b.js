const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n").map((line) => line.split(" "));

// from: https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
function compareSets(a, b){
  return a.size === b.size && [...a].every((value) => b.has(value));
}

const res2 = input.reduce((sum, line) => {
  let sets = []
  let isUnique = true;
  line.forEach((element) => {
    let es = new Set(element);
    if (!!sets.find((set) => compareSets(es, set))){
      isUnique = false
      return;
    }
    sets.push(es);
  });

  if (isUnique){
    return sum + 1;
  }

  return sum
}, 0);

console.log(res2);