const fs = require("fs");
const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) => row.split(" "));

// A: rock
// B: paper
// C: scisscors

// X: rock
// Y: paper
// Z: scisscors

// lost: 0 points
// draw: 3 points
// win: 6 point

const winningMap = {
  A: "Y",
  B: "Z",
  C: "X",
};

const drawMap = {
  A: "X",
  B: "Y",
  C: "Z",
};

const scoreMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

let score = 0;
for (const row of input) {
  const elf = row[0];
  const me = row[1];
  if (winningMap[elf] === me) {
    score += scoreMap[me] + 6;
  } else if (drawMap[elf] === me) {
    score += scoreMap[me] + 3;
  } else {
    score += scoreMap[me];
  }
}

console.log(score);
