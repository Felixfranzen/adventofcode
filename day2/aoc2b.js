const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n").map((row) => row.split(/\s+/g).map((element) => parseInt(element)));

const result2 = input.reduce((sum, row) => {
  for (let i = 0; i < row.length; i++){
    for (let k = 0; k < row.length; k++){
      let first = row[i];
      let second = row[k];

      if ((first != second) && ((first % second) == 0)){
        return sum + first / second;
      }
    }
  }

}, 0);

console.log(result2)

