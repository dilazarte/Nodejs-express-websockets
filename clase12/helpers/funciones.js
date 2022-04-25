const { Contenedor } = require('./contenedor');
const contenedor = new Contenedor('./helpers/productos.json')

let productos = []

const getProductos = async () => {
    productos = await contenedor.getAll()
    return productos
}

const saveNewProd = async (data) => {
    let id = await contenedor.save(data)
    return id
}

module.exports = {
    getProductos,
    saveNewProd
}