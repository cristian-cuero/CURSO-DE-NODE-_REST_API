//desetructurando para usar response y request para obtener los parametros de 
//la ruta
const {response, request} = require('express')
//importar modelo par insertar Contraeña 
const Usuario = require('../models/usuario');

//encriptar password
const bycriptjs = require('bcryptjs');

//controladores de la ruta usuarios

const UsuarioGet = async (req = request, res = response) => {
    //estrar parametros del queryget

    const {limite = 5 , desde = 0} = req.query
    //tarer todos los usuarios limite cuantos traigo, skip  desde donde empesar 
   /*  const usuarios = await Usuario.find({estado: true}) //where
    .skip(Number(desde))
    .limit(Number(limite) );

    //total de registtos
    const total = await Usuario.countDocuments({estado: true});  */// esto es bloqueante por que ejecuta una luego espera y luego la otra
    //este espera que las dos promesas se ejecuten ademas 
    //manda las dos promesas de manera simultanea si una da error revienta todo 
    const [usuarios , total] = await Promise.all([
     Usuario.find({estado: true}) //where
    .skip(Number(desde))
    .limit(Number(limite) ),
    Usuario.countDocuments({estado: true})

    ]) //desestructuracion por arreglo

    res.json({
    
        usuarios,
        total 
    })
}
//siempre que se usa await la funcion debe ser asincrona 
const UsuarioPost = async (req, res = response) => {
    //desetructuras
    //si son muchos campos 

  //se valida con un middleware validar campos

    //
    // const { nombre , correo , password , rol , ... resto}  = req.body
    const { nombre , correo , password , rol}  = req.body;
    
    //mongose obvia los camnpos que no defini
    const usuario = new Usuario({nombre , correo , password , rol })
    
    //verificar si el correo existe correo:correo se omite por redundancia findone busca objeto donde este el campo a buscar

    /*   const existeemail = await Usuario.findOne({correo})
    if (existeemail){
        return res.status(400).json({
            msg: "el correo ya esta registrado"
        });
    }
 */
    //encriptar constraseña , genSaltSync tantas vueltas se encripta la contraseña entre mas vueltas mas demorado
    const salt = bycriptjs.genSaltSync()
    usuario.password =  bycriptjs.hashSync( password , salt)
    
    //grabar registro en Db
    await usuario.save();
    res.json({
        
        //leyendo lo que viene el body

        usuario

    })
}
const UsuarioPut = async (req, res = response) => {
    //parametro que viene por el segemto
    const id  = req.params.id;
     
    //diferente aresto lo que quiero excluir
    const { __id ,password , google, correo ,... resto}  = req.body

    //encriptar contraseña
    if( password){
        const salt = bycriptjs.genSaltSync()
        resto.password =  bycriptjs.hashSync( password , salt)

    }
    //encuenta Y Actualiza
    const usuarioBD = await Usuario.findByIdAndUpdate( id , resto)

    res.json({
    
        usuarioBD

    })
}
const UsuarioDelete = async (req, res = response) => {
    
    const {id} = req.params

    //borar Fisicamente 
    //const usuario = await Usuario.findByIdAndDelete(id)

    //cambiar estado
    const usuario = await Usuario.findByIdAndUpdate(id , {estado : false});
    res.json({
        usuario
        

    })
}



module.exports = {
    UsuarioGet,
    UsuarioPost,
    UsuarioPut,
    UsuarioDelete

}