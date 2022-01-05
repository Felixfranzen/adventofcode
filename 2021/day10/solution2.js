const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((arr) => arr.split(""));

const peek = (stack) => stack[stack.length - 1];

const closingToOpeningMap = {
  "]": "[",
  "}": "{",
  ")": "(",
  ">": "<",
};

const scoreMap = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const ascending = (a, b) => (a < b ? -1 : 1);

const isIncompleteLine = (line) => {
  const stack = [];
  for (const char of line) {
    const isClosingCharacter = !!closingToOpeningMap[char];
    const latest = peek(stack);
    if (isClosingCharacter) {
      if (latest != closingToOpeningMap[char]) return false;
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.length > 0;
};

const getLeftOverStack = (line) => {
  const stack = [];
  for (const char of line) {
    if (!!closingToOpeningMap[char]) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return stack;
};

const scores = input
  .filter((line) => isIncompleteLine(line))
  .map((line) => getLeftOverStack(line))
  .map((line) =>
    line.reduceRight((score, next) => score * 5 + scoreMap[next], 0)
  )
  .sort(ascending);

const result = scores[Math.floor(scores.length / 2)];
console.log(result);
