const fs = require('fs')

let mensajes = []

const getMensajes = () =>{
    data = fs.readFileSync('./helpers/chat/mensajes.json', 'utf-8')
    mensajes = JSON.parse(data)
    return mensajes
}

const saveMensaje = (data) =>{
    const arrayMensajes = getMensajes()
    arrayMensajes.push(data)
    fs.writeFileSync('./helpers/chat/mensajes.json', JSON.stringify(arrayMensajes))
    return mensajes
}

module.exports = { getMensajes, saveMensaje };