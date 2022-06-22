const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require('../helpers/generar-jwt.js');
const { googleVerify } = require("../helpers/google-verify");


const login = async  (req, res = response) => {

    const {correo, contraseña} = req.body;
    
    try{

        //verificar si el email
        const usuario = await Usuario.findOne({correo})

        if( !usuario ){
            return res.status(400).json({
                msg:'Usuario Y Contraseña Envalido - email'
            });
        }

        //si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg:'Usuario Y Contraseña Envalido - false'
            });
        }

        //contraseña
        //compare syncs si contraseñas hacen match es asincrona
        const validapasword = bcryptjs.compareSync( contraseña , usuario.password);

        if( !validapasword) {
            
            return res.status(400).json({
                msg:'Usuario Y Contraseña Envalido - contraseña'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        //
        res.json({
            msg: 'login ok',
            correo,
            usuario,
            token
        })

    }catch(erro){ 
        console.log(erro)
        return res.status(500).json({
            msg: "contacte con el administrado"
        })
    }

    

}
//controlador para  leer el idtoken que viene de google
const  googleSigning = async ( req, res = response)=>{

 

    try {

        const {id_token} = req.body
        const {correo , nombre , img}=  await  googleVerify(id_token);

         //verificar si el correo ya existe

         let usuario = await Usuario.findOne({correo});

        if(! usuario){

            //tengo que crearlo
            const data = {
                nombre,
                correo,
                img,
                password: ':P',
                google: true //la carita nunca hara match el que valida contraseña
            };
            usuario = new Usuario(data)
            await usuario.save()
        }

        //si el usuario en BD esta en false

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Por favor hablar con el administrador'
            })
        }

        //genero el JWT

         //generar el JWT
         const token = await generarJWT(usuario.id) 
        
        res.status(200).json({
           usuario,
           token
        })

        
    } catch (error) {
        console.log(error)
       res.status(400).json({
           msg: 'El idtoken no es vallido'
       }) 
    }
    
}

module.exports ={ 
    login,
    googleSigning
}