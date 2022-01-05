const fs = require("fs");

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((arr) => arr.split(""));

const peak = (stack) => stack[stack.length - 1];
const closingToOpeningMap = {
  "]": "[",
  "}": "{",
  ")": "(",
  ">": "<",
};

const failedChars = [];

for (const row of input) {
  const stack = [];
  try {
    for (const char of row) {
      const isClosingBracket = !!closingToOpeningMap[char];
      const latestPushedOpeningBracket = peak(stack);

      if (isClosingBracket) {
        if (latestPushedOpeningBracket != closingToOpeningMap[char]) {
          failedChars.push(char);
          throw new Error("woops");
        } else {
          stack.pop();
        }
      } else {
        stack.push(char);
      }
    }
  } catch (e) {}
}
const result = failedChars.reduce((acc, next) => {
  switch (next) {
    case ")":
      return acc + 3;
    case "]":
      return acc + 57;
    case "}":
      return acc + 1197;
    case ">":
      return acc + 25137;
  }
}, 0);

console.log(result);
