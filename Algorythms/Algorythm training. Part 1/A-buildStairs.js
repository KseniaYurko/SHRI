const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const n = fileContent.toString()

function buildStairs(n) {
    let i = 1;
    let currentBlock = 1; 

    while(n >= i) {
        // console.log('', (n - check) / i);
        // console.log(1 + i);
        

        currentBlock = 1 + (i - 1) //арифм прогрессия
        // console.log(`current block (${i}): `, currentBlock)

        n -= currentBlock; 
        i++;
        
    }
    // console.log('final result', i - 1);
    return i - 1;
}

let result = buildStairs(n);

fs.writeFileSync("output.txt", result.toString())