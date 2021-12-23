const fs = require("fs");
const rows = fs.readFileSync("./input.txt", "utf8").split("\n")

let input = []
/*
[{
  variable: 'b'
  action: 'inc'
  value: 5
  expression: 'a > 1'
}
...
]
*/

let variables = {}

rows.forEach((row) => {
  let rowObj = {}
  row = row.split("if").map((element) => element.trim());
  rowObj.expression = `variables.${row[1][0]}` + row[1].slice(1, row[1].length);

  let action = row[0].split(" ").map((element) => element.trim());
  rowObj.variable = action[0];
  rowObj.action = action[1];
  rowObj.value = parseInt(action[2]);

  input.push(rowObj);
  variables[rowObj.variable] = 0;
});

function runAction(variable, action, value){
  switch (action) {
    case "inc":
      return variables[variable] += value
      break;

    case "dec":
      return variables[variable] -= value
      break;
  }
}

function solve(input){
  input.forEach((row) => {
    if (eval(row.expression)){
      runAction(row.variable, row.action, row.value);
    }
  });
}

solve(input);
const log = Object.keys(variables).map((key) => variables[key]);
console.log(Math.max(...log));