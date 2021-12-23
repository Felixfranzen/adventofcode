const fs = require('fs');
const solution1 = require('./aoc1');
const input = fs.readFileSync('./input.txt', 'utf8').split('-').map(i => parseInt(i));

console.log('--- DAY 4 ---');
console.log(`PART 1: ${solution1(input)}`)