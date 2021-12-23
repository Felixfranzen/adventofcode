const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n").map((row) => row.split(/\s+/g).map((element) => parseInt(element)));

const result1 = input.reduce((sum, row) => sum + (Math.max(...row) - Math.min(...row)), 0);
console.log(result1)