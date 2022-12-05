const fs = require("fs");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) =>
    row.split(",").map((pair) => pair.split("-").map((n) => parseInt(n)))
  );

const isLeftSide = (row) =>
  (row[1][1] >= row[0][0] && row[1][0] <= row[0][0]) ||
  (row[0][0] >= row[1][1] && row[0][0] <= row[1][0]);

const isContained = (row) =>
  (row[0][0] <= row[1][0] && row[0][1] >= row[1][1]) ||
  (row[1][0] <= row[0][0] && row[1][1] >= row[0][1]);

const isRightSide = (row) =>
  (row[1][1] >= row[0][1] && row[1][0] <= row[0][1]) ||
  (row[0][1] >= row[1][1] && row[0][1] <= row[1][0]);

const result = input.filter(
  (row) => isLeftSide(row) || isContained(row) || isRightSide(row)
).length;

console.log(result);
