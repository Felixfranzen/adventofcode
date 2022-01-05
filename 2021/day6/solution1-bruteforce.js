const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split(",")
  .map((n) => parseInt(n));

let day = 0;
let state = input;

while (day < 80) {
  let newJellyfish = [];
  for (const index in state) {
    if (state[index] === 0) {
      state[index] = 6;
      newJellyfish.push(8);
    } else {
      state[index] = state[index] - 1;
    }
  }
  state = state.concat(newJellyfish);
  day++;
}

console.log(state.length);
