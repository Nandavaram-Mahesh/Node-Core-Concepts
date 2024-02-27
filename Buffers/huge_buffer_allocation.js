const { Buffer, constants } = require('node:buffer');


const buff1 = Buffer.alloc(1e8)        


setInterval(()=>{
    buff1.fill(0x74)
},1000)


console.log(constants.MAX_LENGTH)
console.log(buff1)