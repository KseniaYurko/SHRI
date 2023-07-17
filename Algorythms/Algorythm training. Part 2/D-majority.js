const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
const n = +(values[0].trim());
let numbers = values[1].trim().split(' ').map(Number);
let result = 0;

dict = {};

for(let i = 0; i < n; i++){
    let num = numbers[i];
    if(num in dict){
        dict[num] += 1;
    } else {
        dict[num] = 1;
    } 
}

for(num in dict){
    if(dict[num] >= n/2){
        result = num;
    }
}

fs.writeFileSync("output.txt", result.toString())