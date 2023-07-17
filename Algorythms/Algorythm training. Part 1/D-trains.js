const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
const n = +(values[0].trim());
let times = values[1].split(' ');

// console.log(times);

let mins = [];

function timeToNum(time){
    let value = +(time[0] + time[1]) * 60 + +(time[3] + time[4]);
    if(value == 0){
        return 1440;
    } else {
        return value;
    }
}

for(let i = 0; i < n; i++){
    mins.push(timeToNum(times[i]))
}
mins.sort((a, b) => a - b);

minDifference = 1440 + mins[0] - mins[mins.length - 1];
// console.log(minDifference);

for(let i = 1; i < n; i++){
    minDifference = Math.min(minDifference, mins[i] - mins[i - 1]);
}

let result = minDifference;

fs.writeFileSync("output.txt", result.toString())