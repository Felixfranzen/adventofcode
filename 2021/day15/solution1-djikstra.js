const fs = require("fs");

const weights = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((arr) => arr.split("").map((n) => parseInt(n)));

const key = ([row, col]) => `${row},${col}`;

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

const findShortest = (nodes, distances) => {
  let shortest = { value: Infinity, coordinate: null };
  for (const [row, col] of nodes) {
    if (distances[row][col] < shortest.value) {
      shortest = {
        value: distances[row][col],
        coordinate: [parseInt(row), parseInt(col)],
      };
    }
  }
  return shortest;
};

const isEnd = (coordinate) =>
  coordinate[0] === weights.length - 1 &&
  coordinate[1] === weights[0].length - 1;

const traceback = (parents) => {
  const nodes = [];
  let next = [weights.length - 1, weights[0].length - 1];
  while (next) {
    nodes.push(next);
    next = parents[next];
  }
  return nodes.reverse();
};

const solve = () => {
  const distances = weights.map((row) => row.map(() => Infinity));
  distances[0][0] = 0;

  let nodes = weights
    .map((row, rowIndex) => row.map((col, colIndex) => [rowIndex, colIndex]))
    .flat();

  const parents = {};

  let node = findShortest(nodes, distances);
  while (node) {
    if (isEnd(node.coordinate)) {
      return [node, traceback(parents)];
    }

    nodes = nodes.filter((n) => key(n) !== key(node.coordinate));

    const adjacent = adjacentCoordinates(node.coordinate);
    for (const [row, col] of adjacent) {
      const newDistance = node.value + weights[row][col];
      if (
        distances[row][col] === Infinity ||
        distances[row][col] > newDistance
      ) {
        distances[row][col] = newDistance;
        parents[[row, col]] = node.coordinate;
      }
    }
    node = findShortest(nodes, distances);
  }
};

console.log(solve());
