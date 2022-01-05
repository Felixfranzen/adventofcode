const fs = require("fs");

const weights = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((arr) => arr.split("").map((n) => parseInt(n)));

const key = ([row, col]) => `${row},${col}`;

const h = ([currentRow, currentCol]) => {
  const rowDest = weights.length - 1;
  const colDest = weights.length - 1;
  return Math.abs(currentRow - rowDest) + Math.abs(currentCol - colDest);
};

const getSafe = ([row, col]) => (weights[row] ? weights[row][col] : undefined);

const adjacentCoordinates = (startCoordinate) => {
  const eligibleCoordinates = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
    .map((delta) => [
      startCoordinate[0] + delta[0],
      startCoordinate[1] + delta[1],
    ])
    .filter((co) => getSafe(co) !== undefined);

  return eligibleCoordinates;
};

const findCoordinateWithLowestFscore = (nodes, fscores) => {
  let shortest = { fscore: Infinity, coordinate: null };
  for (const [row, col] of nodes) {
    if (fscores[row][col] < shortest.fscore) {
      shortest = {
        fscore: fscores[row][col],
        coordinate: [parseInt(row), parseInt(col)],
      };
    }
  }
  return shortest;
};

const isEnd = (coordinate) =>
  coordinate[0] === weights.length - 1 &&
  coordinate[1] === weights[0].length - 1;

const solve = () => {
  const gscores = weights.map((row) => row.map(() => Infinity));
  gscores[0][0] = 0;

  const fscores = weights.map((row) => row.map(() => Infinity));
  fscores[0][0] = h([0, 0]);

  let openSet = [[0, 0]];

  while (openSet.length > 0) {
    const current = findCoordinateWithLowestFscore(openSet, fscores);

    if (isEnd(current.coordinate)) {
      return current;
    }

    openSet = openSet.filter((n) => key(n) !== key(current.coordinate));

    for (const [row, col] of adjacentCoordinates(current.coordinate)) {
      const tentativeGscore =
        gscores[current.coordinate[0]][current.coordinate[1]] +
        weights[row][col];

      if (tentativeGscore < gscores[row][col]) {
        gscores[row][col] = tentativeGscore;
        fscores[row][col] = tentativeGscore + h([row, col]);

        if (!openSet.some((n) => key(n) === key([row, col]))) {
          openSet.push([row, col]);
        }
      }
    }
  }
  throw new Error("Nope");
};

console.log(solve());
