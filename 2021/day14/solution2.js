const fs = require("fs");
const { Set } = require("immutable");

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

const pairMap = Object.keys(pairInsertionRules).reduce(
  (acc, next) => ({ ...acc, [next]: 0 }),
  {}
);

const elementMap = Set(
  Object.keys(pairMap)
    .map((el) => el.split(""))
    .flat()
)
  .toArray()
  .reduce((acc, next) => ({ ...acc, [next]: 0 }), {});

splitPairs(rawTemplate).forEach((pair) => {
  const key = pair.join("");
  pairMap[key] = pairMap[key] ? pairMap[key] + 1 : 1;
});

rawTemplate.forEach((el) => {
  elementMap[el] += 1;
});

const result = range(0, 40).reduce(
  ([rawPairs, elements], _) => {
    const newPairs = Object.keys(rawPairs).reduce(
      (acc, p) => ({ ...acc, [p]: 0 }),
      {}
    );

    const newElements = { ...elements };

    const includedPairs = Object.entries(rawPairs)
      .filter(([_, value]) => value > 0)
      .map(([key, _]) => key);

    for (const pair of includedPairs) {
      const matchingChar = pairInsertionRules[pair];

      const [firstChar, secondChar] = pair.split("");
      const firstKey = `${firstChar}${matchingChar}`;
      const secondKey = `${matchingChar}${secondChar}`;

      newPairs[firstKey] += rawPairs[pair];
      newPairs[secondKey] += rawPairs[pair];

      newElements[matchingChar] += rawPairs[pair];
    }

    return [newPairs, newElements];
  },
  [pairMap, elementMap]
);

const getMinMax = (countMap) => {
  const values = Object.values(countMap);
  return [Math.min(...values), Math.max(...values)];
};

const [min, max] = getMinMax(result[1]);

console.log(max - min);
