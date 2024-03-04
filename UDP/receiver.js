const dgram = require('node:dgram');


const receiver = dgram.createSocket('udp4');


receiver.on('message', (msg, rinfo) => {
    console.log(`receiver got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });
  
  receiver.bind({ address: "127.0.0.1", port: 8000 });

  receiver.on('listening', () => {
    const address = receiver.address();
    console.log(`receiver listening ${address.address}:${address.port}`);
  });