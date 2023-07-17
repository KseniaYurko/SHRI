const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

let s = fileContent.trim().toString().split('');
count = 0;
sticks = {};

for(let i = 1; i < s.length; i +=2){
    let stick = s[i];
    let color = s[i-1]
    if(stick in sticks){
        sticks[stick] += color
    } else {
        sticks[stick] = color;
    }
}

for(stick in sticks){
    if(sticks[stick].includes('R') && sticks[stick].includes('G') && sticks[stick].includes('B')){
        count += 1;
    }
}

// console.log(sticks)
// console.log(count);

let result = count;

fs.writeFileSync("output.txt", result.toString())