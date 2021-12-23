const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split('\n').map(i => parseInt(i));
const solution1 = require('./aoc1');
const solution2 = require('./aoc2');

console.log('--- DAY 1 ---');
console.log(`PART 1: ${solution1(input)}`)
console.log(`PART 2: ${solution2(input)}`)