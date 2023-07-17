const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
// console.log(values)
val = values[0].trim().split(' ');
// console.log(val)
let n = +(val[0].trim())
let k = +(val[1].trim())

const numbers = values[1].trim().split(' ').map(Number);
// console.log(n, k, numbers);
let result = 'NO'
const numCount = {};

for (let i = 0; i < n; i++) {
  const num = numbers[i];
  if (num in numCount && i - numCount[num] <= k) {
    result = 'YES';
    break;
  }
  numCount[num] = i;
  console.log(numCount)
}

// console.log(result)


fs.writeFileSync("output.txt", result)
