const fs = require("fs");
const input = fs.readFileSync("./input").toString().split("");

const isUnique = (chars) => {
  const unique = new Set(chars);
  return unique.size === chars.length;
};

const lastChars = [];
for (let i = 0; i < 14; i++) {
  lastChars.push(input[i]);
}

if (isUnique(lastChars)) {
  console.log(lastChars.length);
  return;
}

for (let i = 14; i < input.length; i++) {
  lastChars.shift();
  lastChars.push(input[i]);

  if (isUnique(lastChars)) {
    console.log(i + 1);
    break;
  }
}
