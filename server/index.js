import express  from "express";
import cors from "cors"
import { downloader } from "./download-video.js";
import { createMP3 } from "./create-mp3.js";

const app = express()
app.use(cors()) // o navegador pode bloquear a aplicação. cors faz com que o acesso é liberado

app.get('/audio', async(req, res) =>{
    const videoId = req.query.v 
    console.log(videoId)

    try{
        //download
        await downloader(videoId)
        //criar mp3
        await createMP3()


        return res.send('ok')

    } catch(error){
        console.log(error)
        return res.send(error)
    }

    
})

app.listen(3333, () => console.log('server up'))
