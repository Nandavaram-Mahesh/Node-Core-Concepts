const dgram = require('node:dgram');

const sender = dgram.createSocket('udp4');


sender.send( Buffer.from("Some amount of data 1 ..."),8000,"127.0.0.1",(err,bytes)=>{
    console.log(err)
})