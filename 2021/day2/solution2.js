const fs = require("fs");

const [_, horizontal, depth] = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .map((row) => row.split(" "))
  .map(([action, val]) => [action, parseInt(val)])
  .reduce(
    ([aim, horizontal, depth], [action, value]) => {
      switch (action) {
        case "forward":
          return [aim, horizontal + value, depth + aim * value];
        case "down":
          return [aim + value, horizontal, depth];
        case "up":
          return [aim - value, horizontal, depth];
      }
    },
    [0, 0, 0]
  );

console.log(horizontal * depth);
