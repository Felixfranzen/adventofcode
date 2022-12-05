const fs = require("fs");
const { Set } = require("immutable");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) => row.split(""));

const isUpperCase = (str) => str.toUpperCase() === str;

const getScore = (str) =>
  isUpperCase(str) ? str.charCodeAt() - 38 : str.charCodeAt() - 96;

const solveRow = (row) => {
  const halfIndex = Math.min(row.length / 2);
  const divided = [row.slice(0, halfIndex), row.slice(halfIndex, row.length)];
  return Set(divided[0]).intersect(Set(divided[1])).toArray()[0];
};

const result = input.reduce((score, row) => score + getScore(solveRow(row)), 0);
console.log(result);
