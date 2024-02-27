const { watch } = require('node:fs/promises');

async function fileWatch(){
    try{
        const watcher  =watch('./')
        
        for await (const event of watcher){
            console.log(event)  /* outPut: { eventType: 'change', filename: 'file.txt' } */
            if(event.eventType ==="change" && event.filename==='file.txt'){
                console.log("Change detected in file.txt")
            }
        }
    }catch(error){
        console.log(error)
    }
}
fileWatch()