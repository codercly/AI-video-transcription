import axios from "axios"
import { startLoading, stopLoading, loadingMessage } from "./loading"
import { getVideoId, loadVideo } from "./youTube-api"
import { transcribedAudio } from "./transcribe"
import { renderText } from "./render"
//querySelector para manipular o DOM com o id form
const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        loadingMessage('Iniciando a aplicação')
        startLoading()
        //pegar o from
        const formData = new FormData(form)
        const url = formData.get('url')
        await loadVideo(url)

        loadingMessage('Baixando e convertendo o vídeo')
        await axios.get('http://localhost:3333/audio?v=' + getVideoId(url))

        const data = await transcribedAudio()
        renderText(data)
    } catch (error) {
        console.log('[SUBMIT_ERROR]', error)
    } finally {
        stopLoading()
    }


})