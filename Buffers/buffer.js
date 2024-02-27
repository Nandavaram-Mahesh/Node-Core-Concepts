const { Buffer } = require('node:buffer');




const buf1 = Buffer.alloc(5);

buf1[0] = 0x74
buf1[1] = 0xc3
buf1[2]= 0xa9
buf1[3]=0x73
buf1[4]=0x74


console.log(buf1.toString('utf-8'))



const buf2 = Buffer.from("HI Mahesh!","utf-8")

console.log(buf2)