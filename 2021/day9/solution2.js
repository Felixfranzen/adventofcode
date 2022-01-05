const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((arr) => arr.split("").map((n) => parseInt(n)));

const getSafe = ([row, col]) => (input[row] ? input[row][col] : undefined);

const traverseBasin = (startCoordinate, visistedCoordinates) => {
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
    .filter((co) => !visistedCoordinates[co])
    .filter((co) => getSafe(co) < 9);

  let basin = { [startCoordinate]: true, ...visistedCoordinates };
  for (const adjacentCoordinate of eligibleCoordinates) {
    const result = traverseBasin(adjacentCoordinate, basin);
    basin = { ...basin, ...result };
  }

  return basin;
};

let visistedBasinCoordinates = {};
const basins = [];

for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
  for (let colIndex = 0; colIndex < input[rowIndex].length; colIndex++) {
    if (
      visistedBasinCoordinates[[rowIndex, colIndex]] ||
      getSafe([rowIndex, colIndex]) === 9
    )
      continue;

    const coordinates = traverseBasin([rowIndex, colIndex], {});

    basins.push(Object.keys(coordinates));

    visistedBasinCoordinates = {
      ...visistedBasinCoordinates,
      ...coordinates,
    };
  }
}

const result = basins
  .sort((a, b) => (a.length > b.length ? -1 : 1))
  .slice(0, 3)
  .map((basin) => basin.length)
  .reduce((acc, basinSize) => acc * basinSize, 1);

console.log(result);
