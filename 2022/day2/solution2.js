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

// X means you need to lose,
// Y means you need to end the round in a draw
// Z means you need to win

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

const loseMap = {
  A: "Z",
  B: "X",
  C: "Y",
};

const scoreMap = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcomeMap = {
  X: loseMap,
  Y: drawMap,
  Z: winningMap,
};

let score = 0;
for (const row of input) {
  const elf = row[0];
  const outcome = row[1];
  const myMove = outcomeMap[outcome][elf];
  switch (outcome) {
    case "X":
      score += scoreMap[myMove];
      break;
    case "Y":
      score += scoreMap[myMove] + 3;
      break;
    case "Z":
      score += scoreMap[myMove] + 6;
      break;
  }
}

console.log(score);
