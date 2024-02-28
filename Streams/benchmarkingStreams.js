// const fs = require('node:fs')

// Promises Version 

/*
const fs = require('fs/promises')

async function benchMarkingStreams(){
    try{
        console.time("benchmarking")
        for(let i=0;i<1000;i++){
            
             await fs.appendFile('./streams.txt',i.toString())
            
        }
        console.timeEnd("benchmarking")
    }catch(e){
        console.log(e)
    }
}
benchMarkingStreams()
*/


// Callback Version , which is much faster compared to promise version as mentioned in node js docs
/* 

function benchMarkingStreams() {
    try {
        console.time("benchmarking")
        fs.open('./streams.txt','w',(error,fd)=>{
            for (let i = 0; i < 1000; i++) {
                fs.writeFileSync(fd,`${i}`) 
            }
        })
        console.timeEnd("benchmarking")
    } catch (e) {
        console.log(e)
    }
}
benchMarkingStreams()

*/ 



const fs = require('fs/promises')

async function benchMarkingStreams(){
    try{
        const fileHandle = await fs.open('./streams.txt',"w")

        const stream = fileHandle.createWriteStream()
        
        console.time("benchmarking")
        for(let i=0;i<1000000;i++){
            
            let buff = Buffer.from(`${i}`,"utf-8")
            stream.write(buff)
            
        }
        console.timeEnd("benchmarking")
    }catch(e){
        console.log(e)
    }
}
benchMarkingStreams()