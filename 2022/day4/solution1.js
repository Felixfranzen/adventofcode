const fs = require("fs");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) =>
    row.split(",").map((pair) => pair.split("-").map((n) => parseInt(n)))
  );

const result = input.filter(
  (row) =>
    (row[0][0] <= row[1][0] && row[0][1] >= row[1][1]) ||
    (row[1][0] <= row[0][0] && row[1][1] >= row[0][1])
).length;

console.log(result);
