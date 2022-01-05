const fs = require("fs");

const solution = () => {
  const input = fs
    .readFileSync("./input")
    .toString()
    .split(",")
    .map((n) => parseInt(n));

  const getDifference = (x, y) => Math.abs(x - y);
  const range = (start, end) =>
    [...Array(getDifference(start, end)).keys()].map((n) => n + start);

  const getLeast = (prev, next) => (!prev || next < prev ? next : prev);
  const fuelConsumptionBetween = (startingNumber, destination) =>
    range(startingNumber, destination).reduce(
      (acc, _, index) => acc + index + 1,
      0
    );

  const max = Math.max(...input) + 1;
  const min = Math.min(...input);

  const totalCostMemo = {}; // { [destination]: X }
  const fuelUsageMemo = {}; // { [start, destination]: X }

  return range(min, max).reduce((leastFuelUsage, item) => {
    if (totalCostMemo[item]) {
      return getLeast(leastFuelUsage, totalCostMemo[item]);
    }

    const totalCost = input
      .map((startingNumber) => {
        const memo = fuelUsageMemo[`${startingNumber},${item}`];
        if (memo) {
          return memo;
        }

        const fuelConsumption = fuelConsumptionBetween(startingNumber, item);
        fuelUsageMemo[`${startingNumber},${item}`] = fuelConsumption;
        return fuelConsumption;
      })
      .reduce((acc, next) => acc + next, 0);
    totalCostMemo[item] = totalCost;

    return getLeast(leastFuelUsage, totalCost);
  }, undefined);
};

console.log(solution());
