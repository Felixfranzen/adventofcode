const fs = require("fs");
const input = fs.readFileSync("./input").toString().split("");

const isUnique = (chars) => {
  const unique = new Set(chars);
  return unique.size === chars.length;
};

const solve = (input, size) =>
  input.reduce(
    (acc, next, index) => {
      if (index < size || acc.result != null) {
        return acc;
      }

      const [_, ...withoutFirst] = acc.window;
      const updatedWindow = withoutFirst.concat(next);
      return isUnique(updatedWindow)
        ? { window: updatedWindow, result: index + 1 }
        : { window: updatedWindow, result: null };
    },
    { window: input.slice(0, size), result: null }
  );

console.log(solve(input, 4));
