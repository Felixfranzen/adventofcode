const fs = require("fs");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n\n")
  .map((group) => group.split("\n"))
  .map((group) => group.map((n) => parseInt(n)));

const result = input
  .map((group) => group.reduce((sum, n) => sum + n, 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((sum, n) => sum + n, 0);

console.log(result);
