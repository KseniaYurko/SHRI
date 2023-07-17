const fs = require('fs')
let fileContent = fs.readFileSync("input.txt", "utf8");

const values = fileContent.trim().split('\n');
const dictionary = values[0].trim().split(' ');
let words = values[1].trim().split(' ');

const dictionaryHash = {};

for (const word of dictionary) {
  const firstLetter = word[0];
  if (!dictionaryHash[firstLetter]) {
    dictionaryHash[firstLetter] = [];
  }
  dictionaryHash[firstLetter].push(word);
}

const shortenedWords = words.map((word) => {
    const firstLetter = word[0];
    if (dictionaryHash[firstLetter]){
        const potentialShortenings = dictionaryHash[firstLetter].filter((dictWord) => word.startsWith(dictWord));
        if(potentialShortenings.length > 0) {
            return potentialShortenings.reduce((shortest, current) => (current.length < shortest.length ? current : shortest));
        }
    }
    return word;
});

let result =  shortenedWords.join(' ');

fs.writeFileSync("output.txt", result)