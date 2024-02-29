const fs = require("node:fs/promises");


/*Not ideal way of dng  
*/
(async () => {
    try {
        const fileHandleRead = await fs.readFile('test.txt')
        const fileHandleWrite = await fs.open('test-copy.txt', 'w')

        console.log(fileHandleRead)
        fileHandleWrite.write(fileHandleRead)

    }
    catch (e) {
        console.log(e)
    }
})()