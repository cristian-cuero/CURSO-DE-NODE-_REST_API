const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role')
//importar modelo par insertar Contraeña 
const Usuario = require('../models/usuario');

//mira si el rol es valido  es helper
const esRolValido = async (rol = '') =>{
    const existerol = await Role.findOne({rol});
    if( !existerol ) {
        //eror personalizado 
        throw new Error('el rol no esta registado en la BD') 
    }
}

//validarEmail
 //verificar si el correo existe correo:correo se omite por redundancia findone busca objeto donde este el campo a buscar
//se usa el helper y la ruta por eso el threo
 const emailexiste = async(correo = '') => {

    
    const existeemail = await Usuario.findOne({correo})
    if (existeemail){
        throw new Error(`el corre ${ correo } ya se encuentra registrado`) 
    }
}

const existeUsuarioID = async(id) => {

    
    const existeuser = await Usuario.findById(id)
    if (!existeuser){
        throw new Error(`el usuario con ${ id } no se encuentra registrado`) 
    }
}


const existeCategoria = async(id) => {
    const categoria = await Categoria.findById(id)
    if(!categoria){
        throw new Error(`la categoria con el id ${ id} no existe `);
    }
} 

const existeProducto = async(id) => {
    const producto = await Producto.findById(id)
    if(!producto){
        throw new Error(`el producto con el id ${ id} no existe `);
    }
}

//validar las colleciones  permitidas

const coleccionesPermitidas = (coleccion = '' , colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error (`la coleccion ${coleccion} no es permitida colecciones permitidas ${colecciones}`); 
    }
    //para que siga la funcion
    return true

}; 
module.exports = {
    esRolValido,
    emailexiste,
    existeUsuarioID,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}