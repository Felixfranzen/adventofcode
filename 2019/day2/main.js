const fs = require('fs');
const solution1 = require('./aoc1');

const input = fs.readFileSync('./input.txt', 'utf8').split(',').map(i => parseInt(i));
input[1] = 12;
input[2] = 2;

console.log('--- DAY 2 ---');
console.log(`PART 1: ${solution1(input)}`)