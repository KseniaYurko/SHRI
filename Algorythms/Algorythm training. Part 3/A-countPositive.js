const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.toString().replaceAll('\r', '').trim().split('\n');
console.log(values);

let n = +(values[0].trim());
console.log('n', n)

let numbers = (values[1].trim().split(' ').map(Number));
console.log('numbers', numbers);
let k = +(values[2].trim());
console.log('k', k)

let requests = [];

for(let i = 3; i < k + 3; i++){
     
    values[i] = values[i].trim();
    console.log('value i  ', values[i]);
    let l = +(values[i][0]).trim();
    let r = +(values[i][values[i].length - 1]).trim();
    requests.push([l, r]);
}

console.log('requests', requests);

let result = [];

for(let i = 0; i < k; i++){
    let count = 0;
    let l = requests[i][0] - 1;
    let r = requests[i][values[i].length - 1] - 1;
    // console.log('left, right: ', l, r)

        let j = l;
        let counter = 0;
        while(counter < r - l + 1){
            if(numbers[j] > 0){
                count++
                console.log('count: ', count, ';  ', numbers[j] ,'> 0')
            } 
            else {
                console.log('count: ', count, ';  ', numbers[j] ,'< 0')
            }
            counter++;
            j++;    
        }

    result.push(count);
    // console.log(result, '\n\n');
}

result = result.join('\n').trim();
console.log(result);

fs.writeFileSync("output.txt", result)