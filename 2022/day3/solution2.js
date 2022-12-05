const fs = require("fs");
const { Set } = require("immutable");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const chunk = (size) => (groups, row, index) =>
  index % size === 0
    ? [...groups, [row]]
    : [
        ...groups.slice(0, groups.length - 1),
        groups.slice(-1)[0].concat([row]),
      ];

const isUpperCase = (str) => str.toUpperCase() === str;

const getScore = (str) =>
  isUpperCase(str) ? str.charCodeAt() - 38 : str.charCodeAt() - 96;

const solveGroup = (rows) =>
  Set(rows[0])
    .intersect(Set(rows[1]).intersect(Set(rows[2])))
    .toArray()[0];

const chunkByThree = chunk(3);

const result = input
  .reduce((group, row, index) => chunkByThree(group, row, index), [])
  .reduce((score, group) => score + getScore(solveGroup(group)), 0);

console.log(result);
