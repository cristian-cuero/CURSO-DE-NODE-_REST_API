//valida JWT
const { request } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

//reques y response es tipado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
const validarJWT =  async (req  = request, res = response , next) =>{

    const token = req.header('x-token')
    
    if(!token){

       return res.status(401).json({
        error: "Usuario No Autenticado"
        });
    };

    //validar JWT
    try {
       //uid viene en el playload 
       const {uid} = jwt.verify(token , process.env.SECRETOPRIVATEKEY);
       //obteniendo el playload
       //propiedad nueva de request
       

       //leer usuario del modelo
       const usuario = await Usuario.findById( uid );
        //lo guardo el en el reques

        //usuario undifed
        if (!usuario){
            return res.status(401).json({
                error: "Usuario No Existe"
                });  
        }

        //verificar si el usuario esta en estado false
        if(usuario.estado == false){
            return res.status(401).json({
                error: "Usuario Inactivo"
                });  
        }

        
        //guardo el usuario en la req
        req.usuario = usuario
        
      // console.log(usuario)
       next();
    } catch (err) {
       // console.log(err)
        return res.status(401).json({
            error: "Token Invalido"
            });   
    }




} 


module.exports = {
    validarJWT
}