const { watch } = require('node:fs/promises');
const fs = require('node:fs/promises')
async function fileWatch(){
    try{
        const watcher  =watch('./')
        const fileHandler = await fs.open('file.txt',"r")

        for await (const event of watcher){
            console.log(event)  /* outPut: { eventType: 'change', filename: 'file.txt' } */
            if(event.eventType ==="change" && event.filename==='file.txt'){
                console.log("Change detected in file.txt")
                /*  
                   File change is detected so next i want to read the content of the file 
                   In order to read the file , first file should be opened then we can read/write to the file.
                   
                   note: whenever a file is opened its data is not copied into memory , instead an id is given
                   to the file and it is stored in the memory. it is termed as file descriptor 
                */
                const fileSize = (await fileHandler.stat()).size
                const buff = Buffer.alloc(fileSize)

                const offset = 0
                const length = buff.byteLength
                const position = 0

                const content = await fileHandler.read(buff,offset,length,position)

                console.log(content)



            }
        }
    }catch(error){
        console.log(error)
    }
}
fileWatch()