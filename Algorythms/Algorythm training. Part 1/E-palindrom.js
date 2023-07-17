const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const line = fileContent.toString();
console.log(line);



let result = line;

fs.writeFileSync("output.txt", result.toString())