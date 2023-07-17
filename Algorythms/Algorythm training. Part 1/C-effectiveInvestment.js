const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
let n = +(values[0].trim())
const prices = values[1].trim().split(' ').map(Number);

console.log(prices);
console.log(n);

let bestBuyDay = 0;
let bestSellDay = 0;
let minCostDay = 0;


for(let i = 0; i < n; i++){
    if(prices[bestSellDay] * prices[minCostDay] < prices[bestBuyDay] * prices[i]){
        bestBuyDay = minCostDay;
        bestSellDay = i;
    }
    if (prices[i] < prices[minCostDay]) {
        minCostDay = i;
    }
}

if (bestSellDay === 0 && bestBuyDay === 0) {
    fs.writeFileSync("output.txt", '0 0\n');
} else {
    let result = [bestBuyDay + 1, bestSellDay + 1].join(' ');
    fs.writeFileSync("output.txt", result)
}