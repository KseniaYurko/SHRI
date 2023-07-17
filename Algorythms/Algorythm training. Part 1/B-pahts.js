const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

let line = fileContent.trim() + '/';
// let symbols = line.split('');
// console.log('symb', symbols)
let flag = true;

while (flag) {
    if(line.includes('//')){
        line = line.replace('//', '/');
    } else if (line.includes('/./')) {
        line = line.replace('/./', '/');
    } else if (line.includes('/../')) {
        position = line.indexOf('/../');
        if(position === 0){
            path = path.slice(3);
        } else {
            prevslashpos = line.substring(0, position - 1).lastIndexOf('/');
            line = line.slice(0, prevslashpos) + line.slice(position + 3);
        }
    } else {
        flag = false;
    }
}

if (line.endsWith('/') && line != '/') {
    line = line.slice(0, -1);
}




// if(symbols[symbols.length - 1] == '/'){
//     symbols.pop('/');
//     if(symbols[symbols.length - 1] == '.' && symbols[symbols.length - 2] == '.'){
//         symbols.splice(symbols.length - 2, 2);
//     }
// }

// for(let i = 0; i < symbols.length - 1; i++){
//     if(symbols[i] == '/' && symbols[i + 1] == '/'){
//         symbols.splice(i, 1);
//     }
// }

// console.log(symbols);
// let result = symbols.join('');

fs.writeFileSync("output.txt", line.toString())
