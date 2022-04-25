const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const handlebars = require('express-handlebars');
const moment = require('moment')

const { getProductos, saveNewProd } = require('./helpers/funciones');
const { getMensajes, saveMensaje } = require('./helpers/chat/funciones');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const chatArray = [
    {author: 'Marcos', text: 'Buenas...'},
    {author: 'Luci', text: 'provando provando...'}
]

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.engine(
    'hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout:'./index.hbs',
        layoutsDir: __dirname + '/views/layaouts',
        partialsDir: __dirname + '/views/partials'
    })
);

//RUTAS

app.get('/', (req, res)=>{
    res.status(200).render('NuevoProducto.hbs')
})



io.on('connection', async (socket)=>{
    console.log(`Nuevo usuario conectado con id: ${socket.id}; hora: ${Date()}`)

    const productos = await getProductos()
    const mensajesChat = getMensajes()

    socket.emit('productos', productos)
    socket.emit('chat', mensajesChat)
    
    socket.on('nuevoProducto', async(data)=>{
        await saveNewProd(data)
        const productos = await getProductos()
        io.sockets.emit('productos', productos)
        console.log('nuevo producto desde el frontend')
    })
    //Chat.-
    socket.on('nuevoMensajeChat', (data) =>{
        setHour = moment().format('DD/MM/YY HH:MM:SS')
        data.hour = setHour
        let nuevosMsg = saveMensaje(data)
        io.sockets.emit('chat', nuevosMsg)
    })
})




const serverON = httpServer.listen(8080, ()=>{
    console.log('Server on port 8080')
})
serverON.on('error', error=> console.log(`Error del servidor ${error}`))


//let hora = moment().format('DD/MM/YY HH:MM:SS')

//console.log(hora)