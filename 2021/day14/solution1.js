const fs = require("fs");

const input = fs.readFileSync("./input").toString().split("\n");
const rawTemplate = input[0].split("");
const pairInsertionRules = input
  .slice(2)
  .map((line) => line.replace(" ", "").replace(" ", "").split("->"))
  .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

const getDifference = (x, y) => Math.abs(x - y);
const range = (start, end) =>
  [...Array(getDifference(start, end)).keys()].map((n) => n + start);

const splitPairs = (template) =>
  template.reduce((pairs, next, index) => {
    if (index === 0) return pairs;
    return [...pairs, [template[index - 1], next]];
  }, []);

const joinPairs = (pairs) => {
  const last = pairs[pairs.length - 1];
  const rest = pairs.slice(0, pairs.length - 1).map(([a, b, _]) => [a, b]);

  return [...rest.flat(), ...last];
};

const lookup = (pair, rules) => [pair[0], rules[pair.join("")], pair[1]];

const countElements = (str) =>
  str
    .split("")
    .reduce(
      (acc, next) =>
        acc[next] ? { ...acc, [next]: acc[next] + 1 } : { ...acc, [next]: 1 },
      {}
    );

const getMinMax = (countMap) => {
  const values = Object.values(countMap);
  return [Math.min(...values), Math.max(...values)];
};

const polymerString = range(0, 10)
  .reduce(
    (acc, _) =>
      joinPairs(
        splitPairs(acc).map((pair) => lookup(pair, pairInsertionRules))
      ),
    rawTemplate
  )
  .join("");

const [smallest, highest] = getMinMax(countElements(polymerString));
const result = highest - smallest;

console.log(result);
