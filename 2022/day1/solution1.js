const fs = require("fs");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n\n")
  .map((group) => group.split("\n"))
  .map((group) => group.map((n) => parseInt(n)));

const result = input.reduce((acc, next, index) => {
  const nextSum = next.reduce((sum, n) => sum + n, 0);
  if (!acc || nextSum > acc) return nextSum;
  return acc;
}, null);

console.log(result);
