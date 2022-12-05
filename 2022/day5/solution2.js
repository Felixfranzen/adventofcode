const fs = require("fs");
const input = fs.readFileSync("./input").toString().split("\n");
const stackRows = input.slice(0, 8).map((row) => row.split(" "));
const stacks = stackRows[0].map(() => []);

for (const row of stackRows.reverse()) {
  for (const index in row) {
    if (row[index] !== "[x]") {
      stacks[index].push(row[index]);
    }
  }
}

const commands = input
  .slice(10)
  .map((expression) => expression.split(" "))
  .map(([_, count, __, source, ___, destination]) => ({
    count: parseInt(count),
    source: parseInt(source - 1),
    destination: parseInt(destination - 1),
  }));

for (const command of commands) {
  const toMove = [];
  for (let i = 0; i < command.count; i++) {
    toMove.push(stacks[command.source].pop());
  }
  stacks[command.destination].push(...toMove.reverse());
}

let code = "";
for (const stack of stacks) {
  const top = stack[stack.length - 1];
  code += top.replace("[", "").replace("]", "");
}

console.log(code);
