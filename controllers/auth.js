const bcryptjs = require("bcryptjs");
const { response } = require("express");
const Usuario = require("../models/usuario");
const { generarJWT } = require('../helpers/generar-jwt.js')


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

module.exports ={ 
    login
}