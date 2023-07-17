const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
let n = +values[0]
let ages = values[1].trim().split(' ').map(Number);

const dict = {};

for(let i = 0; i < n; i++){
    let age = ages[i];
    if(!dict[age]){
        +dict[age];
        dict[age] = 1;
    } else {
        dict[age]++;
    }
}

newAges = Object.entries(dict);

let count = 0;
if(newAges.length == 1){
    if(!(newAges[0][0] <= 0.5* newAges[0][0] + 7)){
        count = +newAges[0][1] * (+newAges[0][1] - 1);
    }
} else {

    for (let i = newAges.length - 1; i > 0 ; i--) {
        let age_x = +newAges[i][0];
        for (let j = i; j >= 0; j--) {
            let age_y = +newAges[j][0];
            let currAgeCount = newAges[j][1];
            let currcount = 0;
            
            if(age_x == age_y && !(age_y <= 0.5 * age_x + 7) && currAgeCount>1) {
                    currcount += currAgeCount - 1;
            } else if (
                age_x != age_y &&
                !(age_y <= 0.5 * age_x + 7) &&
                !(age_y > age_x) &&
                !(age_y > 100 && age_x < 100)
            ) {
                currcount += currAgeCount;
            }
            count += currcount * newAges[i][1]
        }
    }
}

let result = count.toString();

fs.writeFileSync("output.txt", result)