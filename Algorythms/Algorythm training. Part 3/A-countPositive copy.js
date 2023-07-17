const fs = require('fs');

fs.readFile('input.txt', 'utf8', (data) => {
  
  const lines = data.trim().split('\n');
  
  const n = parseInt(lines[0]);
  const numbers = lines[1].split(' ').map(Number);
  
  const q = parseInt(lines[2]);
  const requests = [];

  for (let i = 3; i < lines.length; i++) {
    requests.push(lines[i].split(' ').map(Number));
  }
  
  const positiveSums = [];
  let currentSum = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      currentSum++;
    }
    positiveSums.push(currentSum);
  }
  
  const results = [];
  
  for (let i = 0; i < requests.length; i++) {
    const [l, r] = requests[i];
    
    let count = positiveSums[r - 1] - (l > 1 ? positiveSums[l - 2] : 0);
    
    results.push(count);
  }

  fs.writeFile('output.txt', results.join('\n'));

});