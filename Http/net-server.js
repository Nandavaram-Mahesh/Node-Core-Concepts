const net = require('net')

const server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        console.log(data.toString('utf-8'))
        socket.write(data)
    })

})

server.listen(8050,"127.0.0.1",()=>{console.log("opened Server on",server.address()) })