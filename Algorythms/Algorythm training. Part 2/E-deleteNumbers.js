const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
const n = +(values[0].trim());
let numbers = values[1].trim().split(' ').map(Number);

dict = {};
for(let i = 0; i < n; i++){
    let num = numbers[i];
    if(num in dict){
        dict[num] += 1;
    } else {
        dict[num] = 1;
    } 
}

let max = 0;
let nums = [];

for(num in dict){
    if(dict[num] > max){
        nums.push(num);
    }
}
let maxCount = dict[nums[0]];

for(let i = 0; i < nums.length - 1; i++){
    let currentCount = dict[nums[i]] + dict[nums[i + 1]];
    let difference = Math.abs(+nums[i] - +nums[i + 1]);

    if(currentCount > maxCount && difference <= 1){
        maxCount = dict[nums[i]] + dict[nums[i + 1]];
    }
}

result = n - maxCount;

fs.writeFileSync("output.txt", result.toString());