const fs = require("node:fs/promises");

/*
Execution Time: 8s
CPU Usage: 100% (one core)
Memory Usage: 50MB
*/
(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  for (let i = 0; i < 10000; i++) {
    await fileHandle.write(` ${i} `);
  }
  console.timeEnd("writeMany");
})();


