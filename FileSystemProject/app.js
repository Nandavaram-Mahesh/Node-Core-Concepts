const { watch } = require('node:fs/promises');
const fs = require('node:fs/promises')

async function fileWatch(){
    try{
        
        // for watching the changes in the file
        const watcher  =watch('./')

        // for opening the file
        const fileHandler = await fs.open('file.txt',"r")

        //  Custom eventEmitter (All <FileHandle> objects are <EventEmitter>s. it means they extend evenEmitter)

        fileHandler.on("change",async()=>{
            
                // getting the size of the file (i.e no of bytes)
                const fileSize = (await fileHandler.stat()).size
                
                // allocating the buffer 
                const buff = Buffer.alloc(fileSize)
                
                // the location at which we want to start filling our buffer from 
                const offset = 0
                
                // length of the buffer in bytes
                const length = buff.byteLength
                
                // the location at which we want to start reading the file from
                const position = 0
                
                // Finally Reading a file
                const content = await fileHandler.read(buff,offset,length,position)

                console.log(content)
        })


        for await (const event of watcher){     /* watcher function returns a asyncIterator */
             
            console.log(event)  /* outPut: { eventType: 'change', filename: 'file.txt' } */
            
            if(event.eventType ==="change" && event.filename==='file.txt'){

                /*  
                   File change is detected so next i want to read the content of the file 
                   In order to read the file , first file should be opened then we can read/write to the file.
                   
                   note: whenever a file is opened its data is not copied into memory , instead an id is given
                   to the file and it is stored in the memory. it is termed as file descriptor 
                */

                fileHandler.emit("change")

            }
        }
    }catch(error){
        console.log(error)
    }
}
fileWatch()