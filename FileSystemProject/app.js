const { watch } = require('node:fs/promises');
const fs = require('node:fs/promises')

async function fileWatch() {
    async function createFile(path) {
        
        try{

            //  Try to open the file using the path
            let existingFile = fs.open(path,'r');
            // if the file doesn't exists an error is thrown 
          
            return console.log("fileExists")

        }catch(e){
            let newFile = await fs.open(path,"w")
            newFile.close()
            
        }
         existingFile.close()

    }
    try {

        // for watching the changes in the file
        const watcher = watch('./')

        // for opening the file
        const fileHandler = await fs.open('file.txt', "r")

        //  Custom eventEmitter (All <FileHandle> objects are <EventEmitter>s. it means they extend evenEmitter)

        fileHandler.on("change", async () => {

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
            await fileHandler.read(buff, offset, length, position)


            /*
                decoder => takes 0's, 1's and converts them to something meaningful (like characters, image, video...)
                encoder => it takes something meaningful and converts them into 0's, 1's.
             */

            const command = buff.toString('utf-8')

            // read the command 
            // create a file <path>
            const filePathStartIndex = command.indexOf("./");
            const filePathEndIndex = command.length;
            
            if (command.includes("create a file")) {
                const filePath = command.substring(filePathStartIndex, filePathEndIndex);
                createFile(filePath)
                
            }

        })


        for await (const event of watcher) {     /* watcher function returns a asyncIterator */

            console.log(event)  /* outPut: { eventType: 'change', filename: 'file.txt' } */

            if (event.eventType === "change" && event.filename === 'file.txt') {

                /*  
                   File change is detected so next i want to read the content of the file 
                   In order to read the file , first file should be opened then we can read/write to the file.
                   
                   note: whenever a file is opened its data is not copied into memory , instead an id is given
                   to the file and it is stored in the memory. it is termed as file descriptor 
                */

                fileHandler.emit("change")

            }
        }
    } catch (error) {
        console.log(error)
    }
}
fileWatch()