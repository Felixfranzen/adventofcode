const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split(",")
  .map((n) => parseInt(n));

const count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for (const n of input) {
  count[n]++;
}

let day = 0;
while (day < 256) {
  const before0 = count[0];
  count[0] = count[1];
  count[1] = count[2];
  count[2] = count[3];
  count[3] = count[4];
  count[4] = count[5];
  count[5] = count[6];
  count[6] = count[7] + before0;
  count[7] = count[8];
  count[8] = before0;
  day++;
}
const result = count.reduce((acc, next) => acc + next, 0);

console.log(result);
