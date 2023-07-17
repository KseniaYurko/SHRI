const fs = require('fs')
let fileContent = fs.readFileSync('input.txt', 'utf8');
const values = fileContent.trim().split('\n');
console.log(values);

const data = values[0].trim().split(' ').map(Number);
const n = data[0];
const k = data[1];

lampCounts = [];

for(let i = 1; i < k + 1; i++){
    lampCounts.push(+values[i].trim())
}
// lampCounts.sort((a, b) => b - a);

console.log(n, k);
console.log('count lamps', lampCounts);

function summ(array){
    let sum = 0;
    for(let i = 0; i < lampCounts.length; i++){
        sum += lampCounts[i];
    }
    return sum;
}


let left = 0;
let right = lamps.reduce((sum, count) => sum + count);
let result = 0;
let garlands = [];

while(left <= right){
    let mid = Math.floor((left + right) / 2);
    let count = 0;
    let tempGarlands = [];

    for(let i = 0; i < k; i++){
        let garlandCount = Math.floor(lamps[i] / mid);
        count += garlandCount;

        for(let j = 0; j < garlandCount; j++){
            tempGarlands.push(i + 1);
        }
    }

    if (count >= n){
        left = mid + 1;
        result = count;
        garlands = tempGarlands;
    } else {
        right = mid - 1;
    }

}

console.log(result, garlands.slice(0, n))








// console.log(sum)

// let sum = summ(lampCounts);
// let variations = [];
// while(sum >= n) {
//     let current = [];
    
//     for(let i = 0; i < n; i++){
        
//         let maxIndex = lampCounts.indexOf( Math.max.apply(null, lampCounts));
//         // let count = 0;
//         // while(lampCounts[maxIndex + 1] == lampCounts[maxIndex]){
//         //     count++
//         // }

//         lampCounts[maxIndex -count] -= 1;
//         current.push(maxIndex + 1);
//         // console.log(lampCounts[maxIndex]);
//         sum = summ(lampCounts); 
//         console.log(lampCounts);
//     }
    
//     console.log('current', current)
//     variations.push(current);
    
// }

// console.log(variations);


const result1 = "";
fs.writeFileSync('output.txt', result1);