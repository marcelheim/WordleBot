const fs = require('fs');

const allFileContents = fs.readFileSync('words', 'utf-8');

let words = []

allFileContents.split(/\r?\n/).forEach(line =>  {
    words.push({
        value: line,
        length: line.length
    })
})

fs.writeFileSync('wordList.json', JSON.stringify(words))