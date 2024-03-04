const http = require('node:http');


const agent = new http.Agent({ keepAlive: true });

const options = {
    agent:agent,
    port: 8050,
    host: 'localhost',
    method: 'POST',
    path: '/create-post',
    headers:{
        "Content-Type":"application/json",
        "Content-Length":Buffer.byteLength(JSON.stringify({message:"Hi there!"}),'utf-8')
    }
  };

const request = http.request(options)

request.on('response',()=>{})

request.write(JSON.stringify({message:"Hi there!"}))


