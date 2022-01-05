const fs = require("fs");
const { Set } = require("immutable");

const inputFile = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) => row.split("|"))
  .map(([input, output]) => ({
    input: input
      .split(" ")
      .filter((n) => !!n)
      .map((val) => [...val.split("")].sort().join("")),
    output: output
      .split(" ")
      .filter((n) => !!n)
      .map((val) => [...val.split("")].sort().join("")),
  }));

const createUniqueTranslation = (input) =>
  input
    .filter((entry) => [2, 3, 4, 7].includes(entry.length))
    .reduce((translations, next) => {
      switch (next.length) {
        case 2:
          return { ...translations, one: Set(next) };
        case 3:
          return { ...translations, seven: Set(next) };
        case 4:
          return { ...translations, four: Set(next) };
        case 7:
          return { ...translations, eight: Set(next) };
      }
    }, {});

const solveFiveSegments = (pattern, { seven, four, one }) => {
  if (pattern.isSuperset(seven)) return 3;
  if (pattern.isSuperset(four.subtract(one))) return 5;
  return 2;
};

const solveSixSegments = (pattern, { seven, four }) => {
  if (!pattern.isSuperset(seven)) return 6;
  if (pattern.isSuperset(four)) return 9;
  return 0;
};

const createTranslations = (input, uniqueTranslations) => {
  return input.reduce((translations, pattern) => {
    const patternSet = Set(pattern);
    switch (pattern.length) {
      case 2:
        return { ...translations, [pattern]: 1 };
      case 3:
        return { ...translations, [pattern]: 7 };
      case 4:
        return { ...translations, [pattern]: 4 };
      case 7:
        return { ...translations, [pattern]: 8 };
      case 5:
        return {
          ...translations,
          [pattern]: solveFiveSegments(patternSet, uniqueTranslations),
        };
      case 6:
        return {
          ...translations,
          [pattern]: solveSixSegments(patternSet, uniqueTranslations),
        };
      default:
        return translations;
    }
  }, {});
};

const decodeOutput = (key, output) =>
  parseInt(output.map((value) => key[value]).join(""));

const result = inputFile
  .map(({ input, output }) => {
    const uniqueTranslations = createUniqueTranslation(input);
    const translations = createTranslations(input, uniqueTranslations);
    return decodeOutput(translations, output);
  })
  .reduce((acc, next) => acc + next, 0);

console.log(result);
