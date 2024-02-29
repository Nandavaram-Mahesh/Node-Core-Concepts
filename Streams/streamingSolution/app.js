// const fs = require("node:fs/promises")

const fs = require("node:fs/promises");
const { pipeline } = require('node:stream');

/*Not ideal way of dng  

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

*/


/* Implementing Streams without using node:streams , using only buffers */

// (async () => {
//     try {
//         const srcFile = await fs.open('test.txt','r')
//         const destFile = await fs.open('test-copy.txt', 'w')

//         let bytesRead = -1
//         // Loop till the end of the file, if the bytesRead is zero then it is end of the file.
//         while(bytesRead!==0){      /* End of the file bytesRead would be Zero */
//             const readResult = await srcFile.read()
//             console.log(readResult)
//             bytesRead = readResult.bytesRead

            

//             if(bytesRead!==16384){ /* 16384 - buffer size */
//                 // get the data until we don't get zeros in buffer
//                 const indexOfNotFilled = readResult.buffer.indexOf(0)
//                 const newBuffer = Buffer.alloc(indexOfNotFilled)
//                 readResult.buffer.copy(newBuffer,0,0,indexOfNotFilled)
//                 destFile.write(newBuffer) 
//             }else{
//                 destFile.write(readResult.buffer)
//             }

//         }

//     }
//     catch (e) {
//         console.log(e)
//     }
// })()


/*   Implementing Streams using node:streams and piping 
    
     Piping- it takes care of all the back pressure , it means it takes care of draining the buffer and then reading and writing 

*/ 


// (async()=>{
//     try{
//         console.time('pipingTime')
//         const srcFile = await fs.open('test.txt','r')
//         const destFile = await fs.open('test-copy.txt', 'w')

//         const readableStream =  srcFile.createReadStream()
//         const writableStream = destFile.createWriteStream()

//         readableStream.pipe(writableStream)
//         console.timeEnd('pipingTime')
//     }
//     catch(e){
//         console.log(e)
//     }
    
// })()





(async ()=>{
    
        console.time('pipingTime')
        const srcFile =  await fs.open('test.txt','r')
        const destFile =  await fs.open('test-copy.txt', 'w')

        const readableStream =  srcFile.createReadStream()
        const writableStream = destFile.createWriteStream()

       
       

        pipeline(readableStream,writableStream,(err) => {
            if (err) {
              console.error('Pipeline failed.', err);
            } else {
              console.log('Pipeline succeeded.');
            }
          })
          console.timeEnd('pipingTime')
    
})()


