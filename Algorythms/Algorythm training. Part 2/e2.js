const fs = require('fs');
const fileContent = fs.readFileSync('input.txt', 'utf8');

const values = fileContent.trim().split('\n');
const n = +(values[0].trim());
let numbers = values[1].trim().split(' ').map(Number);
numbers.sort((a, b) => a - b);

let maxCount = 0;

for (let i = 0; i < n - 1; i++) {
  let currentCount = 1;
  let difference = numbers[i + 1] - numbers[i];

  if (difference <= 1) {
    currentCount++;
    let j = i + 2;
    while (j < n && numbers[j] - numbers[j - 1] <= 1) {
      currentCount++;
      j++;
    }
  }

  maxCount = Math.max(maxCount, currentCount);
}

const result = n - maxCount;
console.log(result)
fs.writeFileSync('output.txt', result.toString());
