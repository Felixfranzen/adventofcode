const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((arr) => arr.split("").map((n) => parseInt(n)));

const adjacentPoints = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const riskLevels = [];
for (const rowIndexString in input) {
  const rowIndex = parseInt(rowIndexString);
  for (const colIndexString in input[rowIndex]) {
    const colIndex = parseInt(colIndexString);

    const point = input[rowIndex][colIndex];

    const isLowPoint = adjacentPoints.every(([x, y]) => {
      const adjacentPoint =
        input[rowIndex + x] && input[rowIndex + x][colIndex + y];
      return adjacentPoint === undefined || adjacentPoint > point;
    });

    if (isLowPoint) {
      riskLevels.push(1 + point);
    }
  }
}

const result = riskLevels.reduce((acc, next) => acc + next, 0);
console.log(result);
