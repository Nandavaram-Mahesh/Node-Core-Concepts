const fs = require('fs')


const content = fs.readFileSync('./text.txt')

console.log(content)
// <Buffer 48 69 20 4d 61 68 65 73 68 20 2c 20 79 6f 75 20 61 72 65 20 67 6e 67 20 74 6f 20 6c 65 61 72 6e 20 66 69 6c 65 20 73 79 73 74 65 6d 20 69 6e 20 6e 6f ... 5 more bytes>