

/* Promise Based FileWriting
Execution Time: 8s
CPU Usage: 100% (one core)
Memory Usage: 50MB

const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  for (let i = 0; i < 10000; i++) {
    await fileHandle.write(` ${i} `);
  }
  console.timeEnd("writeMany");
})();
*/


/*    Synchronous Way of writing to a file using callback
Execution Time: 1.8s
CPU Usage: 100% (one core)
Memory Usage: 50MB

const fs = require("node:fs");

(async () => {
  console.time("writeMany");
  fs.open("test.txt", "w", (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      fs.writeSync(fd, buff);
    }

    console.timeEnd("writeMany");
  });
})();
*/



/*  Here we are creating a stream and repetitively 
pushing data to the buffer even after the buffer limit is full.
This will allot another buffer and occupy the memory.

DON'T DO IT THIS WAY!!!!
Execution Time: 270ms
CPU Usage: 100% (one core)
Memory Usage: 200MB

const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
    stream.write(buff);
  }
  console.timeEnd("writeMany");
})();

*/