const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split(",")
  .map((n) => parseInt(n));

const unique = new Set(input);
let leastFuelUsage;
for (const item of unique) {
  const distances = input.map((i) => Math.abs(i - item));
  const totalFuel = distances.reduce((acc, next) => acc + next, 0);
  if (!leastFuelUsage || totalFuel < leastFuelUsage) {
    leastFuelUsage = totalFuel;
  }
}

console.log(leastFuelUsage);
