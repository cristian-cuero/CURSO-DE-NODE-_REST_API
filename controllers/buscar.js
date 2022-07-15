const {response} = require('express');
const Categoria = require('../models/categoria');
//para ver sin es un id de mongoose
const {ObjectId} = require('mongoose').Types;
const Producto = require('../models/producto')
const Usuario = require('../models/usuario')

//colecciones permitidas en mi busqueda
const colleccionesPermitidas = [
    'usuarios',
    'categoria',
    'producto',
    'roles'
]

const buscarUsuarios = async (termino = '' , res = response)=>{


    const esMongoID = ObjectId.isValid( termino);

    if (esMongoID){
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] :[] // ternario pregunta si el suaurio existe pa devolver el arreglo si no vacio 
        })
    }
    //buscaquedas incesibñes usamos expresion regular incesible a mayuscula y miniscula y las que coincidan con la busqueda
    // es como le lik %% de firebird
    const regex = new RegExp(termino , 'i');
    //or en mongose
    const usuarios = await Usuario.find({
        $or:[{nombre: regex }, {correo: regex}],
        $and: [{estado:true}]
    })

    res.json({
        results: (usuarios) ? [usuarios] :[] // ternario pregunta si el suaurio existe pa devolver el arreglo si no vacio 
    })

}

const buscarCategoria = async(termino = "", res = response) => {

    const esMongoID = ObjectId.isValid( termino);
    if(esMongoID){
        const categoria = await Categoria.findById(termino)
        res.json({
            results: (categoria) ?[categoria] : [] 
        })
    }
    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({nombre: regex})
    res.json({
        results: categorias
    })
}


const buscarProductos = async(termino = '' , res = response) =>{

    const esMongoID = ObjectId.isValid( termino);
    if(esMongoID){
        const producto = await Producto.findById(termino)
       return res.json({
            results : (producto) ? [producto] : []
        })
    }
    const regex = new RegExp(termino , 'i')
    const productos = await Producto.find({
        $or: [{nombre: regex }]
    })

    res.json({
        results: productos
    })
}

//{ categoria:ObjectId('62c657e74d23c4912165f75a') } busqueda con categoria




//buscar de manera flexible
const buscar = (req , res = response) => {
    const {coleccion , termino } = req.params
    if(!colleccionesPermitidas.includes( coleccion)){
        return res.status(400).json({
            msg: `las coleeciones permitidas son : ${colleccionesPermitidas}`
        })
    }

    switch(coleccion){
    
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categoria':
            buscarCategoria(termino, res);
        break;
        case 'producto':
            buscarProductos(termino , res)
        break;
        
        default:
            res.status(500).json({
                msg:'esta busqueda no existe'
            })


    }
   

}

module.exports = {
    buscar
}